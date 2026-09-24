'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <main style={styles.empty}>
        <p style={{ fontSize: 20 }}>{t.emptyCart}</p>
        <Link href="/" style={styles.backLink}>
          {t.backToMenu}
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20, fontSize: 30, textAlign: 'center' }}>{t.cart}</h2>

      {items.map((item) => (
        <div key={item.priceId} style={styles.row}>
          <div>
            <strong style={{ fontSize: 19 }}>{item.name}</strong>
            <div style={{ fontSize: 15, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
              {item.pieces} {t.pieces} - {item.size === 'small' ? t.small : t.big} - {item.unitPrice} د.أ
            </div>
          </div>

          <div style={styles.qtyControls}>
            <button style={styles.qtyBtn} onClick={() => updateQuantity(item.priceId, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button style={styles.qtyBtn} onClick={() => updateQuantity(item.priceId, item.quantity + 1)}>
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.priceId)} style={styles.removeBtn}>
            {t.remove}
          </button>
        </div>
      ))}

      <div style={styles.totalRow}>
        <strong>{t.total}</strong>
        <strong>{totalPrice.toFixed(2)} د.أ</strong>
      </div>

      <Link href="/checkout" style={styles.checkoutBtn}>
        {t.checkout}
      </Link>
    </main>
  );
}

const styles = {
  empty: { padding: 60, textAlign: 'center' },
  backLink: { color: 'var(--gold)', fontWeight: 'bold' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--line)',
    gap: 10,
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid var(--line)',
    borderRadius: 6,
    padding: '4px 10px',
    background: 'var(--paper-light)',
  },
  qtyBtn: { border: 'none', background: 'none', fontSize: 18, color: 'var(--ink)' },
  removeBtn: { color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '18px 0',
    fontSize: 20,
    borderTop: '2px solid var(--ink)',
    marginTop: 6,
  },
  checkoutBtn: {
    display: 'block',
    textAlign: 'center',
    padding: 16,
    background: 'var(--ink)',
    color: '#f3e8d6',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
};
