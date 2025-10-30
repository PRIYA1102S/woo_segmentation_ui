import React, { useState } from 'react';

export default function RuleEditor({ onEvaluate, loading }) {
  const [rules, setRules] = useState(`price > 100\nstock_status = instock\non_sale = true`);

  function submit(e) {
    e.preventDefault();
    if (!rules.trim()) {
      alert('Enter at least one rule');
      return;
    }
    onEvaluate(rules);
  }

  return (
    <form onSubmit={submit}>
      <textarea value={rules} onChange={e => setRules(e.target.value)} rows={8} />
      <div>
        <button type="submit" disabled={loading}>{loading ? 'Evaluating...' : 'Evaluate'}</button>
      </div>
      <p className="hint">One condition per line. Examples: price &gt; 100, stock_status = instock, on_sale = true</p>
    </form>
  );
}