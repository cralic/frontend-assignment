"use client";

import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DonationStep1 } from "@/components/donation/DonationStep1";
import { DonationStep2 } from "@/components/donation/DonationStep2";
import { DonationStep3 } from "@/components/donation/DonationStep3";
import { FormActions } from "@/components/donation/FormActions";
import { Button } from "@/components/ui/Button";
import { ContributeApiError } from "@/api/shelters";
import { useContributeMutation } from "@/hooks/shelters";
import {
  donationDefaultValues,
  type DonationFormValues,
} from "@/lib/donationSchema";
import {
  applyContributeFieldErrors,
  mapContributeErrors,
} from "@/lib/mapContributeErrors";
import { toContributeRequest } from "@/lib/toContributeRequest";
import { useDonationFormStore } from "@/store/donationForm";

export function DonationForm() {
  const { stepIndex } = useDonationFormStore();

  if (stepIndex === 0) return <DonationStep1 />;
  if (stepIndex === 1) return <DonationStep2 />;
  return <DonationStep3 />;
}

const Feedback = styled.p<{ $type: "success" | "error" }>`
  margin: 0;
  color: ${({ theme, $type }) =>
    $type === "success"
      ? theme.colors.action.primary.default
      : theme.colors.feedback.error};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.sm.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
`;

const ActionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

const SuccessActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export function DonationFormActions() {
  const { t } = useTranslation();
  const contribute = useContributeMutation();
  const { getValues, setError, trigger, reset } =
    useFormContext<DonationFormValues>();
  const {
    stepIndex,
    submitFeedback,
    setStepIndex,
    setSubmitFeedback,
    nextStep,
    prevStep,
    reset: resetStore,
  } = useDonationFormStore();

  const isLastStep = stepIndex === 2;
  const isSuccess = submitFeedback?.type === "success";

  async function handleContinue() {
    setSubmitFeedback(null);

    const isValid = await trigger(undefined, { shouldFocus: true });
    if (!isValid) return;

    if (!isLastStep) {
      nextStep();
      return;
    }

    try {
      const response = await contribute.mutateAsync(
        toContributeRequest(getValues()),
      );
      const successMessage =
        response.messages.find((message) => message.type === "SUCCESS")
          ?.message ?? t("form.submit.success");

      setSubmitFeedback({ type: "success", message: successMessage });
    } catch (error) {
      if (error instanceof ContributeApiError) {
        const mapped = mapContributeErrors(error.response.messages);
        applyContributeFieldErrors(mapped.fields, setError);

        if (mapped.earliestStep != null) {
          setStepIndex(mapped.earliestStep);
        }

        const apiMessage =
          error.response.messages.find((message) => message.type === "ERROR")
            ?.message ?? error.message;

        setSubmitFeedback({
          type: "error",
          message:
            mapped.earliestStep != null
              ? t("form.submit.fieldError")
              : apiMessage === "Something went wrong" ||
                  apiMessage.startsWith("joi.")
                ? t("form.submit.error")
                : apiMessage,
        });
        return;
      }

      setSubmitFeedback({
        type: "error",
        message: t("form.submit.error"),
      });
    }
  }

  function handleDonateAgain() {
    reset(donationDefaultValues);
    resetStore();
  }

  if (isSuccess) {
    return (
      <SuccessActions>
        <Button variant="secondary" type="button" onClick={handleDonateAgain}>
          {t("form.actions.donateAgain")}
        </Button>
      </SuccessActions>
    );
  }

  return (
    <ActionsBlock>
      {submitFeedback?.type === "error" ? (
        <Feedback $type="error" role="alert">
          {submitFeedback.message}
        </Feedback>
      ) : null}
      <FormActions
        showBack={stepIndex > 0}
        onBack={prevStep}
        onContinue={() => {
          void handleContinue();
        }}
        continueLabel={
          contribute.isPending
            ? t("form.actions.submitting")
            : isLastStep
              ? t("form.actions.submit")
              : t("form.actions.continue")
        }
        showContinueArrow={!isLastStep && !contribute.isPending}
        continueDisabled={contribute.isPending}
      />
    </ActionsBlock>
  );
}
