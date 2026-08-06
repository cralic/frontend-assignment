import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { homeHero } from "@/config/home";
import sk from "@/i18n/locales/sk.json";
import { buildPageMetadata, homeOgImage } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: sk.seo.home.title,
  description: sk.seo.home.description,
  path: "/",
  image: homeOgImage,
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { props } = getImageProps({
    src: homeHero.src,
    alt: "",
    width: homeHero.width,
    height: homeHero.height,
    sizes: homeHero.sizes,
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
