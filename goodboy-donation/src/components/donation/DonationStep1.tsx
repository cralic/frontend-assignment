"use client";

import { useId } from "react";
import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AmountPicker } from "@/components/donation/AmountPicker";
import {
  DonationStepShell,
  StepSubtitle,
} from "@/components/donation/DonationStepShell";
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldsStack,
  InputField,
  OptionalMark,
} from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import type { HelpType } from "@/config/donation";
import { useShelters } from "@/hooks/shelters";
import type { DonationFormValues } from "@/lib/donationSchema";

export function DonationStep1() {
  const { t } = useTranslation();
  const shelterLabelId = useId();
  const shelterStatusId = useId();
  const shelterErrorId = useId();
  const { data, isPending, isError } = useShelters();
  const { control, setValue, clearErrors } =
    useFormContext<DonationFormValues>();
  const { errors } = useFormState({ control });

  const helpType = useWatch({ control, name: "helpType" });
  const shelterRequired = helpType === "shelter";
  const shelterOptions = (data?.shelters ?? []).map((shelter) => ({
    value: String(shelter.id),
    label: shelter.name,
  }));
  const shelterDescribedBy =
    [
      isError ? shelterStatusId : null,
      errors.shelterId ? shelterErrorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <DonationStepShell currentStep={0} title={t("form.step1.title")}>
      <FieldsStack>
        <Controller
          name="helpType"
          control={control}
          render={({ field }) => (
            <SegmentedControl
              aria-label={t("form.step1.helpType.label")}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as HelpType);
                clearErrors("shelterId");
              }}
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
          )}
        />

        <FieldGroup>
          <StepSubtitle>{t("form.step1.subtitle")}</StepSubtitle>

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
            <Controller
              name="shelterId"
              control={control}
              render={({ field }) => (
                <Select
                  id="donation-shelter"
                  aria-labelledby={shelterLabelId}
                  aria-describedby={shelterDescribedBy}
                  aria-required={shelterRequired}
                  aria-invalid={Boolean(errors.shelterId)}
                  disabled={isPending || isError}
                  value={field.value}
                  onValueChange={(shelterId) => {
                    const shelter = data?.shelters.find(
                      (item) => String(item.id) === shelterId,
                    );
                    field.onChange(shelterId);
                    setValue("shelterName", shelter?.name ?? "", {
                      shouldDirty: true,
                    });
                    clearErrors("shelterId");
                  }}
                  placeholder={
                    isPending
                      ? t("form.step1.shelter.loading")
                      : t("form.step1.shelter.placeholder")
                  }
                  clearLabel={
                    !shelterRequired && field.value
                      ? t("form.step1.shelter.clear")
                      : undefined
                  }
                  options={shelterOptions}
                />
              )}
            />
            {isError ? (
              <FieldError id={shelterStatusId} role="alert">
                {t("form.step1.shelter.error")}
              </FieldError>
            ) : null}
            {errors.shelterId?.message ? (
              <FieldError id={shelterErrorId} role="alert">
                {t(errors.shelterId.message)}
              </FieldError>
            ) : null}
          </InputField>
        </FieldGroup>

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountPicker
              id="donation-amount"
              value={field.value}
              onChange={(amount) => {
                field.onChange(amount ?? 0);
                clearErrors("amount");
              }}
              title={t("form.step1.amount.title")}
              inputLabel={t("form.step1.amount.label")}
              currency={t("form.step1.amount.currency")}
              error={
                errors.amount?.message ? t(errors.amount.message) : undefined
              }
            />
          )}
        />
      </FieldsStack>
    </DonationStepShell>
  );
}
