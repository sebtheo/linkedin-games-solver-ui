import { API_BASE_URL } from "./constants";
import { DatesResponse, SolutionResponse } from "@/types";

async function fetchWithRetry(
  url: string,
  options?: RequestInit & { next?: { revalidate?: number | false } },
  retries = 3,
): Promise<Response> {
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    lastResponse = await fetch(url, options);
    if (lastResponse.status !== 429 || attempt === retries - 1) {
      return lastResponse;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
  }

  return lastResponse!;
}

export async function fetchAvailableDates(): Promise<string[]> {
  const response = await fetchWithRetry(`${API_BASE_URL}/dates/`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dates: ${response.statusText}`);
  }

  const data: DatesResponse = await response.json();
  return data.dates;
}

export async function fetchSolution(
  date?: string,
  options?: { revalidate?: number | false },
): Promise<SolutionResponse> {
  const url = date
    ? `${API_BASE_URL}/solutions/?date=${date}`
    : `${API_BASE_URL}/solutions/`;

  const response = await fetchWithRetry(url, {
    next: { revalidate: options?.revalidate ?? (date ? false : 3600) },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch solution: ${response.statusText}`);
  }

  return response.json();
}

export function getAdjacentDates(
  dates: string[],
  currentDate: string,
): { previous: string | null; next: string | null } {
  const index = dates.indexOf(currentDate);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index < dates.length - 1 ? dates[index + 1] : null,
    next: index > 0 ? dates[index - 1] : null,
  };
}

export function groupDatesByMonth(dates: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  for (const date of dates) {
    const [, month, year] = date.split("-");
    const key = `${year}-${month}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(date);
  }

  return groups;
}
