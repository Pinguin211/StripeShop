import { prisma } from "@/lib/prisma/prisma";
import type { cart as Cart } from "@/generated/prisma/client";

export type DeleteCartByUserIdParams = {
  userId: string;
};

export const del = {
  /**
   * Supprime le panier de l'utilisateur ainsi que toutes ses relations
   * avec les articles (la relation many-to-many est déconnectée via Prisma).
   */
  async deleteByUserId({ userId }: DeleteCartByUserIdParams): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({ where: { userId } });

    if (!cart) return null;

    return prisma.cart.delete({
      where: { id: cart.id },
    });
  },
};
