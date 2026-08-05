"use client";

import styled from "styled-components";
import { SiteFooter } from "@/components/layout/SiteFooter";

const Page = styled.main`
  display: flex;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth}px;
  min-height: 100vh;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.space[20]}px;
  padding-left: ${({ theme }) => theme.space[80]}px;
  padding-right: ${({ theme }) => theme.space[20]}px;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    padding: ${({ theme }) => theme.space[32]}px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.layout.home.columnGap}px;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.space[20] * 2}px);

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.space[32]}px;
    min-height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 ${({ theme }) => theme.layout.home.contentWidth}px;
  width: ${({ theme }) => theme.layout.home.contentWidth}px;
  max-width: 100%;
  padding-block: ${({ theme }) => theme.space[40]}px;

  @media (max-width: 1100px) {
    flex: 1 1 auto;
    width: 100%;
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
  flex: 1 1 0;
  min-width: 0;
  align-self: stretch;
  max-height: calc(100vh - ${({ theme }) => theme.space[20] * 2}px);
  border-radius: ${({ theme }) => theme.radius.image}px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1100px) {
    flex: 0 0 auto;
    width: 100%;
    height: 40vh;
    max-height: 40vh;
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
      <Container>
        <Content>
          <Main>{children}</Main>
          <FooterBlock>
            {actions}
            <SiteFooter showSocials />
          </FooterBlock>
        </Content>
        <HeroImage>{image}</HeroImage>
      </Container>
    </Page>
  );
}
