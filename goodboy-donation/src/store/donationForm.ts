import { create } from "zustand";
import type { HelpType } from "@/config/donation";
import type { Step1Errors } from "@/lib/validateDonationForm";

const LAST_STEP_INDEX = 2;

export type DonationFormValues = {
  helpType: HelpType;
  shelterId: string;
  amount: number | null;
};

type DonationFormState = {
  stepIndex: number;
  values: DonationFormValues;
  step1Errors: Step1Errors;
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  patchValues: (patch: Partial<DonationFormValues>) => void;
  setStep1Errors: (errors: Step1Errors) => void;
  clearStep1Errors: () => void;
  reset: () => void;
};

const initialValues: DonationFormValues = {
  helpType: "foundation",
  shelterId: "",
  amount: 0,
};

export const useDonationFormStore = create<DonationFormState>((set) => ({
  stepIndex: 0,
  values: initialValues,
  step1Errors: {},
  setStepIndex: (index) =>
    set({
      stepIndex: Math.min(Math.max(index, 0), LAST_STEP_INDEX),
    }),
  nextStep: () =>
    set((state) => ({
      stepIndex: Math.min(state.stepIndex + 1, LAST_STEP_INDEX),
      step1Errors: {},
    })),
  prevStep: () =>
    set((state) => ({
      stepIndex: Math.max(state.stepIndex - 1, 0),
      step1Errors: {},
    })),
  patchValues: (patch) =>
    set((state) => {
      const nextErrors = { ...state.step1Errors };

      if ("shelterId" in patch || patch.helpType === "foundation") {
        delete nextErrors.shelterId;
      }
      if ("amount" in patch) {
        delete nextErrors.amount;
      }

      return {
        values: { ...state.values, ...patch },
        step1Errors: nextErrors,
      };
    }),
  setStep1Errors: (errors) => set({ step1Errors: errors }),
  clearStep1Errors: () => set({ step1Errors: {} }),
  reset: () =>
    set({ stepIndex: 0, values: initialValues, step1Errors: {} }),
}));
