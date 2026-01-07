import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Calculate total on server to prevent manipulation
    // In a real app, you should fetch product prices from your DB using item IDs
    const amount = items.reduce((total: number, item: any) => {
      const price = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return total + price * item.quantity;
    }, 0);

    const shipping = amount > 100 ? 0 : 15;
    const totalAmount = Math.round((amount + shipping) * 100); // Convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("[PAYMENT_INTENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}