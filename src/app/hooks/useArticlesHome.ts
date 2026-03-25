"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { article as Article } from "@/generated/prisma/client";
import { listArticlesActions } from "@/actions/article/listArticles.actions";
import { addArticleToCartAction } from "@/actions/cart/addArticleToCart.action";
import { useUserStore } from "@/store/userStore";
import { getCartArticlesAction } from "@/actions/cart/getCartArticles.action";

const DEFAULT_LIMIT = 6;

export type UseArticlesHomeResult = {
  articles: Article[];
  error: string | null;
  isPending: boolean;
  canLoadMore: boolean;
  loadMore: () => void;
  addArticleToCart: (article: Article) => Promise<void>;
  userConnected: boolean;
  addingById: Record<string, boolean>;
  inCartIdSet: Set<string>;
};

export function useArticlesHome(): UseArticlesHomeResult {
  const { userConnected, setCartArticles, cartArticles } = useUserStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [addingById, setAddingById] = useState<Record<string, boolean>>(
    {},
  );

  const nextOffset = useMemo(() => offset + DEFAULT_LIMIT, [offset]);
  const inCartIdSet = useMemo(
    () => new Set(cartArticles.map((a) => a.id)),
    [cartArticles],
  );

  useEffect(() => {
    let cancelled = false;

    startTransition(async () => {
      setError(null);
      try {
        const initial = await listArticlesActions({ limit: DEFAULT_LIMIT, offset: 0 });
        if (cancelled) return;

        setArticles(initial);
        setOffset(DEFAULT_LIMIT);
        setCanLoadMore(initial.length === DEFAULT_LIMIT);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Erreur lors du chargement.");
        setCanLoadMore(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [startTransition]);

  const loadMore = () => {
    if (!canLoadMore) return;

    startTransition(async () => {
      setError(null);
      try {
        const more = await listArticlesActions({
          limit: DEFAULT_LIMIT,
          offset: nextOffset,
        });

        setArticles((prev) => {
          const seen = new Set(prev.map((a) => a.id));
          const merged = [...prev];
          for (const a of more) {
            if (seen.has(a.id)) continue;
            seen.add(a.id);
            merged.push(a);
          }
          return merged;
        });

        setOffset(nextOffset);
        setCanLoadMore(more.length === DEFAULT_LIMIT);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur lors du chargement.");
        setCanLoadMore(false);
      }
    });
  };

  const addArticleToCart = async (article: Article) => {
    if (!userConnected) return;
    if (addingById[article.id]) return;

    setAddingById((prev) => ({ ...prev, [article.id]: true }));
    setError(null);
    try {
      await addArticleToCartAction(article.id);

      // Sync de la liste d'articles du panier dans le store (header -> PixelCartIcon)
      const cartArticles = await getCartArticlesAction().catch(() => []);
      setCartArticles(cartArticles);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'ajout au panier.");
    } finally {
      setAddingById((prev) => {
        const next = { ...prev };
        delete next[article.id];
        return next;
      });
    }
  };

  return {
    articles,
    error,
    isPending,
    canLoadMore,
    loadMore,
    addArticleToCart,
    userConnected,
    addingById,
    inCartIdSet,
  };
}

