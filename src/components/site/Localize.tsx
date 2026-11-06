import { useEffect } from "react";
import { getLocale } from "@/lib/locale";
type Translate = (value: string) => string;

/**
 * Localize existing editorial JSX and structured content without changing its
 * source-of-truth data. Runs once after a render and only on changed DOM nodes.
 * Translations are local, deterministic, and require no remote service.
 */
function translateSubtree(root: Node, translate: Translate) {
  const translateElement = (element: Element) => {
    if (element.closest('script, style, noscript, svg, code, pre, [translate="no"]')) return;
    for (const attr of ["placeholder", "aria-label", "title", "alt"]) {
      const old = element.getAttribute(attr);
      if (!old) continue;
      const updated = translate(old.trim());
      if (updated !== old.trim()) element.setAttribute(attr, updated);
    }
  };

  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement;
    if (!parent || parent.closest('script, style, noscript, svg, code, pre, [translate="no"]'))
      return;
    const old = root.textContent ?? "";
    const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(old);
    if (!match || !match[2]) return;
    const translated = translate(match[2]);
    if (translated !== match[2]) root.textContent = match[1] + translated + match[3];
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) translateElement(root as Element);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (parent && !parent.closest('script, style, noscript, svg, code, pre, [translate="no"]')) {
        const before = node.textContent ?? "";
        const parts = /^(\s*)([\s\S]*?)(\s*)$/.exec(before);
        if (parts?.[2]) {
          const after = translate(parts[2]);
          if (after !== parts[2]) node.textContent = parts[1] + after + parts[3];
        }
      }
    } else {
      translateElement(node as Element);
    }
    node = walker.nextNode();
  }
}

export default function Localize() {
  useEffect(() => {
    const locale = getLocale();
    document.documentElement.lang = locale;
    document.documentElement.dataset["locale"] = locale;
    if (locale !== "el") return;
    const root = document.getElementById("app-root");
    if (!root) return;
    let cancelled = false;
    let observer: MutationObserver | null = null;
    // English visitors never download the Greek dictionary.
    void import("@/lib/translations")
      .then(({ translate }) => {
        if (cancelled) return;
        translateSubtree(root, translate);
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === "characterData") {
              translateSubtree(mutation.target, translate);
            } else {
              mutation.addedNodes.forEach((node) => translateSubtree(node, translate));
            }
          }
        });
        observer.observe(root, { childList: true, subtree: true, characterData: true });
      })
      .catch(() => {
        // A translation chunk failing must never blank the hotel site.
      });
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);
  return null;
}
