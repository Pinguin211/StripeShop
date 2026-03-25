"use client";

import { PixelCartIcon } from "@/components/cart/PixelCartIcon";
import { useUserStore } from "@/store/userStore";

export default function Header() {
  const { userConnected, cartArticles } = useUserStore();
  const cartCount = cartArticles.length;

  return (
    <header className="sticky top-0 z-50 border-subtle glass-header">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="text-small font-semibold tracking-tight text-primary">
          StripeShop
        </a>
        <div className="flex items-center gap-2 text-small">
          {userConnected ? (
            <PixelCartIcon
              count={cartCount}
              className="w-8 h-8"
              aria-label="Articles dans le panier"
            />
          ) : null}
          {!userConnected ? (
            <a
              href="/register"
              className="btn-ghost btn-ghost-hover btn-nav-spacing radius-btn transition-colors"
            >
              Register
            </a>
          ) : null}
          {userConnected ? (
            <a
              href="/logout"
              className="btn-primary btn-primary-hover btn-nav-spacing radius-btn transition-colors"
            >
              Se deconnecter
            </a>
          ) : (
            <a
              href="/login"
              className="btn-primary btn-primary-hover btn-nav-spacing radius-btn transition-colors"
            >
              Se connecter
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
