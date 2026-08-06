"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import styled from "styled-components";

type SegmentedOption = {
  value: string;
  label: string;
};

type SegmentedControlProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SegmentedOption[];
  "aria-label": string;
  className?: string;
};

const Root = styled(ToggleGroup.Root)`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;
  padding: ${({ theme }) => theme.space[4]}px;
  border: 1px solid ${({ theme }) => theme.colors.content.quintary};
  border-radius: ${({ theme }) => theme.radius.segmented}px;
  background: ${({ theme }) => theme.colors.surface.primary};
  box-sizing: border-box;
`;

const Thumb = styled.div<{ $index: number; $count: number }>`
  position: absolute;
  top: ${({ theme }) => theme.space[4]}px;
  bottom: ${({ theme }) => theme.space[4]}px;
  left: ${({ theme }) => theme.space[4]}px;
  z-index: 0;
  width: calc(
    (100% - ${({ theme }) => theme.space[4] * 2}px -
      ${({ theme }) => theme.space[8]}px * ${({ $count }) => $count - 1}) /
      ${({ $count }) => $count}
  );
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.action.primary.default};
  transform: translateX(
    calc(
      ${({ $index }) => $index} *
        (100% + ${({ theme }) => theme.space[8]}px)
    )
  );
  transition: transform 220ms ease;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Item = styled(ToggleGroup.Item)`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  padding: ${({ theme }) => `${theme.space[16]}px ${theme.space[8]}px`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: transparent;
  color: ${({ theme }) => theme.colors.content.primary};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.sm.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.sm.letterSpacing}px;
  text-align: center;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 220ms ease;

  &[data-state="on"] {
    color: ${({ theme }) => theme.colors.inverse.content.primary};
  }

  &:hover:not([data-state="on"]) {
    background: ${({ theme }) => theme.colors.surface.tertiary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export function SegmentedControl({
  value,
  onValueChange,
  options,
  "aria-label": ariaLabel,
  className,
}: SegmentedControlProps) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <Root
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next) onValueChange(next);
      }}
      aria-label={ariaLabel}
      className={className}
    >
      <Thumb $index={selectedIndex} $count={options.length} aria-hidden />
      {options.map((option) => (
        <Item key={option.value} value={option.value}>
          {option.label}
        </Item>
      ))}
    </Root>
  );
}
