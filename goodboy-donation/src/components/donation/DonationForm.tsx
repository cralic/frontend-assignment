"use client";

import { useTranslation } from "react-i18next";
import { DonationStep1 } from "@/components/donation/DonationStep1";
import { DonationStep2 } from "@/components/donation/DonationStep2";
import { DonationStep3 } from "@/components/donation/DonationStep3";
import { FormActions } from "@/components/donation/FormActions";
import { hasStepErrors, validateStep1 } from "@/lib/validateDonationForm";
import { useDonationFormStore } from "@/store/donationForm";

export function DonationForm() {
  const { stepIndex } = useDonationFormStore();

  if (stepIndex === 0) return <DonationStep1 />;
  if (stepIndex === 1) return <DonationStep2 />;
  return <DonationStep3 />;
}

export function DonationFormActions() {
  const { t } = useTranslation();
  const { stepIndex, values, setStep1Errors, nextStep, prevStep } =
    useDonationFormStore();

  const isLastStep = stepIndex === 2;

  function handleContinue() {
    if (stepIndex === 0) {
      const errors = validateStep1(values);
      setStep1Errors(errors);
      if (hasStepErrors(errors)) return;
    }

    if (!isLastStep) {
      nextStep();
    }
  }

  return (
    <FormActions
      showBack={stepIndex > 0}
      onBack={prevStep}
      onContinue={handleContinue}
      continueLabel={
        isLastStep ? t("form.actions.submit") : t("form.actions.continue")
      }
      showContinueArrow={!isLastStep}
    />
  );
}
