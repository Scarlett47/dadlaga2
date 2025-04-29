import './globals.css';
import NavigationWrapper from '@/components/navigation-wrapper';
import { CartProvider } from '@/app/context/CartContext'; // ✨

export const metadata = {
  title: 'Camera Shop',
  description: 'Суурин камерын дэлгүүр',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body className="bg-gray-100">
        <CartProvider> {/* ✨ Энд бүх child-уудыг ороож өгнө */}
          <NavigationWrapper />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
