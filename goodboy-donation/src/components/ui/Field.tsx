"use client";

import styled from "styled-components";

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  min-width: 0;
`;

export const FieldLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.sm.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.text.sm.letterSpacing}px;
`;

export const OptionalMark = styled.span`
  color: ${({ theme }) => theme.colors.content.quaternary};
`;

export const FieldError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.feedback.error};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
`;

export const FieldsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[32]}px;
  width: 100%;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
