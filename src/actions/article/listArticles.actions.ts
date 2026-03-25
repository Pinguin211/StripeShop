"use server";

import { read } from "@/lib/prisma/exe/article";
import type { article as Article } from "@/generated/prisma/client";

export type ListArticlesParams = {
  limit?: number;
  offset?: number;
};

export async function listArticlesActions(
  params: ListArticlesParams = {},
): Promise<Article[]> {
  return read.getMany(params);
}

