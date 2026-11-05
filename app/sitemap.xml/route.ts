import { getRequestSiteUrl } from "@/lib/siteUrl";
import { getSitemapPartition, renderSitemapIndex } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { byMonth } = await getSitemapPartition();
  const monthIds = [...byMonth.keys()].sort((a, b) => b - a);
  const baseUrl = getRequestSiteUrl(request);

  return new Response(renderSitemapIndex([0, ...monthIds], baseUrl), {
    headers: { "Content-Type": "application/xml" },
  });
}
