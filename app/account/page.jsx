'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabaseClient';

export default function AccountPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [mode, setMode] = useState('login');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const normalizedPhone = phone.replace(/\s|-/g, '');
        if (!fullName.trim() || !/^07[789]\d{7}$/.test(normalizedPhone)) throw new Error(t.invalidPhone);

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName.trim(), phone: normalizedPhone } },
        });
        if (signUpError) throw signUpError;

        if (data.session) router.push('/checkout');
        else {
          setMessage(t.accountCreated);
          setMode('login');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push('/checkout');
        router.refresh();
      }
    } catch (authError) {
      setError(authError.message || t.authError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.tabs}>
          <button type="button" onClick={() => setMode('login')} style={{ ...styles.tab, ...(mode === 'login' ? styles.activeTab : {}) }}>{t.login}</button>
          <button type="button" onClick={() => setMode('signup')} style={{ ...styles.tab, ...(mode === 'signup' ? styles.activeTab : {}) }}>{t.createAccount}</button>
        </div>
        <h2 style={styles.heading}>{mode === 'login' ? t.login : t.createAccount}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === 'signup' && (
            <>
              <label style={styles.label}>{t.fullName}<input style={styles.input} value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required /></label>
              <label style={styles.label}>{t.phone}<input type="tel" style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} autoComplete="tel" required /></label>
              <small style={styles.note}>{t.phoneNote}</small>
            </>
          )}
          <label style={styles.label}>{t.email}<input type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
          <label style={styles.label}>{t.password}<input type="password" minLength={6} style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.passwordHint} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required /></label>
          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? (mode === 'signup' ? t.creating : t.loggingIn) : (mode === 'signup' ? t.createAccount : t.login)}
          </button>
        </form>
        <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setMessage(''); }} style={styles.switchBtn}>
          {mode === 'login' ? `${t.noAccount} ${t.createAccount}` : `${t.haveAccount} ${t.login}`}
        </button>
      </div>
    </main>
  );
}

const styles = {
  page: { padding: '35px 16px 60px', maxWidth: 500, margin: '0 auto' },
  card: { background: 'var(--paper-light)', border: '1px solid var(--line)', borderRadius: 14, padding: 24 },
  tabs: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 },
  tab: { padding: 10, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', borderRadius: 8, fontWeight: 600 },
  activeTab: { background: 'var(--gold)', color: '#fff', borderColor: 'var(--gold)' },
  heading: { textAlign: 'center', fontSize: 29, marginBottom: 22 },
  form: { display: 'flex', flexDirection: 'column', gap: 15 },
  label: { display: 'flex', flexDirection: 'column', gap: 7, fontWeight: 600 },
  input: { padding: '12px 13px', borderRadius: 8, border: '1px solid var(--line)', background: '#fff', color: 'var(--ink)', fontSize: 16 },
  note: { color: 'var(--gold)', fontSize: 13 },
  error: { color: 'var(--danger)', margin: 0 },
  success: { color: '#397044', margin: 0 },
  submitBtn: { padding: 14, border: 0, borderRadius: 8, background: 'var(--ink)', color: '#f3e8d6', fontSize: 17, fontWeight: 'bold' },
  switchBtn: { width: '100%', marginTop: 16, border: 0, background: 'transparent', color: 'var(--gold)', textDecoration: 'underline' },
};
