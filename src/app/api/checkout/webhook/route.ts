import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { del } from "@/lib/prisma/exe/cart";

/**
 * POST /api/checkout/webhook
 *
 * Réception des événements Stripe.
 * À chaque paiement confirmé (`checkout.session.completed`),
 * le panier de l'utilisateur est supprimé automatiquement.
 *
 * Pré-requis :
 *  - La variable d'environnement STRIPE_WEBHOOK_SECRET doit être définie.
 *  - Le chemin `/api/checkout/webhook` doit être enregistré dans le dashboard Stripe.
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET manquant.");
    return NextResponse.json(
      { message: "Configuration serveur incomplète." },
      { status: 500 }
    );
  }

  // Lecture du corps brut pour vérification de la signature Stripe
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { message: "Signature Stripe absente." },
      { status: 400 }
    );
  }

  let event: import("stripe").Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature invalide :", err);
    return NextResponse.json(
      { message: "Signature Stripe invalide." },
      { status: 400 }
    );
  }

  // ── Traitement de l'événement ────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;

    const userId = session.metadata?.userId;

    if (!userId) {
      console.warn("[webhook] checkout.session.completed sans userId dans les métadonnées.");
      return NextResponse.json({ received: true });
    }

    try {
      await del.deleteByUserId({ userId });
      console.log(`[webhook] Panier supprimé pour l'utilisateur ${userId}.`);
    } catch (err) {
      console.error("[webhook] Erreur lors de la suppression du panier :", err);
      // On renvoie 200 pour éviter que Stripe ne rejoue l'événement
      return NextResponse.json({ received: true });
    }
  }

  return NextResponse.json({ received: true });
}
