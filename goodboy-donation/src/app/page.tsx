"use client";

import { useTranslation } from "react-i18next";
import {
  DonationForm,
  DonationFormActions,
} from "@/components/donation/DonationForm";
import { DonationFormProvider } from "@/components/donation/DonationFormProvider";
import { HomePageShell } from "@/components/layout/HomePageShell";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <DonationFormProvider>
      <HomePageShell
        image={
          <img src="/images/home-hero.png" alt={t("pages.home.heroAlt")} />
        }
        actions={<DonationFormActions />}
      >
        <DonationForm />
      </HomePageShell>
    </DonationFormProvider>
  );
}
