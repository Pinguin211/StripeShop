export type ThemeId = "hacker" | "future";

const THEME_STORAGE_KEY = "stripeshop.theme";
export const DEFAULT_THEME: ThemeId = "hacker";

function isThemeId(value: string): value is ThemeId {
  return value === "hacker" || value === "future";
}

export function loadThemeFromLocalStorage(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    if (isThemeId(raw)) return raw;
    return DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveThemeToLocalStorage(theme: ThemeId): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // no-op: si localStorage est bloqué, on ne casse pas l'app
  }
}

