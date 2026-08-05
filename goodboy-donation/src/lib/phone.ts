import {
  PHONE_COUNTRIES,
  type PhoneCountryCode,
} from "@/config/donation";

const PHONE_NATIONAL_MAX_DIGITS = 9;

export function formatPhoneDial(country: PhoneCountryCode) {
  const match = PHONE_COUNTRIES.find((item) => item.code === country);
  return match ? `+ ${match.dial.slice(1)}` : "";
}

export function getPhoneNationalDigits(phone: string) {
  let digits = phone.replace(/\D/g, "");

  for (const item of PHONE_COUNTRIES) {
    const code = item.dial.slice(1);
    if (digits.startsWith(code)) {
      digits = digits.slice(code.length);
      break;
    }
  }

  return digits.slice(0, PHONE_NATIONAL_MAX_DIGITS);
}

function formatPhoneGroups(digits: string) {
  return digits.match(/.{1,3}/g)?.join(" ") ?? "";
}

export function formatNationalPhone(phone: string) {
  return formatPhoneGroups(getPhoneNationalDigits(phone));
}

export function withPhoneDial(phone: string, country: PhoneCountryCode) {
  const dial = formatPhoneDial(country);
  const grouped = formatNationalPhone(phone);
  return grouped ? `${dial} ${grouped}` : `${dial} `;
}
