"use client";

import { useMemo } from "react";
import { useUserStore } from "@/store/userStore";
import type { ThemeId } from "@/lib/theme/themeStorage";

const THEMES: { id: ThemeId; label: string }[] = [
  { id: "hacker", label: "Hacker" },
  { id: "future", label: "Future" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useUserStore();

  const label = useMemo(() => {
    return THEMES.find((t) => t.id === theme)?.label ?? "Hacker";
  }, [theme]);

  const nextTheme: ThemeId = theme === "hacker" ? "future" : "hacker";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="btn-ghost btn-ghost-hover btn-nav-spacing radius-btn transition-colors"
      aria-label={`Changer le theme (actuel: ${label})`}
      aria-pressed={theme === "future"}
      title={`Theme: ${label}`}
    >
      Theme: {label}
    </button>
  );
}

