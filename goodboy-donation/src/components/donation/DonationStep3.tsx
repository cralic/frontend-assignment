"use client";

import { useId } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  DonationStepShell,
  StepSubtitle,
} from "@/components/donation/DonationStepShell";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldError, FieldGroup } from "@/components/ui/Field";
import { useDonationFormStore } from "@/store/donationForm";

const Summary = styled(FieldGroup)`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

const RowLabel = styled.span`
  flex: 0 1 auto;
  color: ${({ theme }) => theme.colors.content.secondary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;
`;

const RowValue = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  text-align: right;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 600;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;
  overflow-wrap: anywhere;
`;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.space[16]}px 0;

  &::after {
    content: "";
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.content.quintary};
  }
`;

const ConsentField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]}px;
  width: 100%;
`;

function formatAmount(amount: number | null, currency: string) {
  if (amount == null) return `0 ${currency}`;
  return `${amount} ${currency}`;
}

function formatFullName(firstName: string, lastName: string) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}

export function DonationStep3() {
  const { t } = useTranslation();
  const consentId = useId();
  const consentErrorId = useId();
  const { values, patchValues, step3Errors } = useDonationFormStore();

  const fullName = formatFullName(values.firstName, values.lastName);

  return (
    <DonationStepShell currentStep={2} title={t("form.step3.title")}>
      <Summary>
        <StepSubtitle>{t("form.step3.subtitle")}</StepSubtitle>

        <Row>
          <RowLabel>{t("form.step3.summary.helpType")}</RowLabel>
          <RowValue>
            {t(`form.step3.summary.helpTypeValue.${values.helpType}`)}
          </RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.shelter")}</RowLabel>
          <RowValue>{values.shelterName.trim() || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.amount")}</RowLabel>
          <RowValue>
            {formatAmount(values.amount, t("form.step1.amount.currency"))}
          </RowValue>
        </Row>

        <Divider aria-hidden />

        <Row>
          <RowLabel>{t("form.step3.summary.name")}</RowLabel>
          <RowValue>{fullName || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.email")}</RowLabel>
          <RowValue>{values.email.trim() || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.phone")}</RowLabel>
          <RowValue>{values.phone.trim() || "-"}</RowValue>
        </Row>

        <Divider aria-hidden />

        <ConsentField>
          <Checkbox
            id={consentId}
            checked={values.consent}
            invalid={Boolean(step3Errors.consent)}
            aria-describedby={
              step3Errors.consent ? consentErrorId : undefined
            }
            label={t("form.step3.consent.label")}
            onCheckedChange={(checked) => patchValues({ consent: checked })}
          />
          {step3Errors.consent ? (
            <FieldError id={consentErrorId} role="alert">
              {t("form.step3.consent.required")}
            </FieldError>
          ) : null}
        </ConsentField>
      </Summary>
    </DonationStepShell>
  );
}
