"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AboutStats } from "@/components/about/AboutStats";
import { SecondaryPageShell } from "@/components/layout/SecondaryPageShell";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const Paragraph = styled.p`
  margin: 0;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
`;

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <SecondaryPageShell title={t("pages.about.title")}>
      <Body>
        <Paragraph>{t("pages.about.intro")}</Paragraph>
        <AboutStats />
        <Paragraph>{t("pages.about.closing")}</Paragraph>
      </Body>
    </SecondaryPageShell>
  );
}
