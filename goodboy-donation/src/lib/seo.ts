import type { Metadata } from "next";
import sk from "@/i18n/locales/sk.json";
import { contactHero } from "@/config/contact";
import { homeHero } from "@/config/home";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteMetadataBase = new URL(siteUrl);

export const defaultOgImage = {
  url: contactHero.src,
  width: contactHero.width,
  height: contactHero.height,
  alt: sk.pages.contact.heroAlt,
} as const;

export const homeOgImage = {
  url: homeHero.src,
  width: homeHero.width,
  height: homeHero.height,
  alt: sk.pages.home.heroAlt,
} as const;

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  locale = "sk_SK",
}: {
  title: string;
  description: string;
  path?: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  locale?: "sk_SK" | "en_US";
}): Metadata {
  const url = new URL(path, siteMetadataBase).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: sk.app.title,
      locale,
      type: "website",
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
