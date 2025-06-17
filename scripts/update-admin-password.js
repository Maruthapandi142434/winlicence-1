const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function updateAdminPassword() {
  try {
    // Generate new password hash
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Generated new hash:', hashedPassword);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    // Update admin user password
    const [result] = await connection.execute(
      'UPDATE admin_users SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );

    await connection.end();

    console.log('Admin password updated successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Update result:', result);
  } catch (error) {
    console.error('Error updating admin password:', error);
  }
}

updateAdminPassword();