import type { MetadataRoute } from "next";
import { fetchAvailableDates } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { GAME_SLUGS } from "@/lib/games";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dates: string[] = [];

  try {
    dates = await fetchAvailableDates();
  } catch {
    dates = [];
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  for (const game of GAME_SLUGS) {
    entries.push({
      url: `${SITE_URL}/games/${game}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  for (const date of dates) {
    entries.push({
      url: `${SITE_URL}/${date}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    for (const game of GAME_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${date}/${game}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
