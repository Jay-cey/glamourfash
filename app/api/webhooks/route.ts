import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // SECURITY: Verify webhook signature to ensure it's from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`⚠️  Webhook signature verification failed:`, error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  console.log(`✅ Webhook verified: ${event.type}`);

  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
      break;

    case "payment_intent.payment_failed":
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;

    case "payment_intent.processing":
      await handlePaymentProcessing(event.data.object as Stripe.PaymentIntent);
      break;

    case "payment_intent.canceled":
      await handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) {
    console.error("⚠️  No orderId in payment intent metadata");
    return;
  }

  try {
    // SECURITY: Update order status to PAID
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: "PAID",
        paidAt: new Date(),
      },
      include: { 
        items: true,
        user: {
          select: {
            email: true,
            name: true,
          }
        }
      },
    });

    console.log(`✅ Order ${orderId} marked as PAID`);

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(order);
      console.log(`✅ Confirmation email sent for order ${orderId}`);
    } catch (emailError) {
      console.error(`⚠️  Failed to send email for order ${orderId}:`, emailError);
      // Don't fail the webhook if email fails
    }

    // Optional: Trigger inventory updates, fulfillment, etc.
    // await updateInventory(order.items);
    // await triggerFulfillment(order);

  } catch (error) {
    console.error(`❌ Error processing payment success for order ${orderId}:`, error);
    // Consider implementing retry logic or dead letter queue here
    throw error; // This will cause Stripe to retry the webhook
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) {
    console.error("⚠️  No orderId in payment intent metadata");
    return;
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: "FAILED",
        failureReason: paymentIntent.last_payment_error?.message || "Payment failed",
      },
    });

    console.log(`❌ Order ${orderId} marked as FAILED`);

    // Optional: Send payment failed email to customer
    // await sendPaymentFailedEmail(orderId);

  } catch (error) {
    console.error(`❌ Error processing payment failure for order ${orderId}:`, error);
    throw error;
  }
}

async function handlePaymentProcessing(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) {
    console.error("⚠️  No orderId in payment intent metadata");
    return;
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PROCESSING" },
    });

    console.log(`⏳ Order ${orderId} marked as PROCESSING`);

  } catch (error) {
    console.error(`❌ Error processing payment processing for order ${orderId}:`, error);
  }
}

async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) {
    console.error("⚠️  No orderId in payment intent metadata");
    return;
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELED" },
    });

    console.log(`🚫 Order ${orderId} marked as CANCELED`);

  } catch (error) {
    console.error(`❌ Error processing payment cancellation for order ${orderId}:`, error);
  }
}