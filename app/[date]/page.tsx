import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  fetchAvailableDates,
  fetchSolution,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { formatDateShort, isToday, toIsoDate } from "@/lib/dateUtils";
import { SITE_URL } from "@/lib/constants";
import PageIntro from "@/components/PageIntro";
import DateSelector from "@/components/DateSelector";
import SolutionContainer from "@/components/SolutionContainer";
import GameLinks from "@/components/GameLinks";
import JsonLd from "@/components/JsonLd";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

export const revalidate = false;
export const dynamicParams = true;

// Pages are generated on-demand via ISR when crawled or visited.
// Pre-building all ~3,000 date/game pages would rate-limit the API at build time.

interface DatePageProps {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({
  params,
}: DatePageProps): Promise<Metadata> {
  const { date } = await params;
  return buildPageMetadata({ date });
}

export default async function DatePage({ params }: DatePageProps) {
  const { date } = await params;

  if (isToday(date)) {
    redirect("/");
  }

  const [dates, solution] = await Promise.all([
    fetchAvailableDates(),
    fetchSolution(date),
  ]);

  if (!dates.includes(date) || solution.date !== date) {
    notFound();
  }

  const readableDate = formatDateShort(date);
  const pageUrl = `${SITE_URL}/${date}`;

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: `LinkedIn Games Answers for ${readableDate}`,
            description: `LinkedIn games solutions for ${readableDate}.`,
            url: pageUrl,
            datePublished: toIsoDate(date),
          }),
          buildArticleJsonLd({
            headline: `LinkedIn Games Answers for ${readableDate}`,
            description: `LinkedIn games solutions for ${readableDate}.`,
            url: pageUrl,
            datePublished: toIsoDate(date),
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", href: SITE_URL },
            { name: readableDate, href: pageUrl },
          ]),
        ]}
      />

      <PageIntro date={date} />
      <DateSelector currentDate={date} availableDates={dates} />
      <SolutionContainer solution={solution.solutions.data} />
      <GameLinks date={date} />
    </main>
  );
}
