"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  DonationForm,
  DonationFormActions,
} from "@/components/donation/DonationForm";
import { DonationDocumentMeta } from "@/components/donation/DonationDocumentMeta";
import { DonationFormProvider } from "@/components/donation/DonationFormProvider";
import { HomePageShell } from "@/components/layout/HomePageShell";
import { homeHero } from "@/config/home";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <DonationFormProvider>
      <DonationDocumentMeta />
      <HomePageShell
        image={
          <Image
            src={homeHero.src}
            alt={t("pages.home.heroAlt")}
            fill
            sizes={homeHero.sizes}
            priority
            fetchPriority="high"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        }
        actions={<DonationFormActions />}
      >
        <DonationForm />
      </HomePageShell>
    </DonationFormProvider>
  );
}
