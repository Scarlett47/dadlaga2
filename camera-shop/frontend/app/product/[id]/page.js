'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Бүтээгдэхүүн уншихад алдаа:', error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Бүтээгдэхүүн ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-6">{product.price}₮</p>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 w-full md:w-auto"
          >
            🛒 Сагсанд нэмэх
          </button>
          <Link
            href="/"
            className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 w-full md:w-auto text-center"
          >
            ⬅ Буцах
          </Link>
        </div>
      </div>
    </div>
  );
}
