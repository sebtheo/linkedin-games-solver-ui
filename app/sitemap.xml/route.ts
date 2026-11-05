import { getSitemapPartition, renderSitemapIndex } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const { byMonth } = await getSitemapPartition();
  const monthIds = [...byMonth.keys()].sort((a, b) => b - a);

  return new Response(renderSitemapIndex([0, ...monthIds]), {
    headers: { "Content-Type": "application/xml" },
  });
}
