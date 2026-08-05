import type { FieldErrors } from "react-hook-form";
import type { DonationFormValues } from "@/lib/donationSchema";
import { STEP_FIELDS } from "@/lib/validateDonationForm";

export function getErrorSteps(errors: FieldErrors<DonationFormValues>) {
  const steps: number[] = [];

  for (const [index, fields] of STEP_FIELDS.entries()) {
    if (fields.some((field) => errors[field])) {
      steps.push(index);
    }
  }

  return steps;
}
