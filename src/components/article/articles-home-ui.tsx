"use client";

import type { article as Article } from "@/generated/prisma/client";
import { ArticleCard } from "./article-card";

export type ArticlesHomeUIProps = {
  articles: Article[];
  error: string | null;
  isPending: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
  onAddArticle: (article: Article) => void;
  userConnected: boolean;
  addingById: Record<string, boolean>;
  inCartIdSet: Set<string>;
};

export default function ArticlesHomeUI({
  articles,
  error,
  isPending,
  canLoadMore,
  onLoadMore,
  onAddArticle,
  userConnected,
  addingById,
  inCartIdSet,
}: ArticlesHomeUIProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl">
      <div className="flex flex-col gap-8">
        <header className="text-center">
          <p className="mb-4 text-eyebrow text-muted">StripeShop</p>
          <h1 className="text-heading-xl text-gradient">Articles</h1>
          <p className="mt-2 text-small text-secondary">
            Explore et ajoute tes articles.
          </p>
        </header>

        {error ? (
          <p className="radius-feedback feedback-error px-3 py-2 text-small">
            {error}
          </p>
        ) : null}

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            (() => {
              const isInCart = inCartIdSet.has(article.id);
              return (
            <ArticleCard
              key={article.id}
              article={article}
              onAddArticle={() => onAddArticle(article)}
              addButtonLabel="Ajouter un article"
              isInCart={isInCart}
              isAddDisabled={!userConnected || isInCart}
              isAddLoading={Boolean(addingById[article.id])}
            />
              );
            })()
          ))}
        </section>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isPending || !canLoadMore}
            className="radius-input btn-primary btn-primary-hover btn-submit-spacing text-small font-medium transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <span className="mr-2 spinner" />
                Chargement...
              </>
            ) : canLoadMore ? (
              "Charger d'autre articles"
            ) : (
              "Plus d'articles"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

