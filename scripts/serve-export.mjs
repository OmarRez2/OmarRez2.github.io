import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.pdf': 'application/pdf' };
createServer(async (req, res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' }).end(await readFile(resolve(root, '404.html')));
  }
}).listen(4173, '127.0.0.1');
