"use client";

import { useTranslation } from "react-i18next";
import { DonationStepShell } from "@/components/donation/DonationStepShell";

export function DonationStep3() {
  const { t } = useTranslation();

  return (
    <DonationStepShell currentStep={2} title={t("form.step3.title")}>
      {null}
    </DonationStepShell>
  );
}
