"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { CartItem } from "@/app/types";
import { z } from "zod";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const orderSchema = z.object({
  email: z.email(),
  address: z.string().min(1),
  city: z.string().min(2),
  postalCode: z.string().min(1),
});

export async function createOrder(formData: FormData, cart: CartItem[]) {
  const session = await auth();
  
  const rawData = {
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
  };

  const validatedFields = orderSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { email, address, city, postalCode } = validatedFields.data;

  // 1. Fetch products to get real prices and validate stock
  const productIds = cart.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  // 2. Calculate totals server-side
  let subtotal = 0;
  const orderItemsData = [];

  for (const cartItem of cart) {
    const product = products.find((p) => p.id === cartItem.productId);
    
    if (!product) {
      return { success: false, error: `Product not found: ${cartItem.name}` };
    }

    subtotal += product.price * cartItem.quantity;

    orderItemsData.push({
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
      image: product.images[0]?.src || "",
      category: product.category,
      size: cartItem.selectedSize?.name,
    });
  }

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  // 3. Create Order
  try {
    const order = await prisma.order.create({
      data: {
        email,
        address,
        city,
        postalCode,
        subtotal,
        shipping,
        total,
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      metadata: { orderId: order.id },
      automatic_payment_methods: { enabled: true },
    });

    return { success: true, orderId: order.id, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Order creation failed:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getUserOrders(email: string | null | undefined) {
  if (!email) {
    return [];
  }

  try {
    const orders = await prisma.order.findMany({
      where: { email },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export async function getOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    return order;
  } catch (error) {
    console.error("Failed to fetch order by ID:", error);
    return null;
  }
}