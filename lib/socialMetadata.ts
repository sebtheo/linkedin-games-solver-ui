import type { Metadata } from "next";
import { OG_IMAGE } from "./constants";

interface SocialMetadataOptions {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
}

export function buildSocialMetadata({
  title,
  description,
  url,
  type = "website",
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "LinkedIn Games Solver",
      locale: "en_GB",
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
