#!/usr/bin/env node
/**
 * Test local du démarrage (hors Passenger).
 * Sur le serveur : node scripts/o2switch-test-start.mjs
 */
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const app = next({ dev: false });
const handle = app.getRequestHandler();

try {
  await app.prepare();
  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  });
  server.listen(3999, () => {
    console.log('OK — Next écoute sur http://127.0.0.1:3999 (Ctrl+C pour arrêter)');
  });
} catch (err) {
  console.error('ÉCHEC:', err);
  process.exit(1);
}
