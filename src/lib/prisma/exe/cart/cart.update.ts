import { prisma } from "@/lib/prisma/prisma";
import type { cart as Cart } from "@/generated/prisma/client";

export type AddArticleToCartParams = {
  cartId: string;
  articleId: string;
};

export const update = {
  async addArticle({
    cartId,
    articleId,
  }: AddArticleToCartParams): Promise<Cart> {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        articles: {
          connect: {
            id: articleId,
          },
        },
      },
    });
  },
};

