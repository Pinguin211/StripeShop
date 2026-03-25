"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCartArticlesAction } from "@/actions/cart/getCartArticles.action";
import type { article as Article } from "@/generated/prisma/client";

export async function useUserLayoutData(): Promise<{
  initialUserConnected: boolean;
  initialCartArticles: Article[];
}> {
  let isConnected = false;
  let cartArticles: Article[] = [];

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    isConnected = Boolean(session?.user);
    if (isConnected) {
      cartArticles = await getCartArticlesAction().catch(() => []);
    }
  } catch {
    isConnected = false;
    cartArticles = [];
  }

  return {
    initialUserConnected: isConnected,
    initialCartArticles: cartArticles,
  };
}

