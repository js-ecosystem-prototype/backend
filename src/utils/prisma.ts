//src/utils/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaGlobal = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaGlobal;
}

export default prismaGlobal;
