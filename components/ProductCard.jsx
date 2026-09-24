'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  // صورة مؤقتة (placeholder) لحد ما تحطي صور المنتجات الحقيقية.
  // فيك تستبدليها بصورة حقيقية بحقل image_url بجدول products على Supabase.
  const imageSrc =
    product.image_url ||
    `https://placehold.co/500x400/EFE1C8/9C6B32?font=playfair-display&text=${encodeURIComponent(
      product.name
    )}`;

  return (
    <Link href={`/product/${product.id}`} style={styles.card}>
      <div style={styles.imageWrap}>
        <img src={imageSrc} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.name}>{product.name}</div>
    </Link>
  );
}

const styles = {
  card: {
    display: 'block',
    background: 'var(--paper-light)',
    border: '1px solid var(--line)',
    borderRadius: 4,
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'var(--ink)',
  },
  imageWrap: { width: '100%', aspectRatio: '5 / 4', overflow: 'hidden', background: '#e9dcc2' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  name: {
    padding: '14px 16px',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    fontFamily: "'Playfair Display', serif",
  },
};
