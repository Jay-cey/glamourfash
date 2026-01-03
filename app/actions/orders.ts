"use server";

import { prisma } from "@/lib/prisma";

interface CartItem {
  name: string;
  price: string;
  quantity: number;
  images: { src: string; alt?: string }[];
  category: string;
  selectedSize?: { name: string } | null;
  selectedColor?: { name: string } | null;
}

interface Calculations {
  subtotal: number;
  shipping: number;
  total: number;
}

export async function createOrder(formData: FormData, cart: CartItem[], calculations: Calculations) {
  const { subtotal, shipping, total } = calculations;
  
  const rawFormData = {
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    postalCode: formData.get("postalCode") as string,
  };

  try {
    const order = await prisma.order.create({
      data: {
        ...rawFormData,
        subtotal,
        shipping,
        total,
        items: {
          create: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0].src,
            category: item.category,
            size: item.selectedSize?.name || null,
            color: item.selectedColor?.name || null,
          })),
        },
      },
    });
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrder(orderId: string) {
  if (!orderId) return null;
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    return order;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return null;
  }
}

export async function getUserOrders(email: string) {
  if (!email) return [];
  try {
    const orders = await prisma.order.findMany({
      where: { email },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders;
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}