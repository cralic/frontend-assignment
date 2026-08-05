import { create } from "zustand";

const LAST_STEP_INDEX = 2;

export type SubmitFeedback = {
  type: "success" | "error";
  message: string;
};

type DonationFormState = {
  stepIndex: number;
  submitFeedback: SubmitFeedback | null;
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSubmitFeedback: (feedback: SubmitFeedback | null) => void;
  reset: () => void;
};

export const useDonationFormStore = create<DonationFormState>((set) => ({
  stepIndex: 0,
  submitFeedback: null,
  setStepIndex: (index) =>
    set({
      stepIndex: Math.min(Math.max(index, 0), LAST_STEP_INDEX),
    }),
  nextStep: () =>
    set((state) => ({
      stepIndex: Math.min(state.stepIndex + 1, LAST_STEP_INDEX),
      submitFeedback: null,
    })),
  prevStep: () =>
    set((state) => ({
      stepIndex: Math.max(state.stepIndex - 1, 0),
      submitFeedback: null,
    })),
  setSubmitFeedback: (feedback) => set({ submitFeedback: feedback }),
  reset: () =>
    set({
      stepIndex: 0,
      submitFeedback: null,
    }),
}));
