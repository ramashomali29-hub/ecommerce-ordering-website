import { supabase } from '../lib/supabaseClient';
import HomeContent from '../components/HomeContent';

// Server Component: بتجيب البيانات مباشرة من قاعدة البيانات وقت تحميل الصفحة
export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, image_url, product_prices(id, pieces, size, price)')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    return <p style={{ padding: 40 }}>صار خطأ بجلب المنتجات: {error.message}</p>;
  }

  return <HomeContent products={products} />;
}
