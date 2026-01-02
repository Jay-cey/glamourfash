"use server";

import { Resend } from "resend";
import { z } from "zod";
import { EmailTemplate } from "@/components/email-template";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function sendEmail(data: z.infer<typeof contactSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Server configuration error: Missing API Key" };
  }

  const resend = new Resend(apiKey);

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid input data" };
  }

  try {
    const { name, email, subject, message } = result.data;
    
    const { error } = await resend.emails.send({
      from: "GlamourFash <onboarding@resend.dev>", // Update this with your verified domain
      to: ["jeremiearch@gmail.com"], // Update this with your receiving email address
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
