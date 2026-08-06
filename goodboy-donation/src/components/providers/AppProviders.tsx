"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { StyledComponentsRegistry } from "@/components/providers/StyledComponentsRegistry";
import { DocumentMeta } from "@/components/seo/DocumentMeta";
import i18n from "@/i18n";
import { tokens } from "@/styles/tokens";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StyledComponentsRegistry>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={tokens}>
            <DocumentMeta />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </StyledComponentsRegistry>
  );
}
