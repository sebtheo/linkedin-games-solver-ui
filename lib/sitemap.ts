import type { MetadataRoute } from "next";
import { fetchAvailableDates } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { GAME_SLUGS } from "@/lib/games";

export const SITEMAP_REVALIDATE = 3600;

type SitemapEntry = MetadataRoute.Sitemap[number];

function parsePuzzleDate(date: string): Date | null {
  const [day, month, year] = date.split("-");
  if (!day || !month || !year) return null;

  const parsed = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  );
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function monthId(date: string): number | null {
  const [, month, year] = date.split("-");
  if (!month || !year) return null;

  const id = Number(`${year}${month}`);
  return Number.isInteger(id) ? id : null;
}

async function loadDates(): Promise<string[]> {
  try {
    return await fetchAvailableDates();
  } catch {
    return [];
  }
}

function dateEntries(date: string): SitemapEntry[] {
  const lastModified = parsePuzzleDate(date) ?? new Date();
  const entries: SitemapEntry[] = [
    {
      url: `${SITE_URL}/${date}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  for (const game of GAME_SLUGS) {
    entries.push({
      url: `${SITE_URL}/${date}/${game}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}

export async function getSitemapPartition(): Promise<{
  newest: string | null;
  byMonth: Map<number, string[]>;
}> {
  const dates = await loadDates();
  let newest: string | null = null;
  let newestTime = -Infinity;

  for (const date of dates) {
    const time = parsePuzzleDate(date)?.getTime();
    if (time == null || time <= newestTime) continue;
    newestTime = time;
    newest = date;
  }

  const byMonth = new Map<number, string[]>();
  for (const date of dates) {
    if (date === newest || parsePuzzleDate(date) == null) continue;
    const id = monthId(date);
    if (id == null) continue;

    const group = byMonth.get(id);
    if (group) {
      group.push(date);
    } else {
      byMonth.set(id, [date]);
    }
  }

  return { newest, byMonth };
}

export function coreSitemap(newest: string | null): MetadataRoute.Sitemap {
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

  if (newest) {
    entries.push(...dateEntries(newest));
  }

  return entries;
}

export function monthSitemap(dates: string[]): MetadataRoute.Sitemap {
  return dates.flatMap(dateEntries);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderUrlSet(entries: MetadataRoute.Sitemap): string {
  let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const item of entries) {
    content += "<url>\n";
    content += `<loc>${escapeXml(item.url)}</loc>\n`;
    if (item.lastModified) {
      const serialized =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified;
      content += `<lastmod>${escapeXml(serialized)}</lastmod>\n`;
    }
    if (item.changeFrequency) {
      content += `<changefreq>${item.changeFrequency}</changefreq>\n`;
    }
    if (typeof item.priority === "number") {
      content += `<priority>${item.priority}</priority>\n`;
    }
    content += "</url>\n";
  }

  content += "</urlset>\n";
  return content;
}

export function renderSitemapIndex(ids: number[]): string {
  let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
  content +=
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const id of ids) {
    content += "<sitemap>\n";
    content += `<loc>${escapeXml(`${SITE_URL}/sitemap/${id}.xml`)}</loc>\n`;
    content += "</sitemap>\n";
  }

  content += "</sitemapindex>\n";
  return content;
}
