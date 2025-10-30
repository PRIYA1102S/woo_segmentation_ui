const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');                       // <--- added
const { evaluateProducts, parseRules } = require('./segmentEvaluator');

const PORT = process.env.API_PORT || 4000;
const DATA_FILE = path.join(__dirname, '..', '..', '..', 'data', 'products.json');

const app = express();
app.use(express.json());
app.use(cors());    
app.options('*', cors());                                // <--- allow cross-origin for frontend

// Swagger (simple static YAML)
const swaggerDoc = {
  openapi: "3.0.0",
  info: { title: "Woo Segmentation API", version: "0.1.0" },
  paths: {
    "/products": {
      get: {
        summary: "Get all products",
        responses: { "200": { description: "OK" } }
      }
    },
    "/segments/evaluate": {
      post: {
        summary: "Evaluate segment rules",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { rules: { type: "string" } } } } }
        },
        responses: { "200": { description: "Filtered products" }, "400": { description: "Invalid input" } }
      }
    }
  }
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/products', async (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const raw = await fs.promises.readFile(DATA_FILE, 'utf8');
    const products = JSON.parse(raw);
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: String(err.message) });
  }
});

app.post('/segments/evaluate', async (req, res) => {
  try {
    const { rules } = req.body;
    if (!rules || (typeof rules !== 'string' && !Array.isArray(rules))) {
      return res.status(400).json({ error: 'rules must be a string (newline separated) or array of strings' });
    }

    // load products
    const raw = fs.existsSync(DATA_FILE) ? await fs.promises.readFile(DATA_FILE, 'utf8') : '[]';
    const products = JSON.parse(raw);

    // validate/parse rules (will throw with message if invalid)
    parseRules(rules);

    const result = evaluateProducts(products, rules);
    return res.json({ count: result.length, results: result });
  } catch (err) {
    return res.status(400).json({ error: String(err.message) });
  }
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://0.0.0.0:${PORT}`);
  console.log(`[api] docs: http://0.0.0.0:${PORT}/docs`);
});