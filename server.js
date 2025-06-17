const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
require('dotenv').config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'winlicense.in';
const port = 5000;

// Initialize the Next.js app with the specified environment settings
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the incoming request URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Custom routing for specific paths
      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        // Handle all other routes with Next.js's default handler
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      // Log any errors and send a 500 status code for Internal Server Error
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
  .once('error', (err) => {
    // Log any server errors and exit the process
    console.error('Server error:', err);
    process.exit(1);
  })
  .listen(port, () => {
    // Log the server start message
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
