import { NextResponse } from "next/server";
import { getRequestSiteUrl } from "@/lib/siteUrl";
import {
  coreSitemap,
  getSitemapPartition,
  monthSitemap,
  renderUrlSet,
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await context.params;
  if (!rawId.endsWith(".xml")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const id = rawId.slice(0, -4);
  const { newest, byMonth } = await getSitemapPartition();
  const baseUrl = getRequestSiteUrl(request);

  if (id === "0") {
    return xml(renderUrlSet(coreSitemap(newest, baseUrl)));
  }

  const month = Number(id);
  const dates = byMonth.get(month);
  if (!Number.isInteger(month) || !dates) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return xml(renderUrlSet(monthSitemap(dates, baseUrl)));
}

function xml(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
