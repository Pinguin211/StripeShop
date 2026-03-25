import { prisma } from "@/lib/prisma/prisma";
import type { article as Article } from "@/generated/prisma/client";

export type CreateArticleParams = {
  name: string;
  imageurl?: string | null;
  description?: string | null;
  prix: number;
};

export const create = {
  async createArticle({
    name,
    imageurl = null,
    description = null,
    prix,
  }: CreateArticleParams): Promise<Article> {
    return prisma.article.create({
      data: {
        name,
        imageurl,
        description,
        prix,
      },
    });
  },
};

