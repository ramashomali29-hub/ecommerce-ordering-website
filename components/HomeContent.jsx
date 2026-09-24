'use client';

import ProductCard from './ProductCard';
import HeroCarousel from './HeroCarousel';
import { useLanguage } from '../context/LanguageContext';

export default function HomeContent({ products }) {
  const { t } = useLanguage();

  return (
    <main>
      <HeroCarousel />

      <div style={{ padding: '28px 16px 20px', maxWidth: 760, margin: '0 auto' }}>
        <h2 style={styles.heading}>{t.flavors}</h2>
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

const styles = {
  heading: { textAlign: 'center', color: 'var(--gold)', fontSize: 26, letterSpacing: 2, marginBottom: 22 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 },
};
