"use client";

import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[8]}px;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.space[12]}px ${theme.space[24]}px`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.control}px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  svg {
    display: block;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  ${({ theme, $variant }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.action.primary.default};
          color: ${theme.colors.inverse.content.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.action.primary.hover};
          }

          &:active:not(:disabled) {
            background: ${theme.colors.action.primary.active};
          }
        `
      : css`
          background: ${theme.colors.action.secondary.default};
          color: ${theme.colors.action.secondary.text};

          &:hover:not(:disabled) {
            background: ${theme.colors.surface.muted};
          }
        `}
`;

export function Button({
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return <StyledButton $variant={variant} type={type} {...props} />;
}
