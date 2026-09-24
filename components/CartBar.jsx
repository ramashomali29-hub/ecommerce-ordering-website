'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartBar() {
  const { totalItems, totalPrice } = useCart();
  const { t } = useLanguage();

  return (
    <Link href="/cart" style={styles.bar}>
      <span>🛒 {t.cart}</span>
      <span>{totalItems} {t.piece}</span>
      <span>{totalPrice.toFixed(2)} د.أ</span>
    </Link>
  );
}

const styles = {
  bar: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'var(--ink)',
    color: '#f3e8d6',
    padding: '16px 20px',
    fontWeight: 'bold',
    fontSize: 17,
    textDecoration: 'none',
    zIndex: 100,
    borderTop: '1px solid var(--gold)',
  },
};
