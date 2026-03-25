"use client";

import { useState } from "react";

export type UseCheckoutResult = {
  checkout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export function useCheckout(): UseCheckoutResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message ?? "Erreur lors du paiement.");
      }

      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
}
