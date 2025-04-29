'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (!access) return;

    async function fetchOrders() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/orders/', {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error('Захиалга татахад алдаа гарлаа');
        }
      } catch (error) {
        console.error('Сервертэй холбогдож чадсангүй:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">🧾 Миний захиалгууд</h1>

        {loading ? (
          <p className="text-center text-gray-500">Уншиж байна...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">Одоогоор захиалга байхгүй байна.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📄 Захиалга #{order.id}
                </h2>
                <p className="text-gray-600 mb-2">👤 Захиалагч: {order.customer_name}</p>
                <p className="text-gray-600 mb-2">📞 Утас: {order.phone_number}</p>
                <p className="text-gray-600 mb-4">🏠 Хаяг: {order.delivery_address}</p>

                <div className="bg-white rounded-lg p-4 shadow-inner mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">🛒 Бараанууд:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product_name} — {item.product_price}₮ (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-right text-lg font-bold text-green-600">
                  Нийт: {order.total_amount}₮
                </div>

                <p className="text-sm text-gray-400 text-right mt-2">
                  🕒 Захиалсан огноо: {new Date(order.created_at).toLocaleString('mn-MN')}
                </p>
              </div>
            ))}
          </div>
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
