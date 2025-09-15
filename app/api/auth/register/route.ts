import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fname, lname, email, password, confirmPassword } = body;
    console.log("Incoming body:", body); 

    if (!fname || !lname || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      console.log("Password mismatch:", password, confirmPassword); 
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: `${fname} ${lname}`,
        email,
        hashedPassword, // <- you need this in your schema
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
// export const runtime = "edge"; // Ensure the route runs on the edge runtime