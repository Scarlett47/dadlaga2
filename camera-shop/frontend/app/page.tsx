"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const access = localStorage.getItem("access");
		if (!access) {
			setIsAuthenticated(false);
		} else {
			setIsAuthenticated(true);
		}
	}, []);

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/login");
		}
		if (isAuthenticated === true) {
			fetchProducts();
		}
	}, [isAuthenticated, router]);

	const fetchProducts = async () => {
		try {
			const res = await fetch("http://127.0.0.1:8000/api/products/");
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			console.error("Бараа татахад алдаа:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	if (isAuthenticated === null || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-gray-500">Түр хүлээнэ үү...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
				🎥 Камерууд
			</h1>

			{/* 🔍 Search Bar */}
			<div className="max-w-md mx-auto mb-10">
				<input
					type="text"
					placeholder="Камерын нэрээр хайх..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full rounded-xl px-4 py-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<div
							key={product.id}
							className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
						>
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h2 className="text-xl font-semibold text-gray-800">
								{product.name}
							</h2>
							<p className="text-gray-600 mb-4">{product.price}₮</p>

							<Link
								href={`/product/${product.id}`}
								className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
							>
								📄 Дэлгэрэнгүй
							</Link>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 col-span-full">
						Илэрц олдсонгүй
					</p>
				)}
			</div>
		</div>
	);
}
