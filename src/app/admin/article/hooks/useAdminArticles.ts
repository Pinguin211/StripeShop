import { useCallback, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";

export function useAdminArticles(initialArticles: Article[]) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const addArticle = useCallback((article: Article) => {
    setArticles((prev) => [article, ...prev]);
  }, []);

  const removeArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const mergeArticle = useCallback((article: Article) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? article : a)),
    );
  }, []);

  return {
    articles,
    addArticle,
    removeArticle,
    mergeArticle,
  };
}
