import { cn } from "@/lib/utils";

const s = {
  xmlns: "http://www.w3.org/2000/svg" as const,
  fill: "none" as const,
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconInstagram({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function IconFacebook({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function IconTwitter({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export function IconTikTok({ className }: { className?: string }) {
  return (
    <svg {...s} className={cn("size-4 shrink-0", className)}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/** Map used in footer / navbar so they only need the icon key, not direct imports */
export const SOCIAL_ICON_MAP = {
  Instagram: IconInstagram,
  Facebook:  IconFacebook,
  LinkedIn:  IconLinkedin,
  Twitter:   IconTwitter,
  TikTok:    IconTikTok,
  WhatsApp:  IconWhatsApp,
} as const;

export type SocialIconKey = keyof typeof SOCIAL_ICON_MAP;
