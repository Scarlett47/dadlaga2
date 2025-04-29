'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">🛒 Миний сагс</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Таны сагс хоосон байна.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">{item.price}₮</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md font-bold transition-all duration-300"
                  >
                    ❌ Хасах
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right text-xl font-bold">
              Нийт үнэ: {totalPrice.toFixed(2)}₮
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-8 space-y-4 md:space-y-0">
              <button
                onClick={clearCart}
                className="w-full md:w-auto bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-xl transition-all duration-300"
              >
                🗑 Сагс хоослох
              </button>
              <button
                onClick={handleCheckout}
                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl transition-all duration-300"
              >
                ✅ Захиалга өгөх
              </button>
            </div>
          </>
        )}

        <div className="text-center mt-10">
          <Link href="/" className="text-blue-500 hover:underline">
            ⬅ Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    </div>
  );
}
