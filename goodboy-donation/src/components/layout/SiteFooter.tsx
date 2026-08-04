"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Logo from "@/assets/logo.svg";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social";
import { socialLinks } from "@/config/socials";

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding-top: ${({ theme }) => theme.space[24]}px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[32]}px;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[16]}px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.content.quaternary};
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
    border-radius: 2px;
  }

  svg {
    display: block;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-size: ${({ theme }) => theme.typography.text.body.size}px;
  font-weight: ${({ theme }) => theme.typography.text.body.weight};
  line-height: ${({ theme }) => theme.typography.text.body.lineHeight}px;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.action.primary.default};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const socialIcons = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
} as const;

type SiteFooterProps = {
    className?: string;
    showSocials?: boolean;
};

export function SiteFooter({ className, showSocials = false }: SiteFooterProps) {
    const { t } = useTranslation();

    return (
        <Footer className={className}>
            <BrandLink href="/" aria-label={t("app.title")}>
                <Logo width={124} height={32} role="img" aria-label={t("app.title")} />
            </BrandLink>

            <RightContent>
                {showSocials ? (
                    <Socials>
                        {socialLinks.map((item) => {
                            const Icon = socialIcons[item.id];
                            return (
                                <SocialLink
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                >
                                    <Icon width={16} height={16} aria-hidden />
                                </SocialLink>
                            );
                        })}
                    </Socials>
                ) : null}
                <NavLink href="/contact">{t("nav.contact")}</NavLink>
                <NavLink href="/about">{t("nav.about")}</NavLink>
            </RightContent>
        </Footer>
    );
}
