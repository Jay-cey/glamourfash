// lib/actions/unlink.ts
"use server"

import { prisma } from "@/lib/prisma"

export async function unlinkAccount(userId: string, provider: string) {
  await prisma.account.deleteMany({
    where: { userId, provider },
  })
}
