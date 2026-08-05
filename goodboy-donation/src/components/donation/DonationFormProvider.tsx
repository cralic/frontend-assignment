"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  donationDefaultValues,
  type DonationFormValues,
} from "@/lib/donationSchema";
import { getStepSchema } from "@/lib/validateDonationForm";
import { useDonationFormStore } from "@/store/donationForm";

type DonationFormProviderProps = {
  children: React.ReactNode;
};

export function DonationFormProvider({ children }: DonationFormProviderProps) {
  const form = useForm<DonationFormValues>({
    defaultValues: donationDefaultValues,
    mode: "onSubmit",
    criteriaMode: "all",
    shouldFocusError: true,
    resolver: async (values, context, options) => {
      const stepIndex = useDonationFormStore.getState().stepIndex;
      return zodResolver(getStepSchema(stepIndex))(values, context, options);
    },
  });

  const { errors, submitCount } = form.formState;
  void errors;
  void submitCount;

  return <FormProvider {...form}>{children}</FormProvider>;
}
