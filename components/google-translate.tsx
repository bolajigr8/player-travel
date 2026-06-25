"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/* ── Window type augmentation ────────────────────────────────── */
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          opts: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
          },
          id: string,
        ) => void;
      };
    };
  }
}

/* ── Supported languages ─────────────────────────────────────── */
export const LANGS = [
  { code: "en",    label: "English",    flag: "🇬🇧" },
  { code: "es",    label: "Español",    flag: "🇪🇸" },
  { code: "fr",    label: "Français",   flag: "🇫🇷" },
  { code: "de",    label: "Deutsch",    flag: "🇩🇪" },
  { code: "it",    label: "Italiano",   flag: "🇮🇹" },
  { code: "pt",    label: "Português",  flag: "🇵🇹" },
  { code: "ar",    label: "العربية",   flag: "🇸🇦" },
  { code: "zh-CN", label: "中文",       flag: "🇨🇳" },
  { code: "ru",    label: "Русский",   flag: "🇷🇺" },
  { code: "ja",    label: "日本語",    flag: "🇯🇵" },
  { code: "ko",    label: "한국어",     flag: "🇰🇷" },
  { code: "tr",    label: "Türkçe",    flag: "🇹🇷" },
  { code: "nl",    label: "Nederlands", flag: "🇳🇱" },
  { code: "sv",    label: "Svenska",    flag: "🇸🇪" },
  { code: "pl",    label: "Polski",     flag: "🇵🇱" },
] as const;

export type LangCode = (typeof LANGS)[number]["code"];

/* ── Trigger the widget's internal select ────────────────────── */
function triggerWidgetTranslate(langCode: string) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return false;

  select.value = langCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

/* ── Public switch function (called from navbar) ─────────────── */
export function setGoogleTranslateLanguage(langCode: LangCode) {
  if (langCode === "en") {
    /* Restore original language */
    const iframe = document.querySelector<HTMLIFrameElement>(".goog-te-banner-frame");
    if (iframe) {
      /* Click the "Show original" button if the bar is visible */
      const btn = iframe.contentDocument?.querySelector<HTMLElement>(".goog-te-banner-frame");
      btn?.click();
    }
    /* Remove cookies and reload to fully restore */
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${location.hostname};`;
    location.reload();
    return;
  }

  /* Try the widget select first (no reload needed) */
  const done = triggerWidgetTranslate(langCode);

  if (!done) {
    /* Widget not ready yet — fall back to cookie + reload */
    const value = `/en/${langCode}`;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=.${location.hostname};`;
    location.reload();
  } else {
    /* Widget handled it — persist cookie so future navigations keep the language */
    const value = `/en/${langCode}`;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=.${location.hostname};`;
  }
}

/* ── Read active language from cookie ────────────────────────── */
export function getActiveLang(): LangCode {
  const match = document.cookie
    .split("; ")
    .find(r => r.startsWith("googtrans="));
  if (!match) return "en";
  const parts = match.split("=")[1]?.split("/");
  return (parts?.[2] as LangCode) ?? "en";
}

/* ── Provider — mounts once, re-triggers on route change ─────── */
export function GoogleTranslateProvider() {
  const pathname    = usePathname();
  const initialised = useRef(false);

  /* Aggressively hide every piece of Google Translate UI as soon as it appears */
  useEffect(() => {
    const SELECTORS = [
      ".goog-te-banner-frame",
      ".goog-te-gadget",
      ".skiptranslate",
      "#goog-gt-tt",
      ".goog-te-balloon-frame",
    ];

    const killUI = () => {
      /* 1. Hide any matching elements */
      SELECTORS.forEach(sel => {
        document.querySelectorAll<HTMLElement>(sel).forEach(el => {
          /* Never touch our own hidden container */
          if (el.id === "goog-translate-container") return;
          el.style.setProperty("display", "none", "important");
          el.style.setProperty("height", "0", "important");
          el.style.setProperty("overflow", "hidden", "important");
        });
      });
      /* 2. Undo body offset */
      if (document.body.style.top) document.body.style.top = "";
    };

    /* Run immediately and on every DOM mutation */
    killUI();
    const obs = new MutationObserver(killUI);
    obs.observe(document.documentElement, {
      childList:  true,
      subtree:    true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Re-apply translation after Next.js soft navigation */
  const reapply = useCallback(() => {
    const match = document.cookie
      .split("; ")
      .find(r => r.startsWith("googtrans="));
    if (!match) return; /* English — nothing to do */

    const parts = match.split("=")[1]?.split("/");
    const lang  = parts?.[2];
    if (!lang || lang === "en") return;

    /* Give React a tick to commit the new page DOM, then re-translate */
    setTimeout(() => triggerWidgetTranslate(lang), 150);
  }, []);

  /* Initialise the widget script once */
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGS.map(l => l.code).join(","),
          layout: 0,        /* 0 = SIMPLE */
          autoDisplay: false,
        },
        "goog-translate-container",
      );
    };

    if (!document.getElementById("goog-translate-script")) {
      const s  = document.createElement("script");
      s.id     = "goog-translate-script";
      s.src    = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async  = true;
      /* After the script loads, re-apply any saved language */
      s.onload = () => setTimeout(reapply, 500);
      document.body.appendChild(s);
    }
  }, [reapply]);

  /* Re-apply on every Next.js route change */
  useEffect(() => {
    reapply();
  }, [pathname, reapply]);

  /* Hidden widget mount point — must be in the DOM for the script to attach */
  return <div id="goog-translate-container" className="sr-only" aria-hidden="true" />;
}
