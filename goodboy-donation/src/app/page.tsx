"use client";

import { useTranslation } from "react-i18next";
import { HomePageShell } from "@/components/layout/HomePageShell";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <HomePageShell
      image={
        <img
          src="/images/home-hero.png"
          alt=""
        />
      }
    >
      <h1>{t("pages.home.title")}</h1>
    </HomePageShell>
  );
}
