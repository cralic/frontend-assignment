import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import sk from "@/i18n/locales/sk.json";
import { defaultOgImage, siteMetadataBase } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: sk.app.title,
    template: sk.seo.titleTemplate,
  },
  description: sk.app.description,
  openGraph: {
    title: sk.app.title,
    description: sk.app.description,
    url: "/",
    siteName: sk.app.title,
    locale: "sk_SK",
    type: "website",
    images: [
      {
        url: defaultOgImage.url,
        width: defaultOgImage.width,
        height: defaultOgImage.height,
        alt: defaultOgImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: sk.app.title,
    description: sk.app.description,
    images: [defaultOgImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={inter.variable}>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
