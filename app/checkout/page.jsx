'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { ammanAreas } from '../../lib/ammanAreas';
import { supabase } from '../../lib/supabaseClient';

const DELIVERY_FEE = 3;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { language, t } = useLanguage();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const grandTotal = totalPrice + DELIVERY_FEE;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const currentUser = data.user ?? null;
      setUser(currentUser);
      setName(currentUser?.user_metadata?.full_name ?? '');
      setPhone(currentUser?.user_metadata?.phone ?? '');
      setCheckingAuth(false);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !area || !street.trim()) {
      setError(t.requiredFields);
      return;
    }

    const normalizedPhone = phone.replace(/\s|-/g, '');
    if (!/^07[789]\d{7}$/.test(normalizedPhone)) {
      setError(t.invalidPhone);
      return;
    }

    const selectedArea = ammanAreas.find((item) => item.value === area);
    const fullAddress = `${selectedArea?.ar ?? area} | ${selectedArea?.en ?? area} - ${street.trim()}`;

    setLoading(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: name.trim(),
          phone: normalizedPhone,
          address: fullAddress,
          total: grandTotal,
          status: 'pending',
        })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        price_id: item.priceId,
        product_name: item.name,
        size: item.size,
        pieces: item.pieces,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      }));
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      setSuccess(true);
    } catch (requestError) {
      setError(requestError.message || t.authError);
    } finally {
      setLoading(false);
    }
  }

  if (checkingAuth) return <main style={styles.center}>{t.processing}</main>;

  if (!user) {
    return (
      <main style={styles.center}>
        <div style={styles.authCard}>
          <h2 style={{ fontSize: 28 }}>{t.loginRequired}</h2>
          <p style={{ color: 'var(--ink-soft)' }}>{t.loginRequiredText}</p>
          <Link href="/account" style={styles.accountLink}>{t.goToAccount}</Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main style={styles.center}>
        <h2 style={{ fontSize: 32 }}>{t.orderReceived}</h2>
        <p style={{ fontSize: 18, color: 'var(--ink-soft)' }}>{t.contactMessage} {phone} {t.confirmDelivery}</p>
      </main>
    );
  }

  if (items.length === 0) return <main style={styles.center}><p style={{ fontSize: 20 }}>{t.chooseCookies}</p></main>;

  return (
    <main style={styles.page}>
      <h2 style={styles.heading}>{t.completeOrder}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          {t.name}
          <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label style={styles.label}>
          {t.phone}
          <input type="tel" inputMode="numeric" style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePlaceholder} autoComplete="tel" />
          <small style={styles.note}>{t.phoneNote}</small>
        </label>
        <label style={styles.label}>
          {t.area}
          <select style={styles.input} value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">{t.chooseArea}</option>
            {ammanAreas.map((item) => <option key={item.value} value={item.value}>{item[language]}</option>)}
          </select>
        </label>
        <label style={styles.label}>
          {t.street}
          <textarea style={{ ...styles.input, minHeight: 82, resize: 'vertical' }} value={street} onChange={(e) => setStreet(e.target.value)} placeholder={t.streetPlaceholder} autoComplete="street-address" />
        </label>
        <div style={styles.summaryBox}>
          <div style={styles.summaryRow}><span>{t.productsTotal}</span><span>{totalPrice.toFixed(2)} د.أ</span></div>
          <div style={styles.summaryRow}><span>{t.ammanDelivery}</span><span>{DELIVERY_FEE.toFixed(2)} د.أ</span></div>
          <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}><span>{t.grandTotal}</span><span>{grandTotal.toFixed(2)} د.أ</span></div>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.submitBtn}>{loading ? t.processing : t.confirmOrder}</button>
      </form>
    </main>
  );
}

const styles = {
  page: { padding: '24px 16px 40px', maxWidth: 560, margin: '0 auto' },
  center: { padding: '60px 16px', textAlign: 'center', maxWidth: 560, margin: '0 auto' },
  heading: { textAlign: 'center', fontSize: 30, marginBottom: 22 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  label: { display: 'flex', flexDirection: 'column', gap: 7, fontSize: 16, fontWeight: 600 },
  input: { width: '100%', padding: '12px 13px', borderRadius: 8, border: '1px solid var(--line)', fontSize: 16, background: '#fff', color: 'var(--ink)' },
  note: { color: 'var(--gold)', fontSize: 13, fontWeight: 400 },
  summaryBox: { background: 'var(--paper-light)', border: '1px solid var(--line)', borderRadius: 10, padding: 16, marginTop: 6 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '5px 0', fontSize: 16 },
  summaryTotal: { borderTop: '1px solid var(--line)', marginTop: 7, paddingTop: 11, fontWeight: 'bold', fontSize: 19 },
  error: { color: 'var(--danger)', margin: 0, fontSize: 15 },
  submitBtn: { padding: 16, background: 'var(--ink)', color: '#f3e8d6', border: 'none', borderRadius: 8, fontWeight: 'bold', fontSize: 18 },
  authCard: { background: 'var(--paper-light)', border: '1px solid var(--line)', borderRadius: 12, padding: 28 },
  accountLink: { display: 'block', marginTop: 20, padding: 14, background: 'var(--ink)', color: '#f3e8d6', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold' },
};
