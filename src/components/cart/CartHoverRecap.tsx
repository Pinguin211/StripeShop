"use client";

import { useMemo } from "react";
import type { article as Article } from "@/generated/prisma/client";
import { calculatePriceForArticles } from "@/lib/price/calculatePrice";
import { PixelCartIcon } from "@/components/cart/PixelCartIcon";

export type CartHoverRecapProps = {
  articles: Article[];
  onCheckout: () => void;
  checkoutLabel?: string;
  isCheckoutDisabled?: boolean;
};

export default function CartHoverRecap({
  articles,
  onCheckout,
  checkoutLabel = "Payer",
  isCheckoutDisabled,
}: CartHoverRecapProps) {
  const articleById = useMemo(() => {
    const m = new Map<string, Article>();
    for (const a of articles) m.set(a.id, a);
    return m;
  }, [articles]);

  const price = useMemo(() => calculatePriceForArticles(articles), [articles]);

  const canCheckout = articles.length > 0;
  const disabled = isCheckoutDisabled ?? !canCheckout;

  return (
    <div className="relative inline-flex items-center group">
      <PixelCartIcon count={articles.length} className="w-10 h-10" />

      {/* Popover au survol */}
      <div
        className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-[320px] opacity-0 translate-y-2 transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
      >
        <div className="radius-card border-subtle glass-card card-padding shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-small text-secondary">RECAP PANIER</p>
              <p className="mt-1 text-small text-primary">
                {articles.length} article(s)
              </p>
            </div>
            <div className="text-small text-muted">{"<3"}</div>
          </div>

          <div
            className="mt-4 flex max-h-44 flex-col gap-2 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {price.articleTotals.length === 0 ? (
              <p className="text-small text-secondary">Panier vide</p>
            ) : (
              price.articleTotals.map((line) => {
                const a = articleById.get(line.articleId);
                const title = a?.name ?? line.articleId;

                return (
                  <div key={line.articleId} className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-small font-bold text-primary">
                        {title}
                      </p>
                      <p className="text-small text-muted">
                        {line.unitPrice}€
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 border-subtle border-t pt-3">
            <div className="flex justify-between text-small text-secondary">
              <span>Sous-total</span>
              <span>{price.totals.subtotal}€</span>
            </div>
            <div className="mt-2 flex justify-between text-small text-secondary">
              <span>Frais de port</span>
              <span>{price.portsFee}€</span>
            </div>
            <div className="mt-3 flex justify-between text-small font-bold text-primary">
              <span>Total</span>
              <span>{price.totals.total}€</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            disabled={disabled}
            className="mt-4 w-full inline-flex items-center justify-center radius-input btn-primary btn-primary-hover btn-submit-spacing text-small font-medium transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {checkoutLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

