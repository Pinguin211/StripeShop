"use client";

import { useState } from "react";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(null);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!name || !email || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message ?? "Inscription impossible pour le moment.");
      }

      setSuccess("Compte cree avec succes. Redirection...");
      window.setTimeout(() => {
        window.location.href = "/";
      }, 900);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-halo-top" aria-hidden />
      <section className="relative z-10 w-full max-w-md radius-card border-subtle glass-card card-padding shadow-card">
        <p className="text-eyebrow text-muted">StripeShop</p>
        <h1 className="mt-3 text-heading-lg text-primary">Creer un compte</h1>
        <p className="mt-2 text-small text-secondary">Inscris-toi pour commencer.</p>

        <RegisterForm
          loading={loading}
          error={error}
          success={success}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}
