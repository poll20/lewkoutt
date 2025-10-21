import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module me __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static pages
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/faq', changefreq: 'monthly', priority: 0.6 },
  { url: '/shop', changefreq: 'weekly', priority: 0.9 }
];

// Create sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://www.lewkout.com' });

// Pipe sitemap stream to file
const writeStream = createWriteStream(path.resolve(__dirname, '../public/sitemap.xml'));
sitemap.pipe(writeStream);

// Write all URLs
links.forEach(link => sitemap.write(link));

// End the stream and convert to promise
sitemap.end();
streamToPromise(sitemap)
  .then(() => console.log('✅ sitemap.xml generated!'))
  .catch(err => console.error(err));
