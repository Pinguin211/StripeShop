"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCartArticlesAction } from "@/actions/cart/getCartArticles.action";
import type { article as Article } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma/prisma";

export async function useUserLayoutData(): Promise<{
  initialUserConnected: boolean;
  initialCartArticles: Article[];
  initialUserIsAdmin: boolean;
}> {
  let isConnected = false;
  let cartArticles: Article[] = [];
  let userIsAdmin = false;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    isConnected = Boolean(session?.user);
    if (isConnected) {
      const userId = session?.user?.id;
      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
        userIsAdmin = user?.role === "ADMIN";
      }
      cartArticles = await getCartArticlesAction().catch(() => []);
    }
  } catch {
    isConnected = false;
    cartArticles = [];
    userIsAdmin = false;
  }

  return {
    initialUserConnected: isConnected,
    initialCartArticles: cartArticles,
    initialUserIsAdmin: userIsAdmin,
  };
}

