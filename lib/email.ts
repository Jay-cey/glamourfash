import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order: any) {
  // Fail silently or log if no API key is present (useful for dev/test without keys)
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email notification.");
    return;
  }

  try {
    await resend.emails.send({
      from: 'GlamourFash <onboarding@resend.dev>', // Update with your verified domain
      to: order.email,
      subject: `Order Confirmation #${order.id}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Thank you for your purchase!</h1>
          <p>Your order <strong>#${order.id}</strong> has been confirmed.</p>
          
          <div style="margin: 20px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 20px 0;">
            <h3>Order Summary</h3>
            ${order.items.map((item: any) => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
            
            <div style="display: flex; justify-content: space-between; margin-top: 20px; font-weight: bold;">
              <span>Total</span>
              <span>$${order.total.toFixed(2)}</span>
            </div>
          </div>

          <p>We will notify you when your items ship.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
