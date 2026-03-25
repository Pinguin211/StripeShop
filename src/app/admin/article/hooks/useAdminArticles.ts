import { useState } from "react";
import type { article as Article } from "@/generated/prisma/client";
import { updateArticleAction, type UpdateArticleParams } from "@/actions/article/updateArticle.action";

export function useAdminArticles(initialArticles: Article[]) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<UpdateArticleParams>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setEditDraft({
      id: article.id,
      name: article.name,
      imageurl: article.imageurl,
      description: article.description,
      prix: article.prix,
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
    setError(null);
  };

  const handleChange = (
    field: keyof UpdateArticleParams,
    value: string | number
  ) => {
    setEditDraft((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    if (!editDraft.id) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      // Validation & Save côté serveur
      const updatedArticle = await updateArticleAction(editDraft as UpdateArticleParams);
      
      // Mise à jour de la liste locale
      setArticles((prev) =>
        prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
      );
      
      // Sortie du mode édition
      cancelEdit();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue lors de la sauvegarde.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    articles,
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
