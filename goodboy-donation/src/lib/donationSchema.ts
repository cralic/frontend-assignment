import { z } from "zod";
import { withPhoneDial } from "@/lib/phone";

export const donationFormSchema = z.object({
  helpType: z.enum(["shelter", "foundation"]),
  shelterId: z.string(),
  shelterName: z.string(),
  amount: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  phoneCountry: z.enum(["SK", "CZ"]),
  consent: z.boolean(),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;

export const donationDefaultValues: DonationFormValues = {
  helpType: "foundation",
  shelterId: "",
  shelterName: "",
  amount: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: withPhoneDial("", "SK"),
  phoneCountry: "SK",
  consent: false,
};
