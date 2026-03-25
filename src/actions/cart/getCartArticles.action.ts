"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { read as cartRead } from "@/lib/prisma/exe/cart";
import type { article as Article } from "@/generated/prisma/client";

export async function getCartArticlesAction(): Promise<Article[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Vous devez etre connecte pour recuperer le panier");
  }

  return cartRead.getArticlesByUserId({ userId });
}

