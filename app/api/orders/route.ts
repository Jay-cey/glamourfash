import { NextResponse } from "next/server";
import {auth} from "@/auth";
import { PrismaClient } from "@prisma/client";
import { getUserOrders } from "@/app/actions/orders";

const db = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await getUserOrders(session.user.email)

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}