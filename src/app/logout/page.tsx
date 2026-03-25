"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LogoutPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const signOut = async () => {
      try {
        await authClient.signOut();
        window.location.href = "/login";
      } catch {
        setError("Impossible de se deconnecter pour le moment.");
      }
    };

    void signOut();
  }, []);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      {error ? (
        <>
          <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Retour a l'accueil
          </Link>
        </>
      ) : (
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Deconnexion en cours...
        </p>
      )}
    </main>
  );
}
