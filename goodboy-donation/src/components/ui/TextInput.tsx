"use client";

import { forwardRef } from "react";
import styled from "styled-components";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
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
  letter-spacing: ${({ theme }) => theme.typography.text.md.letterSpacing}px;
  outline: none;
  transition: background-color 150ms ease, border-color 150ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.quaternary};
  }

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

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.feedback.error};
  }
`;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return <StyledInput ref={ref} {...props} />;
  },
);
