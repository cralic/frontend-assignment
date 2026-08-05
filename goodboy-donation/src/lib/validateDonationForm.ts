import { type PhoneCountryCode } from "@/config/donation";
import type { DonationFormValues } from "@/store/donationForm";

export type Step1Field = "shelterId" | "amount";
export type Step2Field = "firstName" | "lastName" | "email" | "phone";
export type Step3Field = "consent";

export type Step1Errors = Partial<Record<Step1Field, true>>;
export type Step2Errors = Partial<Record<Step2Field, true>>;
export type Step3Errors = Partial<Record<Step3Field, true>>;

/** @see https://colinhacks.com/essays/reasonable-email-regex */
const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
/** @see https://github.com/ariankoochak/regex-patterns-of-all-countries */
const SK_PHONE_PATTERN =
  /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
const CZ_PHONE_PATTERN =
  /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
const FIRST_NAME_MIN = 2;
const FIRST_NAME_MAX = 20;
const LAST_NAME_MIN = 2;
const LAST_NAME_MAX = 30;

function isLengthInRange(value: string, min: number, max: number) {
  const length = value.trim().length;
  return length >= min && length <= max;
}

function isValidPhone(phone: string, country: PhoneCountryCode) {
  const normalized = phone.replace(/\s+/g, "");
  if (country === "SK") return SK_PHONE_PATTERN.test(normalized);
  return CZ_PHONE_PATTERN.test(normalized);
}

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

export function validateStep2(values: DonationFormValues): Step2Errors {
  const errors: Step2Errors = {};
  const firstName = values.firstName.trim();

  if (
    firstName.length > 0 &&
    !isLengthInRange(values.firstName, FIRST_NAME_MIN, FIRST_NAME_MAX)
  ) {
    errors.firstName = true;
  }

  if (!isLengthInRange(values.lastName, LAST_NAME_MIN, LAST_NAME_MAX)) {
    errors.lastName = true;
  }

  if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = true;
  }

  if (!isValidPhone(values.phone, values.phoneCountry)) {
    errors.phone = true;
  }

  return errors;
}

export function validateStep3(values: DonationFormValues): Step3Errors {
  const errors: Step3Errors = {};

  if (!values.consent) {
    errors.consent = true;
  }

  return errors;
}

export function hasStepErrors(errors: object) {
  return Object.keys(errors).length > 0;
}
