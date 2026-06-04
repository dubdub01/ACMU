/**
 * Entrée Next.js pour O2Switch / Phusion Passenger 5 (cPanel).
 * Utiliser listen('passenger') — requis par Passenger, pas un port TCP classique.
 */
const http = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Erreur requête', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    });

    if (typeof PhusionPassenger !== 'undefined') {
      server.listen('passenger');
    } else {
      const port = process.env.PORT || 3000;
      server.listen(port, () => {
        console.log(`> Next.js prêt sur le port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('Échec démarrage Next.js:', err);
    process.exit(1);
  });
