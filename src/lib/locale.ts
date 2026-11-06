export type Locale = "en" | "el";
const KEY = "tsikari:locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const explicit = new URLSearchParams(window.location.search).get("lang");
  if (explicit === "el" || explicit === "en") return explicit;
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "el" || stored === "en") return stored;
  } catch {
    /* Storage may be blocked. */
  }
  return navigator.language.toLowerCase().startsWith("el") ? "el" : "en";
}

export function localeUrl(locale: Locale): string {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", locale);
  return url.pathname + url.search + url.hash;
}

export function chooseLocale(locale: Locale) {
  try {
    window.localStorage.setItem(KEY, locale);
  } catch {
    /* Continue without persistence. */
  }
  window.location.assign(localeUrl(locale));
}
