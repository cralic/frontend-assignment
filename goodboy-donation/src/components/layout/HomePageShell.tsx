"use client";

import styled from "styled-components";
import { SiteFooter } from "@/components/layout/SiteFooter";

const Page = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: ${({ theme }) => theme.layout.home.columnGap}px;
  width: 100%;
  min-height: 100%;
  padding: ${({ theme }) => theme.space[20]}px;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.space[32]}px;
    padding: ${({ theme }) => theme.space[32]}px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.home.contentWidth}px;
  min-height: calc(100vh - ${({ theme }) => theme.space[20] * 2}px);
  padding-block: ${({ theme }) => theme.space[60]}px;

  @media (max-width: 1100px) {
    max-width: none;
    min-height: auto;
  }
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[40]}px;
  width: 100%;
`;

const HeroImage = styled.div`
  flex-shrink: 0;
  width: ${({ theme }) => theme.layout.home.imageWidth}px;
  max-width: 100%;
  height: ${({ theme }) => theme.layout.home.imageHeight}px;
  max-height: calc(100vh - ${({ theme }) => theme.space[20] * 2}px);
  border-radius: ${({ theme }) => theme.radius.image}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1100px) {
    width: 100%;
    height: 280px;
    order: -1;
  }
`;

type HomePageShellProps = {
  children: React.ReactNode;
  actions?: React.ReactNode;
  image?: React.ReactNode;
};

export function HomePageShell({ children, actions, image }: HomePageShellProps) {
  return (
    <Page>
      <Content>
        <Main>{children}</Main>
        <FooterBlock>
          {actions}
          <SiteFooter showSocials />
        </FooterBlock>
      </Content>
      <HeroImage>{image}</HeroImage>
    </Page>
  );
}
