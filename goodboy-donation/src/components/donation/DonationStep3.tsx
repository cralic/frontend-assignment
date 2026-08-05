"use client";

import { useId } from "react";
import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  DonationStepShell,
  StepSubtitle,
} from "@/components/donation/DonationStepShell";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldError, FieldGroup } from "@/components/ui/Field";
import type { DonationFormValues } from "@/lib/donationSchema";

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

function formatAmount(amount: number, currency: string) {
  return `${amount} ${currency}`;
}

function formatFullName(firstName: string, lastName: string) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}

export function DonationStep3() {
  const { t } = useTranslation();
  const consentId = useId();
  const consentErrorId = useId();
  const { control, clearErrors } = useFormContext<DonationFormValues>();
  const { errors } = useFormState({ control });

  const values = useWatch({ control });
  const fullName = formatFullName(
    values.firstName ?? "",
    values.lastName ?? "",
  );

  return (
    <DonationStepShell currentStep={2} title={t("form.step3.title")}>
      <Summary>
        <StepSubtitle>{t("form.step3.subtitle")}</StepSubtitle>

        <Row>
          <RowLabel>{t("form.step3.summary.helpType")}</RowLabel>
          <RowValue>
            {t(
              `form.step3.summary.helpTypeValue.${values.helpType ?? "foundation"}`,
            )}
          </RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.shelter")}</RowLabel>
          <RowValue>{values.shelterName?.trim() || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.amount")}</RowLabel>
          <RowValue>
            {formatAmount(
              values.amount ?? 0,
              t("form.step1.amount.currency"),
            )}
          </RowValue>
        </Row>

        <Divider aria-hidden />

        <Row>
          <RowLabel>{t("form.step3.summary.name")}</RowLabel>
          <RowValue>{fullName || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.email")}</RowLabel>
          <RowValue>{values.email?.trim() || "-"}</RowValue>
        </Row>

        <Row>
          <RowLabel>{t("form.step3.summary.phone")}</RowLabel>
          <RowValue>{values.phone?.trim() || "-"}</RowValue>
        </Row>

        <Divider aria-hidden />

        <ConsentField>
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id={consentId}
                checked={field.value}
                invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? consentErrorId : undefined
                }
                label={t("form.step3.consent.label")}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  clearErrors("consent");
                }}
              />
            )}
          />
          {errors.consent?.message ? (
            <FieldError id={consentErrorId} role="alert">
              {t(errors.consent.message)}
            </FieldError>
          ) : null}
        </ConsentField>
      </Summary>
    </DonationStepShell>
  );
}
