'use client'; // ✨ Хамгийн эхэнд бичнэ, нэг зай ч алдахгүй!

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}₮</p>
      <button
        onClick={() => {
          console.log('Сагсанд нэмэх товч дарагдлаа ✅');
          addToCart(product);
        }}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'teal',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        🛒 Сагсанд нэмэх
      </button>
      <br />
      <Link href="/">⬅ Буцах</Link>
    </div>
  );
}
