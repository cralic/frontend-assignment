"use client";

import { useTranslation } from "react-i18next";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell>
      <h1>{t("pages.contact.title")}</h1>
    </SecondaryPageShell>
  );
}
