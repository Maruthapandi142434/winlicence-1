import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    if (req.method === 'POST') {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      // Check if username or email already exists
      const [existingUsers] = await connection.execute(
        'SELECT * FROM admin_users WHERE username = ? OR email = ?',
        [username, email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const [result] = await connection.execute(
        'INSERT INTO admin_users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      const [newUser] = await connection.execute(
        'SELECT id, username, email, created_at FROM admin_users WHERE id = ?',
        [result.insertId]
      );

      await connection.end();
      return res.status(201).json({ user: newUser[0] });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;

      // Prevent deleting the last admin user
      const [userCount] = await connection.execute(
        'SELECT COUNT(*) as count FROM admin_users'
      );

      if (userCount[0].count <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last admin user' });
      }

      await connection.execute('DELETE FROM admin_users WHERE id = ?', [id]);

      await connection.end();
      return res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error handling user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 