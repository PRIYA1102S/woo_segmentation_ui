const fetch = require('node-fetch');

function buildUrl(base, consumerKey, consumerSecret, params = {}) {
  const url = new URL(base.replace(/\/$/, '') + '/wp-json/wc/v3/products');
  url.searchParams.set('consumer_key', consumerKey);
  url.searchParams.set('consumer_secret', consumerSecret);
  url.searchParams.set('per_page', params.per_page || '100');
  if (params.page) url.searchParams.set('page', String(params.page));
  return url.toString();
}

async function fetchAllProducts({ base, key, secret }) {
  if (!base || !key || !secret) throw new Error('Missing WooCommerce config');
  let page = 1;
  const all = [];
  while (true) {
    const url = buildUrl(base, key, secret, { per_page: 100, page });
    const res = await fetch(url, { timeout: 30000 });
    if (!res.ok) throw new Error(`WC fetch failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 100) break;
    page += 1;
  }
  return all;
}

module.exports = { fetchAllProducts };