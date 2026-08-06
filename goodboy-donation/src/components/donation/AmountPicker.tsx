"use client";

import { useId } from "react";
import styled from "styled-components";
import CurrencyEuro from "@/assets/icons/currency-euro.svg";
import { Button } from "@/components/ui/Button";
import { DONATION_AMOUNT_PRESETS } from "@/config/donation";

type AmountPickerProps = {
  value: number | null;
  onChange: (value: number | null) => void;
  title: string;
  inputLabel: string;
  currency: string;
  error?: string;
  id?: string;
  className?: string;
};

const Section = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
`;

const Legend = styled.legend`
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 600;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const AmountField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;
`;

const Input = styled.div<{ $invalid?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[10]}px;
  height: 92px;
  padding: ${({ theme }) =>
    `${theme.space[10]}px ${theme.space[32]}px`};
  border-bottom: 2px solid
    ${({ theme, $invalid }) =>
      $invalid
        ? theme.colors.feedback.error
        : theme.colors.action.primary.default};
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  margin: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.feedback.error};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
  text-align: center;
`;

const CustomInput = styled.input<{ $empty: boolean; $digits: number }>`
  width: ${({ $digits }) => `${Math.max($digits, 1)}ch`};
  min-width: 1ch;
  border: 0;
  background: transparent;
  color: ${({ theme, $empty }) =>
    $empty
      ? theme.colors.content.quaternary
      : theme.colors.content.primary};
  caret-color: ${({ theme }) => theme.colors.content.top};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.heading.xl.size}px;
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.heading.xl.lineHeight}px;
  letter-spacing: ${({ theme }) =>
    theme.typography.heading.xl.letterSpacing}px;
  text-align: right;
  outline: none;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &:focus-visible {
    outline: none;
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.space[24]}px;
  color: ${({ theme }) => theme.colors.content.primary};

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const Presets = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PresetButton = styled(Button)`
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;
`;

export function AmountPicker({
  value,
  onChange,
  title,
  inputLabel,
  currency,
  error,
  id,
  className,
}: AmountPickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const amount = value ?? 0;
  const isEmpty = amount === 0;
  const displayValue = String(amount);
  const errorId = `${inputId}-error`;

  return (
    <Section className={className}>
      <Legend>{title}</Legend>

      <Container>
        <AmountField>
          <Input $invalid={Boolean(error)}>
            <CustomInput
              id={inputId}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={displayValue}
              $empty={isEmpty}
              $digits={displayValue.length}
              aria-label={inputLabel}
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => {
                const next = event.target.value.replace(/\D/g, "");
                onChange(next ? Number(next) : 0);
              }}
            />
            <IconWrap aria-hidden>
              <CurrencyEuro />
            </IconWrap>
          </Input>

          {error ? (
            <ErrorText id={errorId} role="alert">
              {error}
            </ErrorText>
          ) : null}
        </AmountField>

        <Presets role="group" aria-label={title}>
          {DONATION_AMOUNT_PRESETS.map((preset) => {
            const active = amount === preset;
            return (
              <PresetButton
                key={preset}
                type="button"
                variant={active ? "primary" : "secondary"}
                aria-pressed={active}
                onClick={() => onChange(preset)}
              >
                {preset} {currency}
              </PresetButton>
            );
          })}
        </Presets>
      </Container>
    </Section>
  );
}
