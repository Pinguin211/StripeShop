"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";
import {
  DEFAULT_THEME,
  loadThemeFromLocalStorage,
  saveThemeToLocalStorage,
  type ThemeId,
} from "@/lib/theme/themeStorage";

export type UserStoreState = {
  userConnected: boolean;
  cartArticles: Article[];
  theme: ThemeId;
  setUserConnected: (connected: boolean) => void;
  setCartArticles: (articles: Article[]) => void;
  setTheme: (theme: ThemeId) => void;
};

const UserStoreContext = createContext<UserStoreState | null>(null);

export function UserStoreProvider({
  children,
  initialUserConnected,
  initialCartArticles,
}: {
  children: ReactNode;
  initialUserConnected: boolean;
  initialCartArticles: Article[];
}) {
  const [userConnected, setUserConnected] = useState(initialUserConnected);
  const [cartArticles, setCartArticles] = useState(initialCartArticles);
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  // Initialise le thème depuis localStorage (côté client uniquement)
  useEffect(() => {
    const stored = loadThemeFromLocalStorage();
    setThemeState(stored);
  }, []);

  // Persiste + applique le thème (pour permettre le CSS via data-theme)
  useEffect(() => {
    saveThemeToLocalStorage(theme);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const value = useMemo<UserStoreState>(
    () => ({
      userConnected,
      cartArticles,
      theme,
      setUserConnected,
      setCartArticles,
      setTheme: setThemeState,
    }),
    [userConnected, cartArticles, theme],
  );

  return (
    <UserStoreContext.Provider value={value}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const ctx = useContext(UserStoreContext);
  if (!ctx) {
    throw new Error("useUserStore doit etre utilise dans UserStoreProvider");
  }
  return ctx;
}

