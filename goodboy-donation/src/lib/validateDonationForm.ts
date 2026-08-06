import type { PhoneCountryCode } from "@/config/donation";
import {
  donationFormSchema,
  type DonationFormValues,
} from "@/lib/donationSchema";
import { isValidEmail } from "@/lib/email";

/** @see https://github.com/ariankoochak/regex-patterns-of-all-countries */
const SK_PHONE_PATTERN =
  /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
const CZ_PHONE_PATTERN =
  /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;

function isValidPhone(phone: string, country: PhoneCountryCode) {
  const normalized = phone.replace(/\s+/g, "");
  if (country === "SK") return SK_PHONE_PATTERN.test(normalized);
  return CZ_PHONE_PATTERN.test(normalized);
}

export const STEP_FIELDS = [
  ["helpType", "shelterId", "shelterName", "amount"],
  ["firstName", "lastName", "email", "phone", "phoneCountry"],
  ["consent"],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof DonationFormValues>>;

export function getStepSchema(stepIndex: number) {
  return donationFormSchema.superRefine((values, ctx) => {
    const validateStep1 = stepIndex === 0 || stepIndex === 2;
    const validateStep2 = stepIndex === 1 || stepIndex === 2;
    const validateStep3 = stepIndex === 2;

    if (validateStep1) {
      if (values.helpType === "shelter" && !values.shelterId.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["shelterId"],
          message: "form.step1.shelter.required",
        });
      }

      if (values.amount <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["amount"],
          message: "form.step1.amount.required",
        });
      }
    }

    if (validateStep2) {
      const firstName = values.firstName.trim();
      // Optional on FE (assignment); unmarked in Figma; API requires it.
      if (
        firstName.length > 0 &&
        (firstName.length < 2 || firstName.length > 20)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["firstName"],
          message: "form.step2.firstName.invalid",
        });
      }

      const lastName = values.lastName.trim();
      if (lastName.length < 2 || lastName.length > 30) {
        ctx.addIssue({
          code: "custom",
          path: ["lastName"],
          message: "form.step2.lastName.required",
        });
      }

      const email = values.email.trim();
      if (!email || !isValidEmail(email)) {
        ctx.addIssue({
          code: "custom",
          path: ["email"],
          message: "form.step2.email.required",
        });
      }

      if (!isValidPhone(values.phone, values.phoneCountry)) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: "form.step2.phone.required",
        });
      }
    }

    if (validateStep3 && !values.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "form.step3.consent.required",
      });
    }
  });
}
