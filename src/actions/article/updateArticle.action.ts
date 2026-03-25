"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { update as articleUpdate } from "@/lib/prisma/exe/article";
import type { article as Article } from "@/generated/prisma/client";

const UpdateArticleSchema = z.object({
  id: z.string().min(1, "id article obligatoire"),
  name: z.string().min(1).optional(),
  imageurl: z.string().min(1).optional().nullable(),
  description: z.string().optional().nullable(),
  prix: z.coerce.number().positive().optional(),
});

export type UpdateArticleParams = z.infer<typeof UpdateArticleSchema>;

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

export async function updateArticleAction(
  params: UpdateArticleParams,
): Promise<Article> {
  await requireAdminUserId();

  const parsed = UpdateArticleSchema.safeParse(params);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(messages);
  }

  return articleUpdate.updateArticle(parsed.data);
}

