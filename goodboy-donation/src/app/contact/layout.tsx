import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { contactHero } from "@/config/contact";

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
