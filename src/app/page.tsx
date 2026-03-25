export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Fond & halos */}
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

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <p className="mb-4 text-eyebrow text-muted">MongoNext</p>
        <h1 className="text-heading-xl text-gradient">Hello World</h1>
        <p className="mt-6 max-w-md text-body text-secondary">
          Votre application Next.js est prête. Modifiez{" "}
          <code className="radius-code surface-code text-code-inline text-code-block">
            src/app/page.tsx
          </code>{" "}
          pour continuer à construire.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full accent-emerald-dot" />
          <span className="text-small text-muted">
            Serveur actif — bon développement
          </span>
        </div>
      </div>
    </main>
  );
}
