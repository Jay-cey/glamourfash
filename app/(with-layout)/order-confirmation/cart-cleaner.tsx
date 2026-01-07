"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";

export function CartCleaner() {
    // @ts-ignore - Context is JS
    const { clearCart } = useCart();

    useEffect(() => {
        console.log("🛒 CartCleaner mounted - Attempting to clear cart");
        // Clear the cart when this component mounts (which implies successful order page load)
        clearCart();
        console.log("🛒 CartCleaner finished");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
