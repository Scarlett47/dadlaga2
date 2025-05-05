"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
	const { cartItems, clearCart } = useCart();
	const router = useRouter();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const total = cartItems.reduce(
		(sum, item) => sum + parseFloat(item.price),
		0,
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !phone || !address) {
			setMessage("⚠️ Бүх талбарыг бөглөнө үү.");
			return;
		}

		setIsSubmitting(true);

		const formattedItems = cartItems.map((item) => ({
			product_name: item.name,
			product_price: item.price,
			quantity: 1,
		}));

		const access = localStorage.getItem("access"); // ✨ access token авч байна

		try {
			const res = await fetch("http://127.0.0.1:8000/api/orders/create/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access}`, // ✅ ЭНЭ МАШ ЧУХАЛ
				},
				body: JSON.stringify({
					customer_name: name,
					phone_number: phone,
					delivery_address: address,
					total_amount: total,
					items: formattedItems,
				}),
			});

			if (res.ok) {
				setMessage("🎉 Захиалга амжилттай илгээгдлээ!");
				clearCart();
				setTimeout(() => router.push("/orders"), 2000);
			} else {
				setMessage("❌ Алдаа гарлаа. Дахин оролдоно уу.");
			}
		} catch (error) {
			console.error("Захиалга илгээхэд алдаа:", error);
			setMessage("❌ Сервертэй холбогдож чадсангүй.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
					🧾 Захиалга өгөх
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-gray-700 font-semibold mb-2">
							Нэр
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div>
						<label className="block text-gray-700 font-semibold mb-2">
							Утасны дугаар
						</label>
						<input
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div>
						<label className="block text-gray-700 font-semibold mb-2">
							Хүргүүлэх хаяг
						</label>
						<textarea
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
							rows="3"
						></textarea>
					</div>

					<div className="text-right text-lg font-bold">
						Нийт төлөх: {total.toFixed(2)}₮
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
					>
						{isSubmitting ? "Илгээж байна..." : "✅ Захиалга баталгаажуулах"}
					</button>

					{message && (
						<div className="text-center mt-4 text-gray-700">{message}</div>
					)}
				</form>
			</div>
		</div>
	);
}
