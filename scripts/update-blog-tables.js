const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function updateTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    // Add category_id to blog_posts if it doesn't exist
    await connection.execute(`
      ALTER TABLE blog_posts
      ADD COLUMN IF NOT EXISTS category_id INT NULL,
      ADD CONSTRAINT fk_category
      FOREIGN KEY (category_id) 
      REFERENCES blog_categories(id)
      ON DELETE SET NULL
    `);

    // Add slug to blog_categories if it doesn't exist
    await connection.execute(`
      ALTER TABLE blog_categories
      ADD COLUMN IF NOT EXISTS slug VARCHAR(255) NULL
    `);

    console.log('Tables updated successfully');
    await connection.end();
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

updateTables(); 