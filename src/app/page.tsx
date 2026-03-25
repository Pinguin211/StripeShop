"use client";

import ArticlesHomeUI from "@/components/article/articles-home-ui";
import { useArticlesHome } from "@/app/hooks/useArticlesHome";

export default function Home() {
  const {
    articles,
    error,
    isPending,
    canLoadMore,
    loadMore,
    addArticleToCart,
    userConnected,
    addingById,
    inCartIdSet,
  } =
    useArticlesHome();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Fond & halos */}
      <div
        className="pointer-events-none absolute inset-0 bg-halo-top"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full accent-violet-halo blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full accent-cyan-halo blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        aria-hidden
      />

      <ArticlesHomeUI
        articles={articles}
        error={error}
        isPending={isPending}
        canLoadMore={canLoadMore}
        onLoadMore={loadMore}
        onAddArticle={addArticleToCart}
        userConnected={userConnected}
        addingById={addingById}
        inCartIdSet={inCartIdSet}
      />
    </main>
  );
}
