import type { FormEvent } from "react";

type RegisterFormProps = {
  loading: boolean;
  error: string | null;
  success: string | null;
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function RegisterForm({
  loading,
  error,
  success,
  onSubmit,
}: RegisterFormProps) {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(new FormData(event.currentTarget));
  };

  return (
    <form method="post" className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
      <label className="block text-left text-label text-small">
        Nom
        <input
          name="name"
          type="text"
          className="mt-1 w-full radius-input border-input surface-input input-padding outline-none ring-violet-300 transition focus:ring-2"
          placeholder="Ton nom"
          autoComplete="name"
        />
      </label>

      <label className="block text-left text-label text-small">
        Email
        <input
          name="email"
          type="email"
          className="mt-1 w-full radius-input border-input surface-input input-padding outline-none ring-violet-300 transition focus:ring-2"
          placeholder="toi@email.com"
          autoComplete="email"
        />
      </label>

      <label className="block text-left text-label text-small">
        Mot de passe
        <input
          name="password"
          type="password"
          className="mt-1 w-full radius-input border-input surface-input input-padding outline-none ring-violet-300 transition focus:ring-2"
          placeholder="Minimum 8 caracteres"
          autoComplete="new-password"
        />
      </label>

      {error ? (
        <p className="radius-feedback feedback-error px-3 py-2 text-small">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="radius-feedback feedback-success px-3 py-2 text-small">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex w-full items-center justify-center radius-input btn-primary btn-primary-hover btn-submit-spacing text-small font-medium transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="mr-2 spinner" />
            Inscription en cours...
          </>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
  );
}
