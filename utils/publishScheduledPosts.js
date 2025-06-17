import { mysql } from 'mysql2/promise';

export async function publishScheduledPosts() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    // Get all scheduled posts that should be published
    const [posts] = await connection.execute(
      `UPDATE blog_posts 
       SET status = 'published', 
           published = 1,
           scheduled_for = NULL 
       WHERE status = 'scheduled' 
       AND scheduled_for <= NOW()`
    );

    await connection.end();
    return posts;
  } catch (error) {
    console.error('Error publishing scheduled posts:', error);
    throw error;
  }
} 