import { create } from "zustand";
import type { HelpType, PhoneCountryCode } from "@/config/donation";
import { withPhoneDial } from "@/lib/phone";
import type {
  Step1Errors,
  Step2Errors,
  Step3Errors,
} from "@/lib/validateDonationForm";

const LAST_STEP_INDEX = 2;

export type DonationFormValues = {
  helpType: HelpType;
  shelterId: string;
  shelterName: string;
  amount: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountry: PhoneCountryCode;
  consent: boolean;
};

type DonationFormState = {
  stepIndex: number;
  values: DonationFormValues;
  step1Errors: Step1Errors;
  step2Errors: Step2Errors;
  step3Errors: Step3Errors;
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  patchValues: (patch: Partial<DonationFormValues>) => void;
  setStep1Errors: (errors: Step1Errors) => void;
  setStep2Errors: (errors: Step2Errors) => void;
  setStep3Errors: (errors: Step3Errors) => void;
  clearStepErrors: () => void;
  reset: () => void;
};

const initialValues: DonationFormValues = {
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

const emptyErrors = () => ({
  step1Errors: {} as Step1Errors,
  step2Errors: {} as Step2Errors,
  step3Errors: {} as Step3Errors,
});

export const useDonationFormStore = create<DonationFormState>((set) => ({
  stepIndex: 0,
  values: initialValues,
  ...emptyErrors(),
  setStepIndex: (index) =>
    set({
      stepIndex: Math.min(Math.max(index, 0), LAST_STEP_INDEX),
    }),
  nextStep: () =>
    set((state) => ({
      stepIndex: Math.min(state.stepIndex + 1, LAST_STEP_INDEX),
      ...emptyErrors(),
    })),
  prevStep: () =>
    set((state) => ({
      stepIndex: Math.max(state.stepIndex - 1, 0),
      ...emptyErrors(),
    })),
  patchValues: (patch) =>
    set((state) => {
      const nextStep1 = { ...state.step1Errors };
      const nextStep2 = { ...state.step2Errors };
      const nextStep3 = { ...state.step3Errors };

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
      if ("consent" in patch) {
        delete nextStep3.consent;
      }

      return {
        values: { ...state.values, ...patch },
        step1Errors: nextStep1,
        step2Errors: nextStep2,
        step3Errors: nextStep3,
      };
    }),
  setStep1Errors: (errors) => set({ step1Errors: errors }),
  setStep2Errors: (errors) => set({ step2Errors: errors }),
  setStep3Errors: (errors) => set({ step3Errors: errors }),
  clearStepErrors: () => set({ ...emptyErrors() }),
  reset: () =>
    set({
      stepIndex: 0,
      values: initialValues,
      ...emptyErrors(),
    }),
}));
