import type { Metadata } from "next";
import { OG_IMAGE } from "./constants";

interface SocialMetadataOptions {
  title: string;
  description: string;
  url: string;
  siteUrl: string;
  type?: "website" | "article";
}

export function buildSocialMetadata({
  title,
  description,
  url,
  siteUrl,
  type = "website",
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const imageUrl = new URL(OG_IMAGE.url, siteUrl).href;
  const image = { ...OG_IMAGE, url: imageUrl };

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "LinkedIn Games Solver",
      locale: "en_GB",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
