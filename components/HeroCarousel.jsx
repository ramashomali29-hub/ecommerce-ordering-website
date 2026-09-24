'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';


const SLIDES = [
  '/images/hero/coco1.png',
  '/images/hero/coco2.png',
  '/images/hero/coco4.png',
];

const INTERVAL_MS = 4000;

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={styles.hero}>
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            ...styles.heroImage,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}

      <div style={styles.heroOverlay}>
        <h2 style={styles.heroTitle}>{t.heroTitle}</h2>
        <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
      </div>

      <div style={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`slide ${i + 1}`}
            style={{
              ...styles.dot,
              background: i === index ? 'var(--gold)' : 'rgba(255,255,255,.55)',
            }}
          />
        ))}
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 7',
    overflow: 'hidden',
    background: 'var(--ink)',
  },
  heroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 900ms ease-in-out',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'rgba(62,43,28,0.32)',
    padding: '0 20px',
    zIndex: 2,
  },
  heroTitle: { color: '#fff', fontSize: 32, textShadow: '0 2px 8px rgba(0,0,0,.4)' },
  heroSubtitle: {
    color: '#fdf8ef',
    fontSize: 17,
    marginTop: 8,
    fontStyle: 'italic',
    textShadow: '0 2px 8px rgba(0,0,0,.4)',
  },
  dots: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    zIndex: 3,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'background 300ms ease',
  },
};
