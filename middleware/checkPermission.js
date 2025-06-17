import { verify } from 'jsonwebtoken';
import mysql from 'mysql2/promise';


export default function checkPermission(permission) {
  return async (req, res, next) => {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DATABASE_SSL === 'true'
      });

      const [permissions] = await connection.execute(`
        SELECT p.name 
        FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        JOIN admin_users u ON u.role = rp.role
        WHERE u.id = ?
      `, [decoded.userId]);

      await connection.end();

      const hasPermission = permissions.some(p => p.name === permission);
      
      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
} 