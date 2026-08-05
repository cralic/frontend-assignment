import { getPhoneNationalDigits } from "@/lib/phone";
import type { DonationFormValues } from "@/lib/donationSchema";
import type { ContributeRequest } from "@/types/shelters";

export function toContributeRequest(
  values: DonationFormValues,
): ContributeRequest {
  if (values.amount <= 0) {
    throw new Error("Amount is required");
  }

  const body: ContributeRequest = {
    contributors: [
      {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: toContributePhone(values.phone),
      },
    ],
    value: values.amount,
  };

  if (values.shelterId.trim()) {
    body.shelterID = Number(values.shelterId);
  }

  return body;
}

function toContributePhone(phone: string) {
  const digits = getPhoneNationalDigits(phone);
  if (!digits) return phone.trim();

  const withTrunk = digits.startsWith("0") ? digits : `0${digits}`;
  return withTrunk.match(/.{1,3}/g)?.join(" ") ?? withTrunk;
}
