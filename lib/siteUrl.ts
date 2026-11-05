import { SITE_URL } from "./constants";

export function getSiteUrlFromHeaders(headers: Headers): string {
  const forwardedHost = headers.get("x-forwarded-host");
  const host = (forwardedHost?.split(",")[0] ?? headers.get("host"))
    ?.trim()
    .replace(/:(?:443|80)$/, "");

  if (!host) {
    return SITE_URL;
  }

  const proto =
    headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";

  return `${proto}://${host}`.replace(/\/$/, "");
}

export function getRequestSiteUrl(request: Request): string {
  return getSiteUrlFromHeaders(request.headers);
}
