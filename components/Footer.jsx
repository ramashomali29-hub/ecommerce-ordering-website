'use client';

import { useLanguage } from '../context/LanguageContext';

const INSTAGRAM_URL = 'https://www.instagram.com/luckc.ookies?igsh=dHc2eDk4OHNrc3R3';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={styles.footer}>
      <div style={styles.text}>{t.findUs}</div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="insta-icon"
        style={styles.iconLink}
        aria-label="Instagram"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="6" stroke="var(--ink)" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="var(--ink)" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="var(--ink)" />
        </svg>
      </a>
    </footer>
  );
}

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: '26px 16px 40px',
    borderTop: '1px solid var(--line)',
    marginTop: 30,
  },
  text: { fontSize: 15, color: 'var(--ink-soft)', letterSpacing: 1 },
  iconLink: { display: 'inline-flex' },
};
