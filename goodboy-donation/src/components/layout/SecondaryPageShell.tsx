"use client";

import styled from "styled-components";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackLink } from "@/components/ui/BackLink";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth}px;
  min-height: 100vh;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.space[60]}px;
  box-sizing: border-box;

  @media (max-width: 1280px) {
    padding-inline: ${({ theme }) => theme.space[32]}px;
  }

  @media (max-width: 900px) {
    padding-block: ${({ theme }) => theme.space[32]}px;
    padding-inline: ${({ theme }) => theme.space[20]}px;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.space[40]}px;
  padding-bottom: ${({ theme }) => theme.space[40]}px;
`;

const Header = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.typography.heading.page.size}px;
  font-weight: ${({ theme }) => theme.typography.heading.page.weight};
  line-height: ${({ theme }) => theme.typography.heading.page.lineHeight}px;
  letter-spacing: ${({ theme }) =>
    theme.typography.heading.page.letterSpacing}px;
`;

type SecondaryPageShellProps = {
  title: string;
  backHref?: string;
  children?: React.ReactNode;
};

export function SecondaryPageShell({
  title,
  backHref = "/",
  children,
}: SecondaryPageShellProps) {
  return (
    <Main>
      <Content>
        <Header>
          <BackLink href={backHref} />
          <Title>{title}</Title>
        </Header>
        {children}
      </Content>
      <SiteFooter />
    </Main>
  );
}
