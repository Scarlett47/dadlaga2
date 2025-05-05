"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (product) => {
		setCartItems((prevItems) => [...prevItems, product]);
	};

	const removeFromCart = (id) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const increaseQuantity = (id) => {
		const item = cartItems.find((item) => item.id === id);
		if (item) addToCart(item);
	};

	const decreaseQuantity = (id) => {
		let removed = false;
		setCartItems((prevItems) =>
			prevItems.filter((item) => {
				if (!removed && item.id === id) {
					removed = true;
					return false;
				}
				return true;
			}),
		);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				clearCart,
				increaseQuantity,
				decreaseQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}
