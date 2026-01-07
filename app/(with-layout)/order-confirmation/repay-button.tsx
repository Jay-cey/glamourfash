"use client";

import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { FaRedo } from "react-icons/fa";

interface RepayButtonProps {
    items: any[];
}

export function RepayButton({ items }: RepayButtonProps) {
    // @ts-ignore
    // @ts-ignore
    const { replaceCart } = useCart();
    const router = useRouter();

    const handleRepay = () => {
        const newCartItems = items.map((item) => {
            const colorObj = item.color ? { name: item.color, id: item.color } : undefined;
            const sizeObj = item.size ? { name: item.size } : undefined;
            const itemId = `${item.name}-${colorObj?.id || 'default'}-${sizeObj?.name || 'default'}`;

            return {
                ...item, // Keep original properties
                id: item.productId,
                productId: item.productId,
                images: [{ src: item.image, alt: item.name }],
                selectedColor: colorObj,
                selectedSize: sizeObj,
                itemId: itemId
            };
        });

        replaceCart(newCartItems);
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
