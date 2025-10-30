import React from 'react';

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <h3>{p.title}</h3>
      <div>Price: {p.price || '—'}</div>
      <div>Stock: {p.stock_status || '—'}</div>
      <div>Qty: {p.stock_quantity === null ? '—' : p.stock_quantity}</div>
      <div>Category: {p.category || '—'}</div>
      <div>Tags: {Array.isArray(p.tags) ? p.tags.join(', ') : ''}</div>
      <div>On Sale: {p.on_sale ? 'Yes' : 'No'}</div>
      <div className="muted">Created: {p.created_at}</div>
    </div>
  );
}