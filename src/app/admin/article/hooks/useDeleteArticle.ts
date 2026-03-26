import { useCallback, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";
import { deleteArticleAction } from "@/actions/article/deleteArticle.action";

export function useDeleteArticle(onDeleted: (id: string) => void) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestDelete = useCallback(
    async (article: Article) => {
      const label = article.name?.trim() || "cet article";
      const confirmed = window.confirm(
        `Supprimer ${label} ? Cette action est definitive.`,
      );
      if (!confirmed) {
        return;
      }

      setDeletingId(article.id);
      setError(null);

      try {
        await deleteArticleAction({ id: article.id });
        onDeleted(article.id);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erreur inconnue lors de la suppression.");
        }
      } finally {
        setDeletingId(null);
      }
    },
    [onDeleted],
  );

  return {
    deletingId,
    error,
    requestDelete,
  };
}
