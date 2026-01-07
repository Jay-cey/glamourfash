"use client";

import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { FaRedo } from "react-icons/fa";

interface RepayButtonProps {
    items: any[];
}

export function RepayButton({ items }: RepayButtonProps) {
    // @ts-ignore
    const { clearCart, addToCart } = useCart();
    const router = useRouter();

    const handleRepay = () => {
        clearCart();

        items.forEach((item) => {
            // Reconstruct product object for addToCart
            const product = {
                id: item.productId,
                name: item.name,
                price: item.price,
                images: [{ src: item.image, alt: item.name }],
                category: item.category,
            };

            const color = item.color ? { name: item.color, id: item.color } : undefined;
            const size = item.size ? { name: item.size } : undefined;

            addToCart(product, item.quantity, color, size);
        });

        router.push("/checkout");
    };

    return (
        <button
            onClick={handleRepay}
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors w-full sm:w-auto mt-4"
        >
            <FaRedo className="mr-2" /> Try Payment Again
        </button>
    );
}
