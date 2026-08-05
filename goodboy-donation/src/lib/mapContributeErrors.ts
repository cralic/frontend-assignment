import type { FieldPath, UseFormSetError } from "react-hook-form";
import type { DonationFormValues } from "@/lib/donationSchema";
import type { ContributeMessage } from "@/types/shelters";

export type ContributeFieldMapping = {
  fields: Array<keyof DonationFormValues>;
  earliestStep: 0 | 1 | null;
};

const FIELD_STEPS: Partial<Record<keyof DonationFormValues, 0 | 1>> = {
  shelterId: 0,
  amount: 0,
  firstName: 1,
  lastName: 1,
  email: 1,
  phone: 1,
};

const PATH_TO_FIELD: Record<string, keyof DonationFormValues> = {
  "body.shelterID": "shelterId",
  "body.value": "amount",
  "body.contributors.0.firstName": "firstName",
  "body.contributors.0.lastName": "lastName",
  "body.contributors.0.email": "email",
  "body.contributors.0.phone": "phone",
};

export function mapContributeErrors(
  messages: ContributeMessage[],
): ContributeFieldMapping {
  const fields: Array<keyof DonationFormValues> = [];

  for (const message of messages) {
    if (message.type !== "ERROR") continue;
    const path = normalizePath(message.path ?? message.message);
    const field = PATH_TO_FIELD[path];
    if (field && !fields.includes(field)) {
      fields.push(field);
    }
  }

  const earliestStep =
    fields.reduce<0 | 1 | null>((earliest, field) => {
      const step = FIELD_STEPS[field];
      if (step == null) return earliest;
      if (earliest == null) return step;
      return Math.min(earliest, step) as 0 | 1;
    }, null);

  return { fields, earliestStep };
}

const FIELD_MESSAGE_KEYS: Partial<Record<keyof DonationFormValues, string>> = {
  shelterId: "form.step1.shelter.required",
  amount: "form.step1.amount.required",
  firstName: "form.step2.firstName.invalid",
  lastName: "form.step2.lastName.required",
  email: "form.step2.email.required",
  phone: "form.step2.phone.required",
};

export function applyContributeFieldErrors(
  fields: Array<keyof DonationFormValues>,
  setError: UseFormSetError<DonationFormValues>,
) {
  for (const field of fields) {
    setError(field as FieldPath<DonationFormValues>, {
      type: "server",
      message: FIELD_MESSAGE_KEYS[field] ?? "form.submit.fieldError",
    });
  }
}

function normalizePath(value: string) {
  return value.replace(/^joi\./, "");
}
