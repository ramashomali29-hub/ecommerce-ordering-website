'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 10.5 12 4l8 6.5M6 9.5V19a1 1 0 0 0 1 1h3v-5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v5h3a1 1 0 0 0 1-1V9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 8V6.5a5 5 0 0 1 10 0V8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="4" y="8" width="16" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19c1.2-3.2 4-4.8 7-4.8s5.8 1.6 7 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TopNav() {
  const { t, toggleLanguage } = useLanguage();
  const { totalItems } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <nav style={styles.nav}>
      <Link href="/" className="nav-icon" style={styles.iconItem} aria-label={t.flavors}>
        <HomeIcon />
      </Link>

      <Link href="/cart" className="nav-icon" style={styles.iconItem} aria-label={t.cart}>
        <BagIcon />
        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
      </Link>

      {user ? (
        <button type="button" onClick={logout} className="nav-icon" style={styles.iconItem} aria-label={t.logout}>
          <UserIcon />
        </button>
      ) : (
        <Link href="/account" className="nav-icon" style={styles.iconItem} aria-label={t.account}>
          <UserIcon />
        </Link>
      )}

      <button type="button" onClick={toggleLanguage} style={styles.langBtn}>
        {t.language}
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    padding: '12px 16px',
    background: 'var(--paper-light)',
    borderBottom: '1px solid var(--line)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  iconItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ink)',
    background: 'none',
    border: 'none',
    textDecoration: 'none',
    padding: 4,
    transition: 'color 200ms ease, transform 200ms ease',
    cursor: 'pointer',
  },
  badge: {
    position: 'absolute',
    top: -6,
    insetInlineEnd: -10,
    background: 'var(--gold)',
    color: '#fff',
    borderRadius: '50%',
    minWidth: 18,
    height: 18,
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
  },
  langBtn: {
    background: 'none',
    border: '1px solid var(--gold)',
    borderRadius: 999,
    padding: '5px 12px',
    color: 'var(--ink)',
    fontSize: 13,
  },
};
