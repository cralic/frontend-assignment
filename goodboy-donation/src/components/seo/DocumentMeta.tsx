"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDonationFormStore } from "@/store/donationForm";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let meta = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function resolveSeoKeys(pathname: string) {
  if (pathname.startsWith("/about")) {
    return { titleKey: "seo.about.title", descriptionKey: "seo.about.description" };
  }
  if (pathname.startsWith("/contact")) {
    return {
      titleKey: "seo.contact.title",
      descriptionKey: "seo.contact.description",
    };
  }
  return null;
}

export function DocumentMeta() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const stepIndex = useDonationFormStore((s) => s.stepIndex);
  const submitFeedback = useDonationFormStore((s) => s.submitFeedback);

  useEffect(() => {
    const routeKeys = resolveSeoKeys(pathname);
    const stepKey =
      submitFeedback?.type === "success"
        ? "seo.steps.success"
        : (`seo.steps.${stepIndex}` as const);

    const titleKey = routeKeys?.titleKey ?? `${stepKey}.title`;
    const descriptionKey =
      routeKeys?.descriptionKey ?? `${stepKey}.description`;

    const pageTitle = t(titleKey);
    const description = t(descriptionKey);
    const documentTitle = t("seo.titleTemplate").replace("%s", pageTitle);
    const locale = i18n.language === "en" ? "en_US" : "sk_SK";

    document.title = documentTitle;
    document.documentElement.lang = i18n.language;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:locale", locale);
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);
  }, [
    pathname,
    stepIndex,
    submitFeedback?.type,
    t,
    i18n.language,
  ]);

  return null;
}
