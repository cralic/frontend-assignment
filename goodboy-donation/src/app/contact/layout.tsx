import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { contactHero } from "@/config/contact";
import sk from "@/i18n/locales/sk.json";
import { buildPageMetadata, defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: sk.seo.contact.title,
  description: sk.seo.contact.description,
  path: "/contact",
  image: defaultOgImage,
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { props } = getImageProps({
    src: contactHero.src,
    alt: "",
    width: contactHero.width,
    height: contactHero.height,
    sizes: contactHero.sizes,
    priority: true,
  });

  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    fetchPriority: "high",
  });

  return children;
}
