import { prisma } from "@/lib/prisma/prisma";
import type { cart as Cart } from "@/generated/prisma/client";

export type CreateCartParams = {
  userId: string;
};

export const create = {
  async createCart({ userId }: CreateCartParams): Promise<Cart> {
    return prisma.cart.create({
      data: {
        userId,
      },
    });
  },
};

