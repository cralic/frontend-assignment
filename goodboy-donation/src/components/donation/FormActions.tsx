"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import { Button } from "@/components/ui/Button";

type FormActionsProps = {
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  showContinueArrow?: boolean;
  showBack?: boolean;
  continueDisabled?: boolean;
  continueType?: "button" | "submit";
  className?: string;
};

const Actions = styled.div<{ $showBack: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $showBack }) =>
    $showBack ? "space-between" : "flex-end"};
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

export function FormActions({
  onBack,
  onContinue,
  continueLabel,
  showContinueArrow = true,
  showBack = true,
  continueDisabled,
  continueType = "button",
  className,
}: FormActionsProps) {
  const { t } = useTranslation();

  return (
    <Actions className={className} $showBack={showBack}>
      {showBack ? (
        <Button variant="secondary" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden />
          {t("form.actions.back")}
        </Button>
      ) : null}
      <Button
        variant="primary"
        type={continueType}
        onClick={onContinue}
        disabled={continueDisabled}
      >
        {continueLabel ?? t("form.actions.continue")}
        {showContinueArrow ? <ArrowRight aria-hidden /> : null}
      </Button>
    </Actions>
  );
}
