`use client`;

import type { article as Article } from "@/generated/prisma/client";

export type ArticleCardProps = {
  article: Article;
  onAddArticle: () => void;
  addButtonLabel?: string;
  isAddDisabled?: boolean;
};

export function ArticleCard({
  article,
  onAddArticle,
  addButtonLabel = "Ajouter un article",
  isAddDisabled = false,
}: ArticleCardProps) {
  return (
    <div className="radius-card border-subtle glass-card card-padding shadow-card">
      <div className="flex min-h-[360px] flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-small text-secondary">ARTICLE</p>
            {/* Hauteur fixe pour éviter les décalages selon la longueur */}
            <h3 className="h-10 overflow-hidden text-small font-bold break-words text-primary">
              {article.name}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-small text-secondary">PRIX</p>
            <p className="text-small text-primary">
              {article.prix}€
            </p>
          </div>
        </div>

        {/* Zone image (réservée même si aucune image) */}
        <div className="w-full aspect-[4/3] border-input surface-input radius-input overflow-hidden">
          {article.imageurl ? (
            <img
              src={article.imageurl}
              alt={article.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        {/* Zone description scrollable, scrollbar masquée */}
        <div
          className="h-20 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {article.description ? (
            <p className="text-small text-body leading-relaxed">
              {article.description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onAddArticle}
          disabled={isAddDisabled}
          className="w-full mt-auto inline-flex items-center justify-center radius-input btn-primary btn-primary-hover btn-submit-spacing text-small font-medium transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {addButtonLabel}
        </button>
      </div>
    </div>
  );
}

export default ArticleCard;

