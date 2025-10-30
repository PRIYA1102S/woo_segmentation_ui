import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import RuleEditor from './components/RuleEditor';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [evalResult, setEvalResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  async function onEvaluate(rulesText) {
    setLoading(true);
    setEvalResult(null);
    try {
      const res = await fetch(`${API_BASE}/segments/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: rulesText })
      });
      const json = await res.json();
      setEvalResult(json);
    } catch (e) {
      setEvalResult({ error: String(e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Woo Segmentation UI</h1>
      <section className="left">
        <h2>Products</h2>
        <div className="grid">
          {products && products.length ? products.map(p => <ProductCard key={p.id} p={p} />) : <div>No products</div>}
        </div>
      </section>

      <section className="right">
        <h2>Segment Editor</h2>
        <RuleEditor onEvaluate={onEvaluate} loading={loading} />
        <h3>Result</h3>
        <pre className="result">{evalResult ? JSON.stringify(evalResult, null, 2) : 'Submit rules to see results'}</pre>
      </section>
    </div>
  );
}