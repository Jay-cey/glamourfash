"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";

export function CartCleaner() {
    // @ts-ignore - Context is JS
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart when this component mounts (which implies successful order page load)
        clearCart();
    }, [clearCart]);

    return null;
}
