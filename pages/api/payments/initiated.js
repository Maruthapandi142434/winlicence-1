// pages/api/payments/initiated.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { page = 1, startDate, endDate } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  let db;

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DATABASE_PORT || 3306,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
    });

    let query = 'SELECT * FROM initiated_orders';
    let params = [];

    if (startDate && endDate) {
      query += ' WHERE created_at BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.execute(query, params);

    // Count total rows
    let countQuery = 'SELECT COUNT(*) as count FROM initiated_orders';
    let countParams = [];

    if (startDate && endDate) {
      countQuery += ' WHERE created_at BETWEEN ? AND ?';
      countParams.push(startDate, endDate);
    }

    const [countRows] = await db.execute(countQuery, countParams);

    res.status(200).json({
      data: rows,
      total: countRows[0].count,
      page: Number(page),
      totalPages: Math.ceil(countRows[0].count / limit),
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  } finally {
    if (db) await db.end();
  }
}
