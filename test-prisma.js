import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.account.findMany();
    console.log('Connection OK', users.length);
  } catch (e) {
    console.error('Connection failed', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
