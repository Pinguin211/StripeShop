import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { read } from "@/lib/prisma/exe/cart/cart.read";
import { calculatePriceForArticles } from "@/lib/price/calculatePrice";

/**
 * POST /api/checkout
 *
 * Crée une session Stripe Checkout pour le panier de l'utilisateur connecté.
 *
 * Réponses :
 *  200 { url: string }  — URL de redirection vers Stripe Checkout
 *  401                  — Utilisateur non authentifié
 *  400                  — Panier vide
 *  500                  — Erreur interne
 */
export async function POST(req: NextRequest) {
  // ── 1. Authentification ──────────────────────────────────────
  let userId: string;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Vous devez être connecté pour passer une commande." },
        { status: 401 }
      );
    }

    userId = session.user.id;
  } catch {
    return NextResponse.json(
      { message: "Impossible de vérifier la session." },
      { status: 401 }
    );
  }

  // ── 2. Récupération du panier ────────────────────────────────
  let articles: Awaited<ReturnType<typeof read.getArticlesByUserId>>;

  try {
    articles = await read.getArticlesByUserId({ userId });
  } catch {
    return NextResponse.json(
      { message: "Impossible de récupérer le panier." },
      { status: 500 }
    );
  }

  if (articles.length === 0) {
    return NextResponse.json(
      { message: "Votre panier est vide." },
      { status: 400 }
    );
  }

  // ── 3. Calcul des prix ───────────────────────────────────────
  const { articleTotals, portsFee } = calculatePriceForArticles(articles);

  // ── 4. Construction des line_items Stripe ────────────────────
  //
  // On regroupe par articleId (calculatePrice le fait déjà), puis on
  // crée un line_item par ligne.  Les prix sont en centimes (×100).
  //
  // On crée aussi un line_item séparé pour les frais de port si > 0.
  //

  // Index articles par id pour retrouver le nom
  const articleMap = new Map(articles.map((a) => [a.id, a]));

  const lineItems: import("stripe").Stripe.Checkout.SessionCreateParams.LineItem[] =
    articleTotals.map((line) => {
      const article = articleMap.get(line.articleId);
      const name = article?.name ?? `Article ${line.articleId}`;
      const description = article?.description ?? undefined;

      return {
        quantity: line.qty,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(line.unitPrice * 100), // centimes
          product_data: {
            name,
            ...(description ? { description } : {}),
          },
        },
      };
    });

  // Frais de port en line_item séparé
  if (portsFee > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(portsFee * 100),
        product_data: {
          name: "Frais de port",
          description: "Livraison standard",
        },
      },
    });
  }

  // ── 5. Création de la session Stripe Checkout ────────────────
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  let session: import("stripe").Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Métadonnée utile pour retrouver l'utilisateur dans le webhook
      metadata: {
        userId,
      },
      // Redirection après paiement
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      // Pré-remplissage si l'email est disponible (optionnel)
      // customer_email: session.user.email,
    });
  } catch (err) {
    console.error("[stripe] checkout.sessions.create error:", err);
    return NextResponse.json(
      { message: "Erreur lors de la création de la session de paiement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url }, { status: 200 });
}
