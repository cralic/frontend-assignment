"use client";

import styled from "styled-components";
import { SiteFooter } from "@/components/layout/SiteFooter";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth}px;
  min-height: 100%;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.space[60]}px;
  padding-inline: ${({ theme }) => theme.space[32]}px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.space[40]}px;
  padding-bottom: ${({ theme }) => theme.space[40]}px;
`;

type SecondaryPageShellProps = {
  children: React.ReactNode;
};

export function SecondaryPageShell({ children }: SecondaryPageShellProps) {
  return (
    <Main>
      <Content>{children}</Content>
      <SiteFooter />
    </Main>
  );
}
