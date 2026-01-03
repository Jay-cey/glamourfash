"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/app/context/cart-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster position="bottom-right" />
      </CartProvider>
    </SessionProvider>
  );
}
