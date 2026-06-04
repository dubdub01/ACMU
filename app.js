/**
 * Entrée Next.js pour O2Switch / Phusion Passenger.
 * Ne pas appeler .listen() : Passenger fournit le serveur HTTP.
 */
const http = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

module.exports = app.prepare().then(() => {
  return http.createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Erreur requête', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });
});
