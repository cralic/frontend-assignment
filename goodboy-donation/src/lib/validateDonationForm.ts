import type { DonationFormValues } from "@/store/donationForm";

export type Step1Field = "shelterId" | "amount";

export type Step1Errors = Partial<Record<Step1Field, true>>;

export function validateStep1(values: DonationFormValues): Step1Errors {
  const errors: Step1Errors = {};

  if (values.helpType === "shelter" && !values.shelterId.trim()) {
    errors.shelterId = true;
  }

  if (values.amount == null || values.amount <= 0) {
    errors.amount = true;
  }

  return errors;
}

export function hasStepErrors(errors: object) {
  return Object.keys(errors).length > 0;
}
