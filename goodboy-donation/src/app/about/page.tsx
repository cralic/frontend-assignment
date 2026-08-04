"use client";

import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t("pages.about.title")}</h1>
    </main>
  );
}