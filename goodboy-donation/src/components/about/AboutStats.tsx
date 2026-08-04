"use client";

import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import LoadingIcon from "@/assets/icons/loading.svg";
import { useShelterResults } from "@/hooks/useShelterResults";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerMaxWidth}px;
  margin-inline: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[16]}px;
  width: 100%;
  padding-block: ${({ theme }) => theme.space[64]}px;
  border-top: 1px solid ${({ theme }) => theme.colors.content.quintary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.content.quintary};
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const MetricItem = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[12]}px;
  min-width: 0;
`;

const NumberAndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[12]}px;
  width: 100%;
`;

const MetricValue = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: ${({ theme }) => theme.typography.heading.xl.lineHeight}px;
  color: ${({ theme }) => theme.colors.action.primary.default};
  font-size: ${({ theme }) => theme.typography.heading.xl.size}px;
  font-weight: ${({ theme }) => theme.typography.heading.xl.weight};
  line-height: ${({ theme }) => theme.typography.heading.xl.lineHeight}px;
  letter-spacing: ${({ theme }) =>
    theme.typography.heading.xl.letterSpacing}px;
  text-align: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled(LoadingIcon)`
  display: block;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.action.primary.default};
  animation: ${spin} 1s linear infinite;
`;

const Label = styled.p`
  margin: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: center;
`;

const StatusText = styled.p`
  margin: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.feedback.error};
  font-size: ${({ theme }) => theme.typography.text.md.size}px;
  font-weight: ${({ theme }) => theme.typography.text.md.weight};
  line-height: ${({ theme }) => theme.typography.text.md.lineHeight}px;
  text-align: center;
`;

function formatContribution(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatContributors(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

function MetricDisplay({
  isPending,
  isError,
  value,
}: {
  isPending: boolean;
  isError: boolean;
  value: string;
}) {
  if (isPending) {
    return <LoadingSpinner aria-hidden />;
  }

  return isError ? "0" : value;
}

export function AboutStats() {
  const { t, i18n } = useTranslation();
  const { data, isPending, isError } = useShelterResults();

  return (
    <Container>
      <Content>
        <MetricItem>
          <NumberAndText>
            <MetricValue aria-live="polite">
              <MetricDisplay
                isPending={isPending}
                isError={isError || !data}
                value={
                  data
                    ? formatContribution(data.contribution, i18n.language)
                    : ""
                }
              />
            </MetricValue>
            <Label>{t("pages.about.metrics.contribution")}</Label>
          </NumberAndText>
        </MetricItem>

        <MetricItem>
          <NumberAndText>
            <MetricValue aria-live="polite">
              <MetricDisplay
                isPending={isPending}
                isError={isError || !data}
                value={
                  data
                    ? formatContributors(data.contributors, i18n.language)
                    : ""
                }
              />
            </MetricValue>
            <Label>{t("pages.about.metrics.contributors")}</Label>
          </NumberAndText>
        </MetricItem>
      </Content>

      {isError ? (
        <StatusText role="alert">{t("pages.about.error")}</StatusText>
      ) : null}
    </Container>
  );
}
