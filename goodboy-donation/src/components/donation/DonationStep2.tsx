"use client";

import { useTranslation } from "react-i18next";
import { DonationStepShell } from "@/components/donation/DonationStepShell";

export function DonationStep2() {
  const { t } = useTranslation();

  return (
    <DonationStepShell currentStep={1} title={t("form.step2.title")}>
      {null}
    </DonationStepShell>
  );
}
