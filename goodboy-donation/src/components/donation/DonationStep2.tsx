"use client";

import { useId } from "react";
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
import { useDonationFormStore } from "@/store/donationForm";

export function DonationStep2() {
  const { t } = useTranslation();
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const firstNameErrorId = useId();
  const lastNameErrorId = useId();
  const emailErrorId = useId();
  const { values, patchValues, step2Errors } = useDonationFormStore();

  return (
    <DonationStepShell currentStep={1} title={t("form.step2.title")}>
      <FieldGroup>
        <StepSubtitle>{t("form.step2.subtitle")}</StepSubtitle>

        <FieldRow>
          <InputField>
            <FieldLabel htmlFor={firstNameId}>
              {t("form.step2.firstName.label")}
            </FieldLabel>
            <TextInput
              id={firstNameId}
              type="text"
              autoComplete="given-name"
              value={values.firstName}
              placeholder={t("form.step2.firstName.placeholder")}
              aria-invalid={Boolean(step2Errors.firstName) || undefined}
              aria-describedby={
                step2Errors.firstName ? firstNameErrorId : undefined
              }
              onChange={(event) =>
                patchValues({ firstName: event.target.value })
              }
            />
            {step2Errors.firstName ? (
              <FieldError id={firstNameErrorId} role="alert">
                {t("form.step2.firstName.invalid")}
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
              value={values.lastName}
              placeholder={t("form.step2.lastName.placeholder")}
              aria-required
              aria-invalid={Boolean(step2Errors.lastName) || undefined}
              aria-describedby={
                step2Errors.lastName ? lastNameErrorId : undefined
              }
              onChange={(event) =>
                patchValues({ lastName: event.target.value })
              }
            />
            {step2Errors.lastName ? (
              <FieldError id={lastNameErrorId} role="alert">
                {t("form.step2.lastName.required")}
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
            value={values.email}
            placeholder={t("form.step2.email.placeholder")}
            aria-required
            aria-invalid={Boolean(step2Errors.email) || undefined}
            aria-describedby={step2Errors.email ? emailErrorId : undefined}
            onChange={(event) => patchValues({ email: event.target.value })}
          />
          {step2Errors.email ? (
            <FieldError id={emailErrorId} role="alert">
              {t("form.step2.email.required")}
            </FieldError>
          ) : null}
        </InputField>

        <PhoneField
          id="donation-phone"
          label={t("form.step2.phone.label")}
          countryLabel={t("form.step2.phone.countryLabel")}
          placeholder={t("form.step2.phone.placeholder")}
          country={values.phoneCountry}
          onCountryChange={(phoneCountry: PhoneCountryCode) =>
            patchValues({ phoneCountry })
          }
          value={values.phone}
          onValueChange={(phone) => patchValues({ phone })}
          aria-required
          error={
            step2Errors.phone ? t("form.step2.phone.required") : undefined
          }
        />
      </FieldGroup>
    </DonationStepShell>
  );
}
