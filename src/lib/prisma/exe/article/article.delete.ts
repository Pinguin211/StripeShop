import { prisma } from "@/lib/prisma/prisma";
import type { article as Article } from "@/generated/prisma/client";

export type DeleteArticleParams = {
  id: string;
};

export const del = {
  async deleteArticle({ id }: DeleteArticleParams): Promise<Article> {
    return prisma.article.delete({
      where: { id },
    });
  },
};

