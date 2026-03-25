import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-halo-top" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full accent-violet-halo blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full accent-cyan-halo blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <p className="mb-4 text-eyebrow text-muted">MongoNext</p>
        <p className="text-heading-404">404</p>
        <h1 className="mt-4 text-heading-lg text-gradient sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-body text-secondary">
          Cette adresse n'existe pas ou a été déplacée. Vérifiez l'URL ou
          revenez à l'accueil.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center radius-btn btn-primary btn-primary-hover btn-cta-spacing text-small font-medium transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
