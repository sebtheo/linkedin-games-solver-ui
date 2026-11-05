import { NextResponse } from "next/server";
import {
  coreSitemap,
  getSitemapPartition,
  monthSitemap,
  renderUrlSet,
  SITEMAP_REVALIDATE,
} from "@/lib/sitemap";

export const revalidate = SITEMAP_REVALIDATE;

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await context.params;
  if (!rawId.endsWith(".xml")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const id = rawId.slice(0, -4);
  const { newest, byMonth } = await getSitemapPartition();

  if (id === "0") {
    return xml(renderUrlSet(coreSitemap(newest)));
  }

  const month = Number(id);
  const dates = byMonth.get(month);
  if (!Number.isInteger(month) || !dates) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return xml(renderUrlSet(monthSitemap(dates)));
}

function xml(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
