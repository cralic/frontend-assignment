"use client";

import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";
import XIcon from "@/assets/icons/x.svg";

export type StepStatus = "upcoming" | "current" | "completed" | "error";

export type StepperStep = {
  id: string;
  label: string;
  status?: StepStatus;
};

type StepperProps = {
  steps: StepperStep[];
  currentStep?: number;
  errorSteps?: number[];
  className?: string;
  "aria-label"?: string;
};

function resolveStatus(
  index: number,
  currentStep: number,
  errorSteps: number[],
  explicit?: StepStatus,
): StepStatus {
  if (explicit) return explicit;
  if (errorSteps.includes(index)) return "error";
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

const List = styled.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
  height: ${({ theme }) => theme.radius.stepper}px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li<{ $isLast: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  height: ${({ theme }) => theme.radius.stepper}px;
  min-width: 0;

  ${({ $isLast }) =>
    $isLast
      ? css`
          flex: 0 1 auto;
        `
      : css`
          flex: 1 1 0;
        `}

  @media (max-width: 640px) {
    gap: 0;

    ${({ $isLast }) =>
      $isLast
        ? css`
            flex: 0 0 auto;
          `
        : css`
            flex: 1 1 0;
          `}
  }
`;

const Label = styled.span<{ $status: StepStatus }>`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;

  color: ${({ theme, $status }) => {
    switch ($status) {
      case "upcoming":
        return theme.colors.content.quaternary;
      case "error":
        return theme.colors.feedback.error;
      default:
        return theme.colors.content.primary;
    }
  }};

  @media (max-width: 640px) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const Tail = styled.span`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  align-self: center;
  min-width: ${({ theme }) => theme.space[16]}px;
  height: 0;
  padding-left: ${({ theme }) => theme.space[8]}px;

  &::after {
    content: "";
    flex: 1 1 auto;
    height: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.divider};
  }
`;

const IconRoot = styled.span<{ $status: StepStatus }>`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.radius.stepper}px;
  height: ${({ theme }) => theme.radius.stepper}px;
  border-radius: ${({ theme }) => theme.radius.stepper}px;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: center;

  ${({ theme, $status }) => {
    switch ($status) {
      case "current":
        return css`
          background: ${theme.colors.action.primary.default};
          color: ${theme.colors.inverse.content.primary};
          border: 1px solid ${theme.colors.action.primary.default};
        `;
      case "completed":
        return css`
          background: ${theme.colors.surface.primary};
          color: ${theme.colors.action.primary.default};
          border: 1px solid ${theme.colors.action.primary.default};
        `;
      case "error":
        return css`
          background: ${theme.colors.surface.primary};
          color: ${theme.colors.feedback.error};
          border: 1px solid ${theme.colors.feedback.error};
        `;
      case "upcoming":
      default:
        return css`
          background: ${theme.colors.surface.primary};
          color: ${theme.colors.content.quintary};
          border: 1px solid ${theme.colors.content.quintary};
        `;
    }
  }}

  svg {
    display: block;
    width: 12px;
    height: 12px;
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

type StepIconProps = {
  status: StepStatus;
  stepNumber: number;
};

export function StepIcon({ status, stepNumber }: StepIconProps) {
  return (
    <IconRoot $status={status} aria-hidden>
      {status === "completed" ? (
        <CheckmarkIcon />
      ) : status === "error" ? (
        <XIcon />
      ) : (
        stepNumber
      )}
    </IconRoot>
  );
}

export function Stepper({
  steps,
  currentStep = 0,
  errorSteps = [],
  className,
  "aria-label": ariaLabel,
}: StepperProps) {
  const { t } = useTranslation();
  const label = ariaLabel ?? t("form.stepper.label");

  return (
    <List className={className} aria-label={label}>
      {steps.map((step, index) => {
        const status = resolveStatus(
          index,
          currentStep,
          errorSteps,
          step.status,
        );
        const isLast = index === steps.length - 1;
        const stepNumber = index + 1;
        const showTail = !isLast;

        return (
          <Item
            key={step.id}
            $isLast={isLast}
            aria-current={status === "current" ? "step" : undefined}
          >
            <StepIcon status={status} stepNumber={stepNumber} />
            <Label $status={status}>{step.label}</Label>
            <VisuallyHidden>
              {`, ${t(`form.stepper.status.${status}`)}`}
            </VisuallyHidden>
            {showTail ? <Tail aria-hidden /> : null}
          </Item>
        );
      })}
    </List>
  );
}
