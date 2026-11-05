import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteUrlFromHeaders } from "@/lib/siteUrl";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = getSiteUrlFromHeaders(await headers());

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
