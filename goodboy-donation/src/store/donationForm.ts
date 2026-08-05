import { create } from "zustand";
import type { HelpType, PhoneCountryCode } from "@/config/donation";
import { withPhoneDial } from "@/lib/phone";
import type { Step1Errors, Step2Errors } from "@/lib/validateDonationForm";

const LAST_STEP_INDEX = 2;

export type DonationFormValues = {
  helpType: HelpType;
  shelterId: string;
  amount: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountry: PhoneCountryCode;
};

type DonationFormState = {
  stepIndex: number;
  values: DonationFormValues;
  step1Errors: Step1Errors;
  step2Errors: Step2Errors;
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  patchValues: (patch: Partial<DonationFormValues>) => void;
  setStep1Errors: (errors: Step1Errors) => void;
  setStep2Errors: (errors: Step2Errors) => void;
  clearStepErrors: () => void;
  reset: () => void;
};

const initialValues: DonationFormValues = {
  helpType: "foundation",
  shelterId: "",
  amount: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: withPhoneDial("", "SK"),
  phoneCountry: "SK",
};

export const useDonationFormStore = create<DonationFormState>((set) => ({
  stepIndex: 0,
  values: initialValues,
  step1Errors: {},
  step2Errors: {},
  setStepIndex: (index) =>
    set({
      stepIndex: Math.min(Math.max(index, 0), LAST_STEP_INDEX),
    }),
  nextStep: () =>
    set((state) => ({
      stepIndex: Math.min(state.stepIndex + 1, LAST_STEP_INDEX),
      step1Errors: {},
      step2Errors: {},
    })),
  prevStep: () =>
    set((state) => ({
      stepIndex: Math.max(state.stepIndex - 1, 0),
      step1Errors: {},
      step2Errors: {},
    })),
  patchValues: (patch) =>
    set((state) => {
      const nextStep1 = { ...state.step1Errors };
      const nextStep2 = { ...state.step2Errors };

      if ("shelterId" in patch || patch.helpType === "foundation") {
        delete nextStep1.shelterId;
      }
      if ("amount" in patch) {
        delete nextStep1.amount;
      }
      if ("firstName" in patch) {
        delete nextStep2.firstName;
      }
      if ("lastName" in patch) {
        delete nextStep2.lastName;
      }
      if ("email" in patch) {
        delete nextStep2.email;
      }
      if ("phone" in patch) {
        delete nextStep2.phone;
      }

      return {
        values: { ...state.values, ...patch },
        step1Errors: nextStep1,
        step2Errors: nextStep2,
      };
    }),
  setStep1Errors: (errors) => set({ step1Errors: errors }),
  setStep2Errors: (errors) => set({ step2Errors: errors }),
  clearStepErrors: () => set({ step1Errors: {}, step2Errors: {} }),
  reset: () =>
    set({
      stepIndex: 0,
      values: initialValues,
      step1Errors: {},
      step2Errors: {},
    }),
}));
