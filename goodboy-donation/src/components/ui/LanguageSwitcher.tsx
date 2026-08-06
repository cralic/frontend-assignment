"use client";

import { useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ChevronDown from "@/assets/icons/chevron-down.svg";
import Checkmark from "@/assets/icons/checkmark.svg";

const STORAGE_KEY = "goodboy-language";

export const languages = [
  { code: "sk", label: "SK" },
  { code: "en", label: "EN" },
] as const;

export type AppLanguage = (typeof languages)[number]["code"];

const Trigger = styled(SelectPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  cursor: pointer;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.action.primary.default};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
    border-radius: 2px;
  }

  svg {
    display: block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  }
`;

const Content = styled(SelectPrimitive.Content)`
  z-index: 50;
  overflow: hidden;
  min-width: 88px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.control}px;
  background: ${({ theme }) => theme.colors.surface.primary};
  box-shadow: 0 8px 24px rgb(17 24 39 / 12%);
`;

const Viewport = styled(SelectPrimitive.Viewport)`
  padding: ${({ theme }) => theme.space[4]}px;
`;

const Item = styled(SelectPrimitive.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[8]}px;
  padding: ${({ theme }) => `${theme.space[8]}px ${theme.space[10]}px`};
  border-radius: ${({ theme }) => theme.radius.checkbox}px;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.sm.size}px;
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.text.sm.lineHeight}px;
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

const ItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.action.primary.default};

  svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

function isAppLanguage(value: string): value is AppLanguage {
  return languages.some((language) => language.code === value);
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const active = isAppLanguage(i18n.resolvedLanguage ?? i18n.language)
    ? (i18n.resolvedLanguage ?? i18n.language)
    : "sk";

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isAppLanguage(stored) && stored !== i18n.language) {
      void i18n.changeLanguage(stored);
    }
  }, [i18n]);

  useEffect(() => {
    document.documentElement.lang = active;
  }, [active]);

  function selectLanguage(code: string) {
    if (!isAppLanguage(code) || code === active) return;
    void i18n.changeLanguage(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  }

  return (
    <SelectPrimitive.Root value={active} onValueChange={selectLanguage}>
      <Trigger className={className} aria-label={t("nav.language")}>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDown aria-hidden />
        </SelectPrimitive.Icon>
      </Trigger>

      <SelectPrimitive.Portal>
        <Content position="popper" sideOffset={8} align="end">
          <Viewport>
            {languages.map((language) => (
              <Item key={language.code} value={language.code}>
                <SelectPrimitive.ItemText>
                  {language.label}
                </SelectPrimitive.ItemText>
                <ItemIndicator>
                  <Checkmark aria-hidden />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
        </Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
