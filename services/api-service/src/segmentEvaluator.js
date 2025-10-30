// Simple rule parser and evaluator
const ALLOWED_FIELDS = new Set([
  'id','title','price','stock_status','stock_quantity','category','tags','on_sale','created_at'
]);

function parseRules(input) {
  // input can be string with newline-separated rules or array of strings
  const lines = Array.isArray(input) ? input : String(input || '').split(/\r?\n/);
  const rules = [];
  const re = /^\s*([a-z_]+)\s*(=|!=|>|<|>=|<=|contains)\s*(.+)\s*$/i;
  lines.forEach((line, idx) => {
    const l = line.trim();
    if (!l) return;
    const m = l.match(re);
    if (!m) {
      throw new Error(`Invalid rule syntax on line ${idx + 1}: "${line}"`);
    }
    const field = m[1];
    const op = m[2];
    let rawVal = m[3].trim();

    if (!ALLOWED_FIELDS.has(field)) {
      throw new Error(`Unsupported field "${field}" on line ${idx + 1}`);
    }

    // normalize booleans/numbers/strings
    let value = rawVal;
    if (/^(true|false)$/i.test(rawVal)) {
      value = rawVal.toLowerCase() === 'true';
    } else if (!isNaN(rawVal) && rawVal !== '') {
      // numeric-like (price, stock_quantity, id)
      value = Number(rawVal);
    } else {
      // strip surrounding quotes if present
      value = rawVal.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    }

    rules.push({ field, op, value });
  });
  return rules;
}

function matchRule(product, rule) {
  const { field, op, value } = rule;
  const v = product[field];

  // handle missing fields
  if (v === undefined || v === null) {
    // only '=' and '!=' applied to null/undefined: treat as empty or null
    if (op === '=' || op === '!=') {
      const eq = (v === value);
      return op === '=' ? eq : !eq;
    }
    return false;
  }

  // tags is array
  if (field === 'tags') {
    const arr = Array.isArray(v) ? v : [];
    if (op === 'contains') return arr.includes(String(value));
    if (op === '=') return arr.includes(String(value));
    if (op === '!=') return !arr.includes(String(value));
    // other ops don't apply
    return false;
  }

  // on_sale boolean
  if (field === 'on_sale') {
    const boolV = Boolean(v);
    if (op === '=') return boolV === Boolean(value);
    if (op === '!=') return boolV !== Boolean(value);
    return false;
  }

  // numeric comparisons for price, stock_quantity, id
  if (['price','stock_quantity','id'].includes(field)) {
    const num = Number(v);
    const cmp = Number(value);
    if (isNaN(num) || isNaN(cmp)) return false;
    if (op === '=') return num === cmp;
    if (op === '!=') return num !== cmp;
    if (op === '>') return num > cmp;
    if (op === '<') return num < cmp;
    if (op === '>=') return num >= cmp;
    if (op === '<=') return num <= cmp;
    return false;
  }

  // created_at: compare ISO strings or dates
  if (field === 'created_at') {
    const d1 = new Date(v);
    const d2 = new Date(value);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      // fallback to string compare
      if (op === 'contains') return String(v).includes(String(value));
      if (op === '=') return String(v) === String(value);
      return false;
    }
    if (op === '=') return d1.getTime() === d2.getTime();
    if (op === '!=') return d1.getTime() !== d2.getTime();
    if (op === '>') return d1.getTime() > d2.getTime();
    if (op === '<') return d1.getTime() < d2.getTime();
    if (op === '>=') return d1.getTime() >= d2.getTime();
    if (op === '<=') return d1.getTime() <= d2.getTime();
    return false;
  }

  // string fields: title, stock_status, category
  const s = String(v).toLowerCase();
  const rhs = String(value).toLowerCase();
  if (op === 'contains') return s.includes(rhs);
  if (op === '=') return s === rhs;
  if (op === '!=') return s !== rhs;

  return false;
}

function evaluateProducts(products, rulesInput) {
  const rules = parseRules(rulesInput);
  return products.filter(p => {
    try {
      return rules.every(r => matchRule(p, r));
    } catch (e) {
      return false;
    }
  });
}

module.exports = { parseRules, evaluateProducts };