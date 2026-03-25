"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { del as articleDel } from "@/lib/prisma/exe/article";
import type { article as Article } from "@/generated/prisma/client";

const DeleteArticleSchema = z.object({
  id: z.string().min(1, "id article obligatoire"),
});

export type DeleteArticleParams = z.infer<typeof DeleteArticleSchema>;

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

export async function deleteArticleAction(
  params: DeleteArticleParams,
): Promise<Article> {
  await requireAdminUserId();

  const parsed = DeleteArticleSchema.safeParse(params);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(messages);
  }

  return articleDel.deleteArticle(parsed.data);
}

