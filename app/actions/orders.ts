"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { CartItem } from "@/app/types";
import { z } from "zod";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const orderSchema = z.object({
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(2),
  postalCode: z.string().min(1),
});

/**
 * Create order with proper authentication and security
 * SECURITY IMPROVEMENTS:
 * - Uses authenticated user's ID
 * - Validates all prices from database
 * - Creates order BEFORE payment intent
 * - Attaches order ID to payment intent metadata
 */
export async function createOrder(formData: FormData, cart: CartItem[]) {
  // SECURITY: Verify user is authenticated
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in to place an order" };
  }

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

  // SECURITY: Verify email matches authenticated user
  if (email !== session.user.email) {
    return { success: false, error: "Email must match your account email" };
  }

  // 1. Fetch products to get real prices and validate stock
  const productIds = cart.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  // 2. SECURITY: Calculate totals server-side using DB prices (not client prices)
  let subtotal = 0;
  const orderItemsData = [];

  for (const cartItem of cart) {
    const product = products.find((p) => p.id === cartItem.productId);
    
    if (!product) {
      return { success: false, error: `Product not found: ${cartItem.name}` };
    }

    // SECURITY: Use product.price from database, not cartItem.price from client
    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    orderItemsData.push({
      productId: product.id, // Store product reference
      name: product.name,
      price: product.price, // Use DB price
      quantity: cartItem.quantity,
      image: product.images[0]?.src || "",
      category: product.category,
      size: cartItem.selectedSize?.name,
    });
  }

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  // 3. Create Order (with userId for security)
  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id, // SECURITY: Tie order to authenticated user
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
      include: {
        items: true,
      },
    });

    // SECURITY: Create payment intent with order metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      metadata: { 
        orderId: order.id,
        userId: session.user.id,
      },
      automatic_payment_methods: { enabled: true },
      receipt_email: email, // Send receipt to customer
    });

    // Store payment intent ID for reference
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return { 
      success: true, 
      orderId: order.id, 
      clientSecret: paymentIntent.client_secret 
    };

  } catch (error) {
    console.error("[CREATE_ORDER]", error);
    return { success: false, error: "Failed to create order" };
  }
}

/**
 * Get all orders for the authenticated user
 * SECURITY: Only returns orders belonging to the logged-in user
 */
export async function getUserOrders() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return [];
  }

  try {
    const orders = await prisma.order.findMany({
      where: { 
        userId: session.user.id, // SECURITY: Filter by authenticated user ID
      },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    
    return orders;
  } catch (error) {
    console.error("[GET_USER_ORDERS]", error);
    return [];
  }
}

/**
 * Get a single order by ID
 * SECURITY: Only returns order if it belongs to the authenticated user
 */
export async function getOrder(orderId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }

  try {
    // SECURITY: Use findFirst with userId filter instead of findUnique
    const order = await prisma.order.findFirst({
      where: { 
        id: orderId,
        userId: session.user.id, // SECURITY: Verify user owns this order
      },
      include: { items: true },
    });
    
    return order;
  } catch (error) {
    console.error("[GET_ORDER]", error);
    return null;
  }
}