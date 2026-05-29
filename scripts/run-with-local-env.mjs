/**
 * Lance Next (ou autre commande) en chargeant .env puis .env.local,
 * sans laisser DATABASE_URL / NEXTAUTH_* du shell écraser le projet
 * (ex. identifiants o2switch exportés par erreur en local).
 */
import { spawn } from 'child_process';
import { config } from 'dotenv';

const ENV_KEYS_FROM_FILES = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'PRISMA_DEMO_MODE'];

for (const key of ENV_KEYS_FROM_FILES) {
  delete process.env[key];
}

config({ path: '.env' });
config({ path: '.env.local', override: true });

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error('Usage: node scripts/run-with-local-env.mjs <command> [args...]');
  process.exit(1);
}

const child = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
  shell: true,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
