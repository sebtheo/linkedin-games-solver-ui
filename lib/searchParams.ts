type SearchParams = Record<string, string | string[] | undefined>;

export function withSearch(path: string, params: SearchParams): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      query.append(key, value);
    } else if (Array.isArray(value)) {
      for (const item of value) query.append(key, item);
    }
  }

  const qs = query.toString();
  return qs ? `${path}?${qs}` : path;
}
