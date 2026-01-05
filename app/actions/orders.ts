"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { CartItem } from "@/app/types";
import { z } from "zod";

const prisma = new PrismaClient();

const orderSchema = z.object({
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  cardNumber: z.string().min(1),
  expiry: z.string().min(1),
  cvc: z.string().min(1),
});

export async function createOrder(formData: FormData, cart: CartItem[]) {
  const session = await auth();
  
  const rawData = {
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    cardNumber: formData.get("cardNumber"),
    expiry: formData.get("expiry"),
    cvc: formData.get("cvc"),
  };

  const validatedFields = orderSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { email, address, city, postalCode } = validatedFields.data;

  // 1. Fetch products to get real prices and validate stock
  const productIds = cart.map((item) => item.itemId);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  // 2. Calculate totals server-side
  let subtotal = 0;
  const orderItemsData = [];

  for (const cartItem of cart) {
    const product = products.find((p) => p.id === cartItem.itemId);
    
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

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation failed:", error);
    return { success: false, error: "Failed to create order" };
  }
}