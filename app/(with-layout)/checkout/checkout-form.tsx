"use client";

import { useEffect, useState, FormEvent } from "react";
import { useCart } from "@/app/context/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { createOrder } from "@/app/actions/orders";
import { z } from "zod";
import { CartItem } from "@/app/types";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().min(3, "CVC is required"),
});

interface CheckoutFormProps {
  user?: {
    email?: string | null;
    [key: string]: any;
  } | null;
}

export default function CheckoutForm({ user }: CheckoutFormProps) {
  const { cart, clearCart } = useCart() as { cart: CartItem[]; clearCart: () => void };
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce((total: number, item: CartItem) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return total + price * item.quantity;
  }, 0);
  
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validation = checkoutSchema.safeParse(data);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setIsProcessing(false);
      return;
    }
    
    try {
      const result = await createOrder(formData, cart);
      
      if (result.success) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation?id=${result.orderId}`);
      } else {
        toast.error("Something went wrong. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/shop/products" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/shop/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Shopping
          </Link>
          <h1 className="text-3xl font-serif mt-4">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Left Column: Forms */}
          <section className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      defaultValue={user?.email || ""}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" 
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" name="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" name="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <input type="text" id="postal-code" name="postalCode" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card number</label>
                    <input type="text" id="card-number" name="cardNumber" placeholder="0000 0000 0000 0000" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry date (MM/YY)</label>
                      <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                      <input type="text" id="cvc" name="cvc" placeholder="123" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <FaLock className="w-4 h-4" /> Pay ${total.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Right Column: Order Summary */}
          <section className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {cart.map((item: CartItem) => (
                    <li key={item.itemId} className="flex py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.images[0].src}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                          {item.selectedSize && <p className="text-gray-500">Size: {item.selectedSize.name}</p>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}