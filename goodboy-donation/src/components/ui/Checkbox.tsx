"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import styled, { css } from "styled-components";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";

type CheckboxProps = {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  invalid?: boolean;
  disabled?: boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  className?: string;
};

const Root = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const ControlWrap = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  padding-top: 2px;
`;

const Control = styled(RadixCheckbox.Root)<{ $invalid?: boolean }>`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radius.checkbox}px;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid
        ? theme.colors.feedback.error
        : theme.colors.content.quintary};
  background: ${({ theme }) => theme.colors.surface.primary};
  color: ${({ theme }) => theme.colors.action.primary.default};
  cursor: inherit;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    color 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.action.primary.bg};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.action.primary.active};
    box-shadow: ${({ theme }) =>
      `0 0 0 2px color-mix(in srgb, ${theme.colors.action.primary.active} 24%, transparent)`};
  }

  &[data-state="checked"] {
    background: ${({ theme }) => theme.colors.action.primary.bg};
    border-color: ${({ theme, $invalid }) =>
      $invalid
        ? theme.colors.feedback.error
        : theme.colors.action.primary.default};
    color: ${({ theme, $invalid }) =>
      $invalid
        ? theme.colors.feedback.error
        : theme.colors.action.primary.default};
  }

  ${({ theme, $invalid }) =>
    $invalid &&
    css`
      border-color: ${theme.colors.feedback.error};

      &:hover:not(:disabled) {
        background: ${theme.colors.surface.primary};
      }
    `}

  svg {
    display: block;
    width: 10px;
    height: 10px;
  }
`;

const Indicator = styled(RadixCheckbox.Indicator)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const LabelText = styled.span<{ $invalid?: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  color: ${({ theme, $invalid }) =>
    $invalid
      ? theme.colors.feedback.error
      : theme.colors.content.secondary};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.sm.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.sm.letterSpacing}px;
`;

export function Checkbox({
  id,
  checked,
  onCheckedChange,
  label,
  invalid,
  disabled,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired,
  className,
}: CheckboxProps) {
  return (
    <Root className={className} $disabled={disabled}>
      <ControlWrap>
        <Control
          id={id}
          checked={checked}
          disabled={disabled}
          $invalid={invalid}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          aria-required={ariaRequired || undefined}
          onCheckedChange={(value) => onCheckedChange(value === true)}
        >
          <Indicator>
            <CheckmarkIcon />
          </Indicator>
        </Control>
      </ControlWrap>
      <LabelText $invalid={invalid}>{label}</LabelText>
    </Root>
  );
}
