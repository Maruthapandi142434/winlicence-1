const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function verifyAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    // Check if admin user exists
    const [users] = await connection.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      ['admin']
    );

    if (users.length === 0) {
      console.log('Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const password = 'admin123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await connection.execute(
        'INSERT INTO admin_users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@example.com', hashedPassword, 'admin']
      );
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user exists. Updating password...');
      
      // Update existing admin user's password
      const password = 'admin123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await connection.execute(
        'UPDATE admin_users SET password = ? WHERE username = ?',
        [hashedPassword, 'admin']
      );
      
      console.log('Admin password updated successfully');
    }

    await connection.end();
    
    console.log('\nAdmin credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyAdmin(); 