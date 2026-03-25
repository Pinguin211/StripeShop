import { prisma } from "@/lib/prisma/prisma";
import type { article as Article } from "@/generated/prisma/client";

export type UpdateArticleParams = {
  id: string;
  name?: string;
  imageurl?: string | null;
  description?: string | null;
  prix?: number;
};

export const update = {
  async updateArticle({
    id,
    name,
    imageurl,
    description,
    prix,
  }: UpdateArticleParams): Promise<Article> {
    const data: Record<string, unknown> = {};

    if (name !== undefined) data.name = name;
    if (imageurl !== undefined) data.imageurl = imageurl;
    if (description !== undefined) data.description = description;
    if (prix !== undefined) data.prix = prix;

    return prisma.article.update({
      where: { id },
      data,
    });
  },
};

