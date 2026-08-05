export const DONATION_AMOUNT_PRESETS = [5, 10, 20, 30, 50, 100] as const;

export type HelpType = "shelter" | "foundation";

export const DONATION_STEPS = ["shelter", "personal", "confirm"] as const;

export type DonationStepId = (typeof DONATION_STEPS)[number];
