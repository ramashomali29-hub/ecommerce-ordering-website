import { CartProvider } from '../context/CartContext';
import { LanguageProvider } from '../context/LanguageContext';
import TopNav from '../components/TopNav';
import SiteHeader from '../components/SiteHeader';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Luck Cookies',
  description: 'كوكيز طازة، طرية، مخبوزة بحب',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <CartProvider>
            <TopNav />
            <SiteHeader />
            {children}
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
