"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { read as articleRead } from "@/lib/prisma/exe/article";
import { create, read as cartRead, update as cartUpdate } from "@/lib/prisma/exe/cart";

const AddArticleToCartSchema = z.object({
  articleId: z.string().min(1,"L'id de l'article est invalide"),
});

export type AddArticleToCartParams = z.infer<
  typeof AddArticleToCartSchema
>;

export async function addArticleToCartAction(
  params: AddArticleToCartParams | string,
) {
  const parsed = AddArticleToCartSchema.safeParse(
    typeof params === "string" ? { articleId: params } : params,
  );

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(messages);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error(
      "Vous devez etre connecte pour ajouter un article au panier",
    );
  }

  // Vérification d'existence côté DB
  const article = await articleRead.getById({ id: parsed.data.articleId });
  if (!article) {
    throw new Error("Article introuvable");
  }

  // Récupère le panier de l'user (ou null)
  const existingCart = await cartRead.getByUserId({ userId });

  // Ajoute l'article au panier existant, sinon crée le panier puis ajoute
  if (existingCart) {
    return cartUpdate.addArticle({
      cartId: existingCart.id,
      articleId: parsed.data.articleId,
    });
  }

  const newCart = await create.createCart({ userId });
  return cartUpdate.addArticle({
    cartId: newCart.id,
    articleId: parsed.data.articleId,
  });
}

