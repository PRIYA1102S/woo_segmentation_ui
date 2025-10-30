const express = require('express');
const cron = require('node-cron');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
// load .env from repo root if present
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const { fetchAllProducts } = require('./wooClient');

const PORT = process.env.INGEST_PORT || 5001;
const DATA_DIR = path.join(__dirname, '..', '..', '..', 'data');
const OUT_FILE = path.join(DATA_DIR, 'products.json');

async function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.name || null,
    price: p.price != null ? String(p.price) : '',
    stock_status: p.stock_status || null,
    stock_quantity: p.stock_quantity == null ? null : p.stock_quantity,
    category: Array.isArray(p.categories) && p.categories.length ? p.categories[0].name : null,
    tags: Array.isArray(p.tags) ? p.tags.map(t => t.name) : [],
    on_sale: Boolean(p.on_sale),
    created_at: p.date_created || null
  };
}

async function runSync() {
  console.log('[ingest] sync starting', new Date().toISOString());
  const base = process.env.WOOCOMMERCE_BASE_URL;
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!base || !key || !secret) {
    throw new Error('Missing WooCommerce env variables');
  }
  const raw = await fetchAllProducts({ base, key, secret });
  const normalized = await Promise.all(raw.map(normalizeProduct));
  await mkdirp(DATA_DIR);
  await fs.promises.writeFile(OUT_FILE, JSON.stringify(normalized, null, 2), 'utf8');
  console.log('[ingest] saved', normalized.length, 'products ->', OUT_FILE);
  return normalized;
}

async function main() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.post('/sync', async (req, res) => {
    try {
      const results = await runSync();
      res.json({ ok: true, count: results.length });
    } catch (err) {
      console.error('[ingest] sync error', err);
      res.status(500).json({ ok: false, error: String(err.message) });
    }
  });

  app.get('/products', async (req, res) => {
    try {
      if (!fs.existsSync(OUT_FILE)) return res.json([]);
      const body = await fs.promises.readFile(OUT_FILE, 'utf8');
      res.type('json').send(body);
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err.message) });
    }
  });

  app.listen(PORT, () => {
    console.log(`[ingest] listening on http://0.0.0.0:${PORT}`);
  });

  const cronSpec = process.env.CRON_SCHEDULE || '*/5 * * * *';
  try {
    cron.schedule(cronSpec, async () => {
      try {
        await runSync();
      } catch (e) {
        console.error('[ingest] scheduled sync failed', e);
      }
    }, { scheduled: true });
    console.log('[ingest] scheduled cron:', cronSpec);
  } catch (e) {
    console.warn('[ingest] invalid CRON_SCHEDULE, skipping scheduler', e.message);
  }

  // support --once run and exit
  if (process.argv.includes('--once') || process.env.RUN_ONCE === 'true') {
    try {
      await runSync();
      console.log('[ingest] run-once complete, exiting');
      process.exit(0);
    } catch (e) {
      console.error('[ingest] run-once failed', e);
      process.exit(2);
    }
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}