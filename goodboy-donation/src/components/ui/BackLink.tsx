"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ArrowNarrowLeft from "@/assets/icons/arrow-narrow-left.svg";

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  height: 32px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.link}px;
  color: ${({ theme }) => theme.colors.action.primary.default};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.action.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  svg {
    display: block;
    flex-shrink: 0;
    transition: transform 150ms ease;
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }

    &:hover svg {
      transform: none;
    }
  }
`;

type BackLinkProps = {
  href?: string;
  className?: string;
};

export function BackLink({ href = "/", className }: BackLinkProps) {
  const { t } = useTranslation();

  return (
    <Back href={href} className={className}>
      <ArrowNarrowLeft width={16} height={16} aria-hidden />
      {t("nav.back")}
    </Back>
  );
}
