"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Globe, Sun, Moon, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { SOCIAL_ICON_MAP } from "@/components/social-icons";
import { LANGS, setGoogleTranslateLanguage, getActiveLang, type LangCode } from "@/components/google-translate";
import { NAV_LINKS, SOCIAL_LINKS, BRAND } from "@/store/data";

/* Light-mode-only socials shown in navbar (subset: no WhatsApp/TikTok) */
const NAVBAR_SOCIALS = SOCIAL_LINKS.filter(s =>
  ["Instagram", "Facebook", "LinkedIn", "Twitter"].includes(s.name),
);

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted,   setMounted]   = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const [activeLang, setActiveLang] = useState<LangCode>("en");
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setActiveLang(getActiveLang());
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu whenever the route changes */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = mounted && resolvedTheme === "dark";
  const toggleTheme = () => { if (mounted) setTheme(resolvedTheme === "dark" ? "light" : "dark"); };

  return (
    <>
      <motion.nav
        className={cn(
          "relative flex h-full w-full items-center gap-4 rounded-full border px-4 py-2.5 backdrop-blur-[9px] transition-all duration-300 sm:gap-6 sm:px-6 sm:py-3",
          "border-navbar-border bg-navbar text-foreground",
          scrolled && "shadow-md shadow-foreground/5",
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link href="/" className="flex shrink-0 items-center">
            <img
              alt={BRAND.name}
              src={BRAND.logo}
              className="h-10 object-contain sm:h-12"
            />
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden gap-6 font-mono text-xs font-normal tracking-wider sm:flex lg:gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className={cn(
                  "relative transition-colors hover:text-foreground",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  pathname === link.href && "text-primary after:w-full",
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right section */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {/* Socials — desktop light only */}
          {!isDark && mounted && (
            <div className="hidden gap-1 sm:flex">
              {NAVBAR_SOCIALS.map(({ name, href }) => {
                const Icon = SOCIAL_ICON_MAP[name];
                return (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex size-8 items-center justify-center rounded-lg transition-all hover:bg-black/5 dark:hover:bg-white/5"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* Language picker — desktop only */}
          <div className="relative hidden sm:block">
            <motion.button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 rounded-full border border-navbar-border px-2.5 py-1.5 text-xs tracking-wider transition-all hover:bg-black/5 dark:hover:bg-white/5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Select language"
            >
              <Globe className="size-3.5" strokeWidth={1.5} />
              <span>{LANGS.find(l => l.code === activeLang)?.flag ?? "🌐"}</span>
              <span className="uppercase">{activeLang === "zh-CN" ? "ZH" : activeLang.toUpperCase()}</span>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <motion.div
                    className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-navbar shadow-xl"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="max-h-72 overflow-y-auto py-1">
                      {LANGS.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setActiveLang(lang.code);
                            setGoogleTranslateLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[12px] transition-colors hover:bg-primary/10 hover:text-primary",
                            activeLang === lang.code && "bg-primary/10 text-primary font-semibold",
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          {/* <motion.button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border border-navbar-border p-1.5 transition-all hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, rotate: 15 }}
          >
            {isDark && mounted ? (
              <Sun className="size-4" strokeWidth={1.5} />
            ) : (
              <Moon className="size-4" strokeWidth={1.5} />
            )}
          </motion.button> */}

          {/* Get Started — desktop */}
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground shadow-sm transition-all hover:shadow-[0_0_16px_rgba(183,255,0,0.45)]"
            >
              Get Started
              <ArrowRight className="size-3" strokeWidth={2.5} />
            </Link>
          </motion.div>

          {/* Language picker — mobile only (matches desktop style) */}
          <div className="relative sm:hidden">
            <motion.button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1 rounded-full border border-navbar-border px-2 py-1.5 text-xs transition-all hover:bg-black/5 dark:hover:bg-white/5"
              whileTap={{ scale: 0.96 }}
              aria-label="Select language"
            >
              <Globe className="size-3.5" strokeWidth={1.5} />
              <span>{LANGS.find(l => l.code === activeLang)?.flag ?? "🌐"}</span>
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <motion.div
                    className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-navbar shadow-xl"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="max-h-64 overflow-y-auto py-1">
                      {LANGS.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setActiveLang(lang.code);
                            setGoogleTranslateLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[12px] transition-colors hover:bg-primary/10 hover:text-primary",
                            activeLang === lang.code && "bg-primary/10 font-semibold text-primary",
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger — mobile only */}
          <motion.button
            onClick={() => setMenuOpen(o => !o)}
            className="inline-flex items-center justify-center rounded-full border border-navbar-border p-1.5 sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.92 }}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed inset-x-3 top-[72px] z-50 overflow-hidden rounded-2xl border border-navbar-border bg-navbar shadow-2xl sm:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Nav links */}
              <nav className="flex flex-col divide-y divide-border">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 font-mono text-sm tracking-wider transition-colors",
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary",
                      )}
                    >
                      <span>{link.label}</span>
                      {pathname === link.href && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(183,255,0,0.6)]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom row */}
              <div className="flex items-center justify-between border-t border-border px-5 py-4">
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wider text-primary-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                  <ArrowRight className="size-3" strokeWidth={2.5} />
                </Link>
                {/* <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-full border border-navbar-border px-3 py-2 text-xs text-foreground"
                >
                  {isDark && mounted ? (
                    <><Sun className="size-3.5" strokeWidth={1.5} /><span>Light</span></>
                  ) : (
                    <><Moon className="size-3.5" strokeWidth={1.5} /><span>Dark</span></>
                  )}
                </button> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
