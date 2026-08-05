"use client";

import { useId } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AmountPicker } from "@/components/donation/AmountPicker";
import { DonationStepShell } from "@/components/donation/DonationStepShell";
import {
  FieldError,
  FieldLabel,
  FieldsStack,
  InputField,
  OptionalMark,
  SectionTitle,
} from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import type { HelpType } from "@/config/donation";
import { useShelters } from "@/hooks/shelters";
import { useDonationFormStore } from "@/store/donationForm";

const ShelterSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

export function DonationStep1() {
  const { t } = useTranslation();
  const shelterLabelId = useId();
  const shelterStatusId = useId();
  const shelterErrorId = useId();
  const { data, isPending, isError } = useShelters();
  const { values, patchValues, step1Errors } = useDonationFormStore();

  const shelterRequired = values.helpType === "shelter";
  const shelterOptions = (data?.shelters ?? []).map((shelter) => ({
    value: String(shelter.id),
    label: shelter.name,
  }));
  const shelterDescribedBy = [
    isError ? shelterStatusId : null,
    step1Errors.shelterId ? shelterErrorId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <DonationStepShell currentStep={0} title={t("form.step1.title")}>
      <FieldsStack>
        <SegmentedControl
          aria-label={t("form.step1.helpType.label")}
          value={values.helpType}
          onValueChange={(value) =>
            patchValues({ helpType: value as HelpType })
          }
          options={[
            {
              value: "shelter",
              label: t("form.step1.helpType.shelter"),
            },
            {
              value: "foundation",
              label: t("form.step1.helpType.foundation"),
            },
          ]}
        />

        <ShelterSection aria-labelledby="donation-about-project">
          <SectionTitle id="donation-about-project">
            {t("form.step1.shelter.sectionTitle")}
          </SectionTitle>

          <InputField>
            <FieldLabel id={shelterLabelId} htmlFor="donation-shelter">
              {t("form.step1.shelter.label")}
              {!shelterRequired ? (
                <>
                  {" "}
                  <OptionalMark>{t("form.step1.shelter.optional")}</OptionalMark>
                </>
              ) : null}
            </FieldLabel>
            <Select
              id="donation-shelter"
              aria-labelledby={shelterLabelId}
              aria-describedby={shelterDescribedBy}
              aria-required={shelterRequired}
              aria-invalid={Boolean(step1Errors.shelterId)}
              disabled={isPending || isError}
              value={values.shelterId}
              onValueChange={(shelterId) => patchValues({ shelterId })}
              placeholder={
                isPending
                  ? t("form.step1.shelter.loading")
                  : t("form.step1.shelter.placeholder")
              }
              options={shelterOptions}
            />
            {isError ? (
              <FieldError id={shelterStatusId} role="alert">
                {t("form.step1.shelter.error")}
              </FieldError>
            ) : null}
            {step1Errors.shelterId ? (
              <FieldError id={shelterErrorId} role="alert">
                {t("form.step1.shelter.required")}
              </FieldError>
            ) : null}
          </InputField>
        </ShelterSection>

        <AmountPicker
          id="donation-amount"
          value={values.amount}
          onChange={(amount) => patchValues({ amount })}
          title={t("form.step1.amount.title")}
          inputLabel={t("form.step1.amount.label")}
          currency={t("form.step1.amount.currency")}
          error={
            step1Errors.amount ? t("form.step1.amount.required") : undefined
          }
        />
      </FieldsStack>
    </DonationStepShell>
  );
}
