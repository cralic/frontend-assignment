export const DONATION_AMOUNT_PRESETS = [5, 10, 20, 30, 50, 100] as const;

export type HelpType = "shelter" | "foundation";

export type PhoneCountryCode = "SK" | "CZ";

export const PHONE_COUNTRIES = [
  { code: "SK" as const, dial: "+421", label: "Slovensko" },
  { code: "CZ" as const, dial: "+420", label: "Česko" },
] as const;

export const DONATION_STEPS = ["shelter", "personal", "confirm"] as const;

export type DonationStepId = (typeof DONATION_STEPS)[number];
