"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import type { article as Article } from "@/generated/prisma/client";

export type UserStoreState = {
  userConnected: boolean;
  cartArticles: Article[];
  setUserConnected: (connected: boolean) => void;
  setCartArticles: (articles: Article[]) => void;
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

  const value = useMemo<UserStoreState>(
    () => ({
      userConnected,
      cartArticles,
      setUserConnected,
      setCartArticles,
    }),
    [userConnected, cartArticles],
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

