"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";

const Body = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[64]}px;
  width: 100%;
  min-height: 0;
`;

const HeroImage = styled.div`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contact.imageWidth}px;
  min-height: 30vh;
  margin-inline: auto;
  border-radius: ${({ theme }) => theme.radius.image}px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 40%;
  }
`;

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell title={t("pages.contact.title")}>
      <Body>
        <ContactDetails />
        <HeroImage>
          <img src="/images/contact-hero.png" alt={t("pages.contact.heroAlt")} />
        </HeroImage>
      </Body>
    </SecondaryPageShell>
  );
}
