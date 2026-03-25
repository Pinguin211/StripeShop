import { prisma } from "@/lib/prisma/prisma";
import type { article as Article } from "@/generated/prisma/client";

type GetManyArgs = {
  limit?: number;
  offset?: number;
};

export const read = {
  async getMany({ limit, offset }: GetManyArgs = {}): Promise<Article[]> {
    return prisma.article.findMany({
      take: limit ?? 20,
      skip: offset ?? 0,
      // Ordre stable pour que la pagination (skip/take) ne duplique jamais les articles
      // quand plusieurs articles ont la même date `createdAt`.
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    });
  },

  async getById({ id }: { id: string }): Promise<Article | null> {
    return prisma.article.findUnique({
      where: { id },
    });
  },
};

