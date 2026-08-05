"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Stepper } from "@/components/ui/Stepper";
import { hasStepErrors } from "@/lib/validateDonationForm";
import { useDonationFormStore } from "@/store/donationForm";

type DonationStepShellProps = {
  currentStep: number;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.heading.lg.size}px;
  font-weight: ${({ theme }) => theme.typography.heading.lg.weight};
  line-height: ${({ theme }) => theme.typography.heading.lg.lineHeight}px;
  letter-spacing: ${({ theme }) =>
    theme.typography.heading.lg.letterSpacing}px;
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
  children,
  className,
}: DonationStepShellProps) {
  const { t } = useTranslation();
  const { step1Errors, step2Errors, step3Errors } = useDonationFormStore();

  const errorSteps = [
    hasStepErrors(step1Errors) ? 0 : null,
    hasStepErrors(step2Errors) ? 1 : null,
    hasStepErrors(step3Errors) ? 2 : null,
  ].filter((index): index is number => index != null);

  return (
    <Root className={className}>
      <Stepper
        currentStep={currentStep}
        errorSteps={errorSteps}
        steps={[
          { id: "shelter", label: t("form.stepper.steps.shelter") },
          { id: "personal", label: t("form.stepper.steps.personal") },
          { id: "confirm", label: t("form.stepper.steps.confirm") },
        ]}
      />

      <Title>{title}</Title>

      {children}
    </Root>
  );
}
