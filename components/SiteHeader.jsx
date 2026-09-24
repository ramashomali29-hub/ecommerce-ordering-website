'use client';

import { useLanguage } from '../context/LanguageContext';

export default function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header style={styles.header}>
      <div style={styles.frame}>
        <div style={styles.logoCircle}>
          {/*
            حطي هون اللوقو الحقيقي تبعك:
            1) خزّني صورة اللوقو باسم logo.png جوا مجلد public/ بالمشروع
            2) بدّلي السطر تحت بـ:
               <img src="/logo.png" alt="Luck Cookies" style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}} />
          */}
          🍪
        </div>
        <h1 style={styles.title}>Luck Cookies</h1>
        <div style={styles.tag}>{t.tagline}</div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    padding: '28px 16px 20px',
    textAlign: 'center',
    borderBottom: '1px solid var(--line)',
  },
  frame: { maxWidth: 480, margin: '0 auto' },
  logoCircle: {
    width: 90,
    height: 90,
    margin: '0 auto 12px',
    borderRadius: '50%',
    background: 'var(--paper-light)',
    border: '3px solid var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  title: { fontSize: 40, letterSpacing: 1 },
  tag: {
    fontSize: 13,
    letterSpacing: 3,
    color: 'var(--gold)',
    marginTop: 8,
    textTransform: 'uppercase',
  },
};
