"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";
import { contactHero } from "@/config/contact";

const Body = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[64]}px;
  width: 100%;
  min-height: 0;

  @media (max-width: 900px) {
    gap: ${({ theme }) => theme.space[32]}px;
  }
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
`;

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell title={t("pages.contact.title")}>
      <Body>
        <ContactDetails />
        <HeroImage>
          <Image
            src={contactHero.src}
            alt={t("pages.contact.heroAlt")}
            fill
            sizes={contactHero.sizes}
            priority
            fetchPriority="high"
            style={{ objectFit: "cover", objectPosition: "50% 40%" }}
          />
        </HeroImage>
      </Body>
    </SecondaryPageShell>
  );
}
