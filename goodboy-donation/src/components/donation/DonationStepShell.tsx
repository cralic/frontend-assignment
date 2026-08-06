"use client";

import { useTranslation } from "react-i18next";
import styled, { css, keyframes } from "styled-components";
import { useFormContext, useFormState } from "react-hook-form";
import { Stepper } from "@/components/ui/Stepper";
import type { DonationFormValues } from "@/lib/donationSchema";
import { getErrorSteps } from "@/lib/formValidation";
import { useDonationFormStore } from "@/store/donationForm";

type DonationStepShellProps = {
  currentStep: number;
  title: string;
  allCompleted?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const stepEnter = keyframes`
  from {
    opacity: 0;
    transform: translateX(calc(var(--step-dir, 1) * 20px));
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StepContent = styled.div<{ $direction: 1 | -1; $animate: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
  --step-dir: ${({ $direction }) => $direction};
  animation: ${({ $animate }) =>
    $animate
      ? css`
          ${stepEnter} 240ms ease
        `
      : "none"};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HeadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;
`;

const CurrentStepLabel = styled.p`
  display: none;
  margin: 0;
  color: ${({ theme }) => theme.colors.content.secondary};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.sm.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.sm.letterSpacing}px;

  @media (max-width: 640px) {
    display: block;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.heading.lg.size}px;
  font-weight: ${({ theme }) => theme.typography.heading.lg.weight};
  line-height: ${({ theme }) => theme.typography.heading.lg.lineHeight}px;
  letter-spacing: ${({ theme }) =>
    theme.typography.heading.lg.letterSpacing}px;

  @media (max-width: 1100px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export const StepSubtitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 600;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;
`;

export function DonationStepShell({
  currentStep,
  title,
  allCompleted = false,
  children,
  className,
}: DonationStepShellProps) {
  const { t } = useTranslation();
  const { stepDirection, hasStepped } = useDonationFormStore();
  const { control } = useFormContext<DonationFormValues>();
  const { errors } = useFormState({ control });

  const steps = [
    { id: "shelter", label: t("form.stepper.steps.shelter") },
    { id: "personal", label: t("form.stepper.steps.personal") },
    { id: "confirm", label: t("form.stepper.steps.confirm") },
  ];

  const activeStepIndex = allCompleted
    ? steps.length - 1
    : Math.min(currentStep, steps.length - 1);
  const currentStepLabel = steps[activeStepIndex]?.label;
  const contentKey = allCompleted ? "success" : `step-${currentStep}`;

  return (
    <Root className={className}>
      <Stepper
        currentStep={allCompleted ? 3 : currentStep}
        errorSteps={allCompleted ? [] : getErrorSteps(errors)}
        steps={steps}
      />

      <StepContent
        key={contentKey}
        $direction={stepDirection}
        $animate={hasStepped}
      >
        <HeadingBlock>
          {currentStepLabel ? (
            <CurrentStepLabel>{currentStepLabel}</CurrentStepLabel>
          ) : null}
          <Title>{title}</Title>
        </HeadingBlock>

        {children}
      </StepContent>
    </Root>
  );
}
