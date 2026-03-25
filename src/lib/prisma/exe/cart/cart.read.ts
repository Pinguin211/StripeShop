import { prisma } from "@/lib/prisma/prisma";
import type { cart as Cart } from "@/generated/prisma/client";
import type { article as Article } from "@/generated/prisma/client";

export type GetCartByUserIdParams = {
  userId: string;
};

export const read = {
  async getByUserId({
    userId,
  }: GetCartByUserIdParams): Promise<Cart | null> {
    // `userId` est `@unique`, donc au plus un seul panier sera renvoyé.
    return prisma.cart.findFirst({
      where: { userId },
    });
  },

  async getArticlesByUserId({
    userId,
  }: GetCartByUserIdParams): Promise<Article[]> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { articles: true },
    });

    return cart?.articles ?? [];
  },
};

