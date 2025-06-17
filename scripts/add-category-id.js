const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function addCategoryIdColumn() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    // Add category_id column if it doesn't exist
    await connection.execute(`
      ALTER TABLE blog_posts
      ADD COLUMN IF NOT EXISTS category_id INT,
      ADD FOREIGN KEY (category_id) REFERENCES blog_categories(id)
    `);

    console.log('Successfully added category_id column');
    await connection.end();
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

addCategoryIdColumn(); 