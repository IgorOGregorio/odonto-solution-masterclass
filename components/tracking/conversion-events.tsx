"use client";

import { useEffect } from "react";

// NEXT_PUBLIC_* são inlined em build time pelo bundler, então podem ser lidas
// diretamente aqui — não é necessário receber via prop do server.
export function ConversionEvents() {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_META_PIXEL_ID &&
      typeof window.fbq === "function"
    ) {
      window.fbq("track", "Lead");
    }

    if (
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "generate_lead");

      const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
      const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

      if (googleAdsId && conversionLabel) {
        window.gtag("event", "conversion", {
          send_to: `${googleAdsId}/${conversionLabel}`,
        });
      }
    }
  }, []);

  return null;
}
