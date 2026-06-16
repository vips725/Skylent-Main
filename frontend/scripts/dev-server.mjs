import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

process.env.CI = process.env.CI || 'true';
process.chdir(root);

const { createServer } = await import('vite');

const server = await createServer({
  root,
  configFile: path.join(root, 'vite.config.js'),
  clearScreen: false,
});

await server.listen();
server.printUrls();

const keepAlive = setInterval(() => {}, 2 ** 31 - 1);

async function shutdown() {
  clearInterval(keepAlive);
  await server.close();
  process.exit(0);
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
