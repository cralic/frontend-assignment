"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";
import ChevronDown from "@/assets/icons/chevron-down.svg";
import ChevronUp from "@/assets/icons/chevron-up.svg";
import Checkmark from "@/assets/icons/checkmark.svg";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  clearLabel?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  disabled?: boolean;
  className?: string;
};

const CLEAR_VALUE = "__clear__";

const Trigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;
  min-height: 56px;
  padding: ${({ theme }) => theme.space[16]}px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  color: ${({ theme }) => theme.colors.content.primary};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.muted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.content.quaternary};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.feedback.error};
  }

  svg {
    display: block;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.content.quaternary};
  }
`;

const Value = styled(SelectPrimitive.Value)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled(SelectPrimitive.Content)`
  overflow: hidden;
  z-index: 50;
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.primary};
  box-shadow: 0 8px 24px rgb(17 24 39 / 12%);
`;

const Viewport = styled(SelectPrimitive.Viewport)`
  padding: ${({ theme }) => theme.space[8]}px;
`;

const Item = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  min-height: 40px;
  padding: ${({ theme }) => `${theme.space[8]}px ${theme.space[12]}px`};
  padding-right: ${({ theme }) => theme.space[32]}px;
  border-radius: ${({ theme }) => theme.radius.control}px;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.surface.tertiary};
  }

  &[data-state="checked"] {
    color: ${({ theme }) => theme.colors.action.primary.default};
  }
`;

const ClearItem = styled(Item)`
  color: ${({ theme }) => theme.colors.content.tertiary};

  &[data-highlighted] {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &[data-state="checked"] {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`;

const ItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  right: ${({ theme }) => theme.space[12]}px;
  display: inline-flex;
  color: ${({ theme }) => theme.colors.action.primary.default};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  color: ${({ theme }) => theme.colors.content.quaternary};
  cursor: default;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  clearLabel,
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  disabled,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value ?? ""}
      onValueChange={(next) => {
        onValueChange(next === CLEAR_VALUE ? "" : next);
      }}
      disabled={disabled}
    >
      <Trigger
        id={id}
        className={className}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
      >
        <Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown aria-hidden />
        </SelectPrimitive.Icon>
      </Trigger>

      <SelectPrimitive.Portal>
        <Content position="popper" sideOffset={4}>
          <SelectPrimitive.ScrollUpButton asChild>
            <ScrollButton>
              <ChevronUp aria-hidden />
            </ScrollButton>
          </SelectPrimitive.ScrollUpButton>
          <Viewport>
            {clearLabel ? (
              <ClearItem value={CLEAR_VALUE}>
                <SelectPrimitive.ItemText>{clearLabel}</SelectPrimitive.ItemText>
              </ClearItem>
            ) : null}
            {options.map((option) => (
              <Item key={option.value} value={option.value}>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <ItemIndicator>
                  <Checkmark aria-hidden />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
          <SelectPrimitive.ScrollDownButton asChild>
            <ScrollButton>
              <ChevronDown aria-hidden />
            </ScrollButton>
          </SelectPrimitive.ScrollDownButton>
        </Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
