"use client";

import { useId } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  DonationStepShell,
  StepSubtitle,
} from "@/components/donation/DonationStepShell";
import { PhoneField } from "@/components/donation/PhoneField";
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldRow,
  InputField,
} from "@/components/ui/Field";
import { TextInput } from "@/components/ui/TextInput";
import type { PhoneCountryCode } from "@/config/donation";
import { withPhoneDial } from "@/lib/phone";
import type { DonationFormValues } from "@/lib/donationSchema";

export function DonationStep2() {
  const { t } = useTranslation();
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const firstNameErrorId = useId();
  const lastNameErrorId = useId();
  const emailErrorId = useId();
  const { register, control, setValue, clearErrors } =
    useFormContext<DonationFormValues>();
  const { errors } = useFormState({ control });

  return (
    <DonationStepShell currentStep={1} title={t("form.step2.title")}>
      <FieldGroup>
        <StepSubtitle>{t("form.step2.subtitle")}</StepSubtitle>

        <FieldRow>
          {/*
            First name: assignment says optional (2–20 when filled).
            Figma has no “(optional)” marker, so the label stays unmarked.
            The contribute API still rejects an empty firstName so we keep FE
            optional per the brief and surface API errors on submit.
          */}
          <InputField>
            <FieldLabel htmlFor={firstNameId}>
              {t("form.step2.firstName.label")}
            </FieldLabel>
            <TextInput
              id={firstNameId}
              type="text"
              autoComplete="given-name"
              placeholder={t("form.step2.firstName.placeholder")}
              aria-invalid={Boolean(errors.firstName) || undefined}
              aria-describedby={
                errors.firstName ? firstNameErrorId : undefined
              }
              {...register("firstName", {
                onChange: () => clearErrors("firstName"),
              })}
            />
            {errors.firstName?.message ? (
              <FieldError id={firstNameErrorId} role="alert">
                {t(errors.firstName.message)}
              </FieldError>
            ) : null}
          </InputField>

          <InputField>
            <FieldLabel htmlFor={lastNameId}>
              {t("form.step2.lastName.label")}
            </FieldLabel>
            <TextInput
              id={lastNameId}
              type="text"
              autoComplete="family-name"
              placeholder={t("form.step2.lastName.placeholder")}
              aria-required
              aria-invalid={Boolean(errors.lastName) || undefined}
              aria-describedby={
                errors.lastName ? lastNameErrorId : undefined
              }
              {...register("lastName", {
                onChange: () => clearErrors("lastName"),
              })}
            />
            {errors.lastName?.message ? (
              <FieldError id={lastNameErrorId} role="alert">
                {t(errors.lastName.message)}
              </FieldError>
            ) : null}
          </InputField>
        </FieldRow>

        <InputField>
          <FieldLabel htmlFor={emailId}>
            {t("form.step2.email.label")}
          </FieldLabel>
          <TextInput
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder={t("form.step2.email.placeholder")}
            aria-required
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            {...register("email", {
              onChange: () => clearErrors("email"),
            })}
          />
          {errors.email?.message ? (
            <FieldError id={emailErrorId} role="alert">
              {t(errors.email.message)}
            </FieldError>
          ) : null}
        </InputField>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Controller
              name="phoneCountry"
              control={control}
              render={({ field: countryField }) => (
                <PhoneField
                  id="donation-phone"
                  label={t("form.step2.phone.label")}
                  countryLabel={t("form.step2.phone.countryLabel")}
                  placeholder={t("form.step2.phone.placeholder")}
                  country={countryField.value}
                  onCountryChange={(phoneCountry: PhoneCountryCode) => {
                    countryField.onChange(phoneCountry);
                    setValue("phone", withPhoneDial(field.value, phoneCountry), {
                      shouldDirty: true,
                    });
                    clearErrors("phone");
                  }}
                  value={field.value}
                  onValueChange={(phone) => {
                    field.onChange(phone);
                    clearErrors("phone");
                  }}
                  aria-required
                  error={
                    errors.phone?.message
                      ? t(errors.phone.message)
                      : undefined
                  }
                />
              )}
            />
          )}
        />
      </FieldGroup>
    </DonationStepShell>
  );
}
