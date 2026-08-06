import type { Metadata } from "next";
import sk from "@/i18n/locales/sk.json";
import { buildPageMetadata, homeOgImage } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: sk.seo.about.title,
  description: sk.seo.about.description,
  path: "/about",
  image: homeOgImage,
});

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
