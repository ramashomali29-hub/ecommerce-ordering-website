'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const prices = product.product_prices || [];

  const [selectedPriceId, setSelectedPriceId] = useState(prices[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedPrice = prices.find((p) => p.id === selectedPriceId);

  const imageSrc =
    product.image_url ||
    `https://placehold.co/700x560/EFE1C8/9C6B32?font=playfair-display&text=${encodeURIComponent(
      product.name
    )}`;

  function handleAdd() {
    if (!selectedPrice) return;
    addToCart(product, selectedPrice, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <main style={{ padding: '20px 16px 40px', maxWidth: 560, margin: '0 auto' }}>
      <Link href="/" style={styles.backLink}>
        ← {t.backToMenu}
      </Link>

      <div style={styles.imageWrap}>
        <img src={imageSrc} alt={product.name} style={styles.image} />
      </div>

      <h1 style={styles.name}>{product.name}</h1>
      {product.description && <p style={styles.desc}>{product.description}</p>}

      <select
        style={styles.select}
        value={selectedPriceId ?? ''}
        onChange={(e) => setSelectedPriceId(e.target.value)}
      >
        {prices.map((p) => (
          <option key={p.id} value={p.id}>
            {p.pieces} {t.pieces} - {p.size === 'small' ? t.small : t.big} - {p.price} د.أ
          </option>
        ))}
      </select>

      <div style={styles.row}>
        <div style={styles.qtyBox}>
          <button style={styles.qtyBtn} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span style={styles.qtyValue}>{quantity}</span>
          <button style={styles.qtyBtn} onClick={() => setQuantity((q) => q + 1)}>
            +
          </button>
        </div>
        <button onClick={handleAdd} style={styles.addBtn}>
          {justAdded ? t.added : t.addToCart}
        </button>
      </div>
    </main>
  );
}

const styles = {
  backLink: {
    display: 'inline-block',
    marginBottom: 16,
    color: 'var(--gold)',
    textDecoration: 'none',
    fontSize: 16,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: '5 / 4',
    overflow: 'hidden',
    background: '#e9dcc2',
    borderRadius: 6,
    marginBottom: 18,
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  name: { fontSize: 32, marginBottom: 6, textAlign: 'center' },
  desc: {
    fontSize: 18,
    color: 'var(--ink-soft)',
    fontStyle: 'italic',
    lineHeight: 1.4,
    textAlign: 'center',
    marginBottom: 20,
  },
  select: {
    width: '100%',
    padding: '12px 10px',
    borderRadius: 6,
    border: '1px solid var(--line)',
    marginBottom: 16,
    background: '#fff',
    color: 'var(--ink)',
    fontSize: 16,
  },
  row: { display: 'flex', gap: 10, alignItems: 'center' },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--line)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  qtyBtn: { width: 38, height: 42, border: 'none', background: '#fff', fontSize: 20, color: 'var(--ink)' },
  qtyValue: { width: 34, textAlign: 'center', fontSize: 17 },
  addBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: 6,
    border: 'none',
    background: 'var(--gold)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
};
