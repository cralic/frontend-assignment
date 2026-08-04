"use client";

import { useTranslation } from "react-i18next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell title={t("pages.about.title")}>
      {/* About body */}
    </SecondaryPageShell>
  );
}
