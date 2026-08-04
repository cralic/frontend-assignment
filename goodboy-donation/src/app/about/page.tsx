"use client";

import { useTranslation } from "react-i18next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell>
      <h1>{t("pages.about.title")}</h1>
    </SecondaryPageShell>
  );
}
