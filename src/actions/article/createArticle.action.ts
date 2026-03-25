"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { create as articleCreate } from "@/lib/prisma/exe/article";
import type { article as Article } from "@/generated/prisma/client";

const CreateArticleSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  imageurl: z.string().min(1).optional().nullable(),
  description: z.string().optional().nullable(),
  prix: z.coerce.number().positive("Le prix doit etre superieur a 0"),
});

export type CreateArticleParams = z.infer<typeof CreateArticleSchema>;

async function requireAdminUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Vous devez etre connecte pour cette action");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    throw new Error("Acces refuse : il faut etre admin");
  }

  return userId;
}

export async function createArticleAction(
  params: CreateArticleParams,
): Promise<Article> {
  await requireAdminUserId();

  const parsed = CreateArticleSchema.safeParse(params);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(messages);
  }

  return articleCreate.createArticle(parsed.data);
}

