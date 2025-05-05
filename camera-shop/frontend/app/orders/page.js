"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const access = localStorage.getItem("access");
		if (!access) return;

		async function fetchOrders() {
			try {
				const res = await fetch("http://127.0.0.1:8000/api/orders/", {
					headers: {
						Authorization: `Bearer ${access}`, // ✨ Token явуулна
					},
				});

				if (res.ok) {
					const data = await res.json();
					setOrders(data);
				} else {
					console.error("Захиалга татахад алдаа гарлаа");
				}
			} catch (error) {
				console.error("Сервертэй холбогдож чадсангүй:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchOrders();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-gray-500">Түр хүлээнэ үү...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
				🧾 Миний захиалгууд
			</h1>

			<div className="grid grid-cols-1 gap-6">
				{orders.map((order) => (
					<div key={order.id} className="bg-white rounded-xl p-6 shadow-lg">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							📄 Захиалга #{order.id}
						</h2>
						<p className="text-gray-600">👤 {order.customer_name}</p>
						<p className="text-gray-600">📞 {order.phone_number}</p>
						<p className="text-gray-600">🏠 {order.delivery_address}</p>

						<ul className="list-disc ml-6 mt-4 text-gray-700">
							{order.items.map((item, idx) => (
								<li key={idx}>
									{item.product_name} — {item.product_price}₮ x{item.quantity}
								</li>
							))}
						</ul>

						<p className="text-right font-bold text-green-600 mt-4">
							Нийт: {order.total_amount}₮
						</p>
					</div>
				))}
			</div>

			<div className="text-center mt-8">
				<Link href="/" className="text-blue-500 hover:underline">
					⬅ Нүүр хуудас руу буцах
				</Link>
			</div>
		</div>
	);
}
