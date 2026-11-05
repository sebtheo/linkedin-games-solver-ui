"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const isFirstPage = useRef(true);

  useEffect(() => {
    if (isFirstPage.current) {
      isFirstPage.current = false;
      return;
    }

    const pageLocation = window.location.href;
    const pagePath = `${window.location.pathname}${window.location.search}`;
    window.gtag?.("event", "page_view", {
      page_path: pagePath,
      page_location: pageLocation,
    });
  }, [pathname]);

  if (!MEASUREMENT_ID_PATTERN.test(measurementId)) {
    return null;
  }

  const id = JSON.stringify(measurementId);

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${id}, { page_location: window.location.href });
          (function () {
            var url = new URL(window.location.href);
            var keys = [];
            url.searchParams.forEach(function (_, key) {
              if (key.toLowerCase().indexOf('utm_') === 0) keys.push(key);
            });
            keys.forEach(function (key) { url.searchParams.delete(key); });
            if (!keys.length) return;
            var next = url.pathname + url.search + url.hash;
            window.history.replaceState(window.history.state, '', next);
          })();
        `}
      </Script>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
