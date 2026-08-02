import type { Metadata } from "next";
import Link from "next/link";
import { fetchAvailableDates, groupDatesByMonth } from "@/lib/api";
import { buildArchiveMetadata } from "@/lib/metadata";
import { formatDateShort, formatMonthYear, getDatePath } from "@/lib/dateUtils";
import { SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

export const revalidate = 3600;

export const metadata: Metadata = buildArchiveMetadata();

export default async function ArchivePage() {
  const dates = await fetchAvailableDates();
  const grouped = groupDatesByMonth(dates);
  const sortedMonths = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: "LinkedIn Games Archive",
            description:
              "Browse all archived LinkedIn games solutions by date.",
            url: `${SITE_URL}/archive`,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", href: SITE_URL },
            { name: "Archive", href: `${SITE_URL}/archive` },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Archive" }]}
      />

      <section className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          LinkedIn Games Archive
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Browse {dates.length} days of LinkedIn games solutions. Each page
          includes answers for Pinpoint, Queens, Zip, Tango, Crossclimb, and
          Mini Sudoku.
        </p>

        <div className="space-y-8">
          {sortedMonths.map((monthKey) => (
            <div key={monthKey}>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3">
                {formatMonthYear(monthKey)}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {grouped[monthKey].map((date) => (
                  <li key={date}>
                    <Link
                      href={getDatePath(date)}
                      className="block text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                    >
                      {formatDateShort(date)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
