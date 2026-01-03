import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/app/actions/orders";
import OrdersView from "./orders-view";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const orders = await getUserOrders(session.user.email);

  return <OrdersView orders={orders} />;
}