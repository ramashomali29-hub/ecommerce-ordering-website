import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import ProductDetail from '../../../components/ProductDetail';

export default async function ProductPage({ params }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('id, name, description, image_url, product_prices(id, pieces, size, price)')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
