import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth"; // Your auth system

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // SECURITY: Verify user is authenticated
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { items, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items provided", { status: 400 });
    }

    // SECURITY: Calculate total on server by fetching actual prices from DB
    // Never trust client-sent prices
    const itemIds = items.map((item: any) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: itemIds } },
      select: { id: true, price: true, name: true, images: true, category: true }
    });

    // Create a map for quick lookup
    const productMap = new Map(products.map(p => [p.id, p]));

    // Calculate actual total using DB prices
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = productMap.get(item.id);
      if (!product) {
        return new NextResponse(`Product ${item.id} not found`, { status: 400 });
      }

      // Use DB price, not client price
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        size: item.size || null,
        image: product.images[0]?.src || "",
        category: product.category,
      });
    }

    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;
    const totalAmount = Math.round(total * 100); // Convert to cents

    // SECURITY: Create order in database FIRST (with PENDING status)
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        subtotal,
        shipping,
        total,
        // Map available fields to schema requirements
        email: session.user.email || "",
        address: shippingAddress?.address || shippingAddress?.line1 || "",
        city: shippingAddress?.city || "",
        postalCode: shippingAddress?.postalCode || "",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    // SECURITY: Create payment intent with order ID in metadata
    // This allows webhook to update the correct order
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
      // Optional: Add receipt email
      receipt_email: session.user.email,
    });

    // Store payment intent ID in order for reference
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      orderId: order.id 
    });

  } catch (error) {
    console.error("[PAYMENT_INTENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}