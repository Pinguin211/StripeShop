"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { article as Article } from "@/generated/prisma/client";
import { listArticles } from "@/actions/article/listArticles";

const DEFAULT_LIMIT = 6;

export type UseArticlesHomeResult = {
  articles: Article[];
  error: string | null;
  isPending: boolean;
  canLoadMore: boolean;
  loadMore: () => void;
};

export function useArticlesHome(): UseArticlesHomeResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const nextOffset = useMemo(() => offset + DEFAULT_LIMIT, [offset]);

  useEffect(() => {
    let cancelled = false;

    startTransition(async () => {
      setError(null);
      try {
        const initial = await listArticles({ limit: DEFAULT_LIMIT, offset: 0 });
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
        const more = await listArticles({
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

  return {
    articles,
    error,
    isPending,
    canLoadMore,
    loadMore,
  };
}

