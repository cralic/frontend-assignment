"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDonationFormStore } from "@/store/donationForm";

function setMetaDescription(content: string) {
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function DonationDocumentMeta() {
  const { t } = useTranslation();
  const stepIndex = useDonationFormStore((s) => s.stepIndex);
  const submitFeedback = useDonationFormStore((s) => s.submitFeedback);

  useEffect(() => {
    const key =
      submitFeedback?.type === "success"
        ? "seo.steps.success"
        : (`seo.steps.${stepIndex}` as const);

    const pageTitle = t(`${key}.title`);
    const description = t(`${key}.description`);
    const template = t("seo.titleTemplate");

    document.title = template.replace("%s", pageTitle);
    setMetaDescription(description);
  }, [stepIndex, submitFeedback?.type, t]);

  return null;
}
