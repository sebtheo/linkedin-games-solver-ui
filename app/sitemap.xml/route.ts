import {
  getSitemapPartition,
  renderSitemapIndex,
  SITEMAP_REVALIDATE,
} from "@/lib/sitemap";

export const revalidate = SITEMAP_REVALIDATE;

export async function GET() {
  const { byMonth } = await getSitemapPartition();
  const monthIds = [...byMonth.keys()].sort((a, b) => b - a);

  return new Response(renderSitemapIndex([0, ...monthIds]), {
    headers: { "Content-Type": "application/xml" },
  });
}
