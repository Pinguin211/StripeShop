import { useCallback, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";
import {
  updateArticleAction,
  type UpdateArticleParams,
} from "@/actions/article/updateArticle.action";

export function useUpdateArticle(onUpdated: (article: Article) => void) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<UpdateArticleParams>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = useCallback((article: Article) => {
    setEditingId(article.id);
    setEditDraft({
      id: article.id,
      name: article.name,
      imageurl: article.imageurl,
      description: article.description,
      prix: article.prix,
    });
    setError(null);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditDraft({});
    setError(null);
  }, []);

  const handleChange = useCallback(
    (field: keyof UpdateArticleParams, value: string | number) => {
      setEditDraft((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const saveEdit = useCallback(async () => {
    if (!editDraft.id) return;

    setIsSaving(true);
    setError(null);

    try {
      const updatedArticle = await updateArticleAction(
        editDraft as UpdateArticleParams,
      );
      onUpdated(updatedArticle);
      setEditingId(null);
      setEditDraft({});
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue lors de la sauvegarde.");
      }
    } finally {
      setIsSaving(false);
    }
  }, [editDraft, onUpdated]);

  return {
    editingId,
    editDraft,
    isSaving,
    error,
    startEdit,
    cancelEdit,
    handleChange,
    saveEdit,
  };
}
