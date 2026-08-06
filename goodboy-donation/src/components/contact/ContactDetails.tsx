"use client";

import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MailIcon from "@/assets/icons/mail.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import PinIcon from "@/assets/icons/pin.svg";
import { contactDetails } from "@/config/contact";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[32]}px;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMaxWidth}px;
  margin-inline: auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[16]}px;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[20]}px;
  min-width: 0;
  text-align: center;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space[12]}px;
    text-align: left;
  }
`;

const FeaturedIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.featuredIcon}px;
  background: ${({ theme }) => theme.colors.action.primary.bg10};
  color: ${({ theme }) => theme.colors.action.primary.default};

  svg {
    display: block;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[20]}px;
  min-width: 0;
  width: 100%;

  @media (max-width: 900px) {
    align-items: flex-start;
    gap: ${({ theme }) => theme.space[8]}px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
  width: 100%;

  @media (max-width: 900px) {
    align-items: flex-start;
    gap: ${({ theme }) => theme.space[4]}px;
  }
`;

const CardTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.xl.size}px;
  font-weight: ${({ theme }) => theme.typography.text.xl.weight};
  line-height: ${({ theme }) => theme.typography.text.xl.lineHeight}px;
`;

const SupportingText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
`;

const CardLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  min-height: 32px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.link}px;
  color: ${({ theme }) => theme.colors.action.primary.default};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: center;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.action.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.action.primary.default};
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    justify-content: flex-start;
    text-align: left;
    padding-inline: 0;
  }
`;

const CardValue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  min-height: 32px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.link}px;
  color: ${({ theme }) => theme.colors.action.primary.default};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: center;

  @media (max-width: 900px) {
    justify-content: flex-start;
    text-align: left;
    padding-inline: 0;
  }
`;

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type ContactCard = {
  id: "email" | "office" | "phone";
  icon: IconComponent;
  href?: string;
  value: string;
};

const cards: ContactCard[] = [
  {
    id: "email",
    icon: MailIcon,
    href: `mailto:${contactDetails.email}`,
    value: contactDetails.email,
  },
  {
    id: "office",
    icon: PinIcon,
    value: contactDetails.address,
  },
  {
    id: "phone",
    icon: PhoneIcon,
    href: contactDetails.phoneHref,
    value: contactDetails.phone,
  },
];

export function ContactDetails() {
  const { t } = useTranslation();

  return (
    <Grid>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.id}>
            <FeaturedIcon>
              <Icon width={24} height={24} aria-hidden />
            </FeaturedIcon>
            <CardBody>
              <TextBlock>
                <CardTitle>
                  {t(`pages.contact.cards.${card.id}.title`)}
                </CardTitle>
                <SupportingText>
                  {t(`pages.contact.cards.${card.id}.description`)}
                </SupportingText>
              </TextBlock>
              {card.href ? (
                <CardLink href={card.href}>{card.value}</CardLink>
              ) : (
                <CardValue>{card.value}</CardValue>
              )}
            </CardBody>
          </Card>
        );
      })}
    </Grid>
  );
}
