"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type FC,
  type SVGProps,
} from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";
import ChevronDown from "@/assets/icons/chevron-down.svg";
import FlagCz from "@/assets/icons/flag-cz.svg";
import FlagSk from "@/assets/icons/flag-sk.svg";
import {
  FieldError,
  FieldLabel,
  InputField,
} from "@/components/ui/Field";
import {
  PHONE_COUNTRIES,
  type PhoneCountryCode,
} from "@/config/donation";
import {
  formatNationalPhone,
  formatPhoneDial,
  withPhoneDial,
} from "@/lib/phone";

type PhoneFieldProps = {
  label: string;
  country: PhoneCountryCode;
  onCountryChange: (country: PhoneCountryCode) => void;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  countryLabel: string;
  id?: string;
  error?: string;
  "aria-required"?: boolean;
  className?: string;
};

const FLAGS: Record<PhoneCountryCode, FC<SVGProps<SVGSVGElement>>> = {
  SK: FlagSk,
  CZ: FlagCz,
};

const ControlRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

const CountryTrigger = styled(SelectPrimitive.Trigger)`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 80px;
  min-height: 56px;
  padding: ${({ theme }) => theme.space[16]}px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  color: ${({ theme }) => theme.colors.content.primary};
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.muted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  svg {
    display: block;
    flex-shrink: 0;
  }

  > svg {
    width: 20px;
    height: 20px;
  }

  > span svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.content.quaternary};
  }
`;

const Content = styled(SelectPrimitive.Content)`
  overflow: hidden;
  z-index: 50;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.primary};
  box-shadow: 0 8px 24px rgb(17 24 39 / 12%);
`;

const Viewport = styled(SelectPrimitive.Viewport)`
  padding: ${({ theme }) => theme.space[8]}px;
`;

const Item = styled(SelectPrimitive.Item)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  min-height: 40px;
  padding: ${({ theme }) => `${theme.space[8]}px ${theme.space[12]}px`};
  border-radius: ${({ theme }) => theme.radius.control}px;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.surface.tertiary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NumberField = styled.div<{ $invalid?: boolean }>`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  min-width: 0;
  min-height: 56px;
  padding: ${({ theme }) => `0 ${theme.space[16]}px`};
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.feedback.error : "transparent"};
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface.muted};
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }
`;

const DialPrefix = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  white-space: nowrap;
`;

const NationalInput = styled.input`
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.content.primary};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.quaternary};
  }
`;

function countDigits(value: string, end: number) {
  return value.slice(0, end).replace(/\D/g, "").length;
}

function caretIndexForDigitCount(formatted: string, digitCount: number) {
  if (digitCount <= 0) return 0;

  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index]!)) {
      seen += 1;
      if (seen >= digitCount) return index + 1;
    }
  }

  return formatted.length;
}

export function PhoneField({
  label,
  country,
  onCountryChange,
  value,
  onValueChange,
  placeholder,
  countryLabel,
  id,
  error,
  "aria-required": ariaRequired,
  className,
}: PhoneFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const Flag = FLAGS[country];
  const nationalValue = formatNationalPhone(value);
  const dial = formatPhoneDial(country);

  useLayoutEffect(() => {
    const input = inputRef.current;
    const caret = caretRef.current;
    if (!input || caret == null) return;
    input.setSelectionRange(caret, caret);
    caretRef.current = null;
  }, [nationalValue]);

  function handleCountryChange(next: PhoneCountryCode) {
    onCountryChange(next);
    onValueChange(withPhoneDial(value, next));
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    const selection = event.target.selectionStart ?? raw.length;
    const digitsBeforeCaret = countDigits(raw, selection);
    const nextValue = withPhoneDial(raw, country);
    const nextNational = formatNationalPhone(nextValue);

    caretRef.current = caretIndexForDigitCount(nextNational, digitsBeforeCaret);
    onValueChange(nextValue);
  }

  return (
    <InputField className={className}>
      <FieldLabel id={labelId} htmlFor={inputId}>
        {label}
      </FieldLabel>

      <ControlRow>
        <SelectPrimitive.Root
          value={country}
          onValueChange={(next) =>
            handleCountryChange(next as PhoneCountryCode)
          }
        >
          <CountryTrigger aria-label={countryLabel}>
            <Flag aria-hidden />
            <SelectPrimitive.Icon>
              <ChevronDown aria-hidden />
            </SelectPrimitive.Icon>
          </CountryTrigger>

          <SelectPrimitive.Portal>
            <Content position="popper" sideOffset={4}>
              <Viewport>
                {PHONE_COUNTRIES.map((option) => {
                  const OptionFlag = FLAGS[option.code];
                  return (
                    <Item key={option.code} value={option.code}>
                      <OptionFlag aria-hidden />
                      <SelectPrimitive.ItemText>
                        {option.code}
                      </SelectPrimitive.ItemText>
                    </Item>
                  );
                })}
              </Viewport>
            </Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        <NumberField $invalid={Boolean(error)}>
          <DialPrefix aria-hidden>{dial}</DialPrefix>
          <NationalInput
            ref={inputRef}
            id={inputId}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={nationalValue}
            placeholder={placeholder}
            aria-labelledby={labelId}
            aria-required={ariaRequired}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={handlePhoneChange}
          />
        </NumberField>
      </ControlRow>

      {error ? (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      ) : null}
    </InputField>
  );
}
