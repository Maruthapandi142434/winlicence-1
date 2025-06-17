import fs from 'fs';
import path from 'path';

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.BASE_URL || 'https://winlicense.in';
  const pagesDirectory = path.join(process.cwd(), 'pages');

  // Directories to exclude from the sitemap
  const excludeDirectories = ['api', 'blogs', 'forms', 'public', 'section','admin'];

  // Function to recursively fetch all page paths, excluding specific directories
  const getAllPages = (directory) => {
    const files = fs.readdirSync(directory);
    let pagePaths = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Skip excluded directories
        if (excludeDirectories.includes(file)) continue;
        // Recursively fetch pages in subdirectories
        pagePaths.push(...getAllPages(filePath));
      } else if (stats.isFile() && /\.jsx$/.test(file)) {
        // Exclude Next.js special files
        if (['/_app.jsx', '/_document.jsx', '/_error.jsx' , '/404.jsx', '[slug].jsx', '/[slug].jsx'].includes(`/${file}`)) continue;

        // Convert file path to URL path
        let page = file === 'index.jsx' ? '' : file.replace(/\.jsx$/, '');
        const relativePath = path.relative(pagesDirectory, directory);
        pagePaths.push(`/${relativePath}/${page}`.replace(/\/+/g, '/'));
      }
    }

    return pagePaths;
  };

  try {
    // Fetch all pages while excluding specific directories
    const allPages = getAllPages(pagesDirectory);

    // Generate XML sitemap content
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add each page to the sitemap
    for (const page of allPages) {
      const lastmod = new Date().toISOString();
      sitemap += `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>monthly</changefreq>
        </url>`;
    }

    sitemap += `\n</urlset>`;

    // Set response headers and send the sitemap
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end('Internal Server Error');
    return { props: {} };
  }
};

export default Sitemap;
