"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
	const { id } = useParams();
	const { addToCart } = useCart();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState("");

	useEffect(() => {
		async function fetchProduct() {
			try {
				const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
				const data = await res.json();
				setProduct(data);
			} catch (error) {
				console.error("Бүтээгдэхүүн уншихад алдаа:", error);
			}
		}

		if (id) {
			fetchProduct();
		}
	}, [id]);

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addToCart(product);
		}
		setMessage("🎉 Амжилттай сагсанд нэмэгдлээ!");
		setTimeout(() => setMessage(""), 3000);
	};

	const increaseQty = () => setQuantity((q) => q + 1);
	const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					{product.name}
				</h1>
				<p className="text-gray-600 mb-6">{product.description}</p>
				<p className="text-2xl font-bold text-green-600 mb-6">
					{product.price}₮
				</p>

				{/* ➕ ➖ тоо хэмжээ */}
				<div className="flex items-center gap-4 mb-6">
					<button
						onClick={decreaseQty}
						className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg text-lg font-bold"
					>
						-
					</button>
					<span className="text-lg font-bold">{quantity}</span>
					<button
						onClick={increaseQty}
						className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg text-lg font-bold"
					>
						+
					</button>
				</div>

				{/* Амжилттай нэмэгдлээ */}
				{message && (
					<div className="mb-4 text-green-600 font-medium bg-green-100 border border-green-300 rounded-lg p-3">
						{message}
					</div>
				)}

				<div className="flex flex-col md:flex-row gap-4">
					<button
						onClick={handleAddToCart}
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
