import type { article as Article } from "@/generated/prisma/client";

export type ArticleTotalsLine = {
  articleId: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type Totals = {
  subtotal: number;
  total: number;
};

export type PriceResult = {
  totals: Totals;
  articleTotals: ArticleTotalsLine[];
  portsFee: number;
};

const PORT_FEE_PER_3_ARTICLES = 10.99;

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculatePriceForArticles(articles: Article[]): PriceResult {
  const safeArticles = Array.isArray(articles) ? articles : [];

  const byId = new Map<
    string,
    { qty: number; unitPrice: number; lineTotal: number }
  >();

  for (const a of safeArticles) {
    const id = a.id;
    const unit = Number(a.prix) || 0;
    const prev = byId.get(id);
    if (!prev) {
      byId.set(id, { qty: 1, unitPrice: unit, lineTotal: unit });
    } else {
      const nextQty = prev.qty + 1;
      byId.set(id, {
        qty: nextQty,
        unitPrice: prev.unitPrice,
        lineTotal: roundMoney(prev.unitPrice * nextQty),
      });
    }
  }

  const articleTotals: ArticleTotalsLine[] = Array.from(byId.entries())
    .map(([articleId, v]) => ({
      articleId,
      qty: v.qty,
      unitPrice: v.unitPrice,
      lineTotal: v.lineTotal,
    }))
    .sort((a, b) => a.articleId.localeCompare(b.articleId));

  const subtotal = roundMoney(
    articleTotals.reduce((sum, l) => sum + l.lineTotal, 0),
  );

  const count = safeArticles.length;
  const portsFee =
    count === 0 ? 0 : roundMoney(PORT_FEE_PER_3_ARTICLES * Math.ceil(count / 3));

  return {
    totals: {
      subtotal,
      total: roundMoney(subtotal + portsFee),
    },
    articleTotals,
    portsFee,
  };
}

