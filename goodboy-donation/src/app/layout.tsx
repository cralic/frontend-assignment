import "@mantine/core/styles.css";
import type { Metadata } from "next";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { AppProviders } from "@/components/providers/AppProviders";
import sk from "@/i18n/locales/sk.json";
import "./globals.css";

export const metadata: Metadata = {
  title: sk.app.title,
  description: sk.app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AppProviders>{children}</AppProviders>
        </MantineProvider>
      </body>
    </html>
  );
}