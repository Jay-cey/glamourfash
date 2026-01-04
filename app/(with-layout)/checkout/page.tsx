import { auth } from "@/auth";
import CheckoutForm from "./checkout-form";

export default async function CheckoutPage() {
  const session = await auth();
  return <CheckoutForm user={session?.user} />;
}