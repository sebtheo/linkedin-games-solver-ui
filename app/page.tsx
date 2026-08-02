import { redirect } from "next/navigation";
import { fetchAvailableDates, fetchSolution } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import {
  formatDateShort,
  getFormattedToday,
  isToday,
  toIsoDate,
} from "@/lib/dateUtils";
import { SITE_URL } from "@/lib/constants";
import PageIntro from "@/components/PageIntro";
import DateSelector from "@/components/DateSelector";
import SolutionContainer from "@/components/SolutionContainer";
import GameLinks from "@/components/GameLinks";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

export const revalidate = 3600;

export async function generateMetadata() {
  const today = getFormattedToday();
  return buildPageMetadata({ date: today });
}

export default async function HomePage() {
  const [dates, solution] = await Promise.all([
    fetchAvailableDates(),
    fetchSolution(),
  ]);

  const date = solution.date;

  if (!isToday(date)) {
    redirect(`/${date}`);
  }

  const readableDate = formatDateShort(date);
  const pageUrl = SITE_URL;

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: `LinkedIn Games Solutions Today - ${readableDate}`,
            description: `Today's LinkedIn games answers for ${readableDate}.`,
            url: pageUrl,
          }),
          buildArticleJsonLd({
            headline: `LinkedIn Games Solutions Today - ${readableDate}`,
            description: `Daily LinkedIn games answers for ${readableDate}.`,
            url: pageUrl,
            datePublished: toIsoDate(date),
          }),
          buildBreadcrumbJsonLd([{ name: "Home", href: SITE_URL }]),
          buildFaqJsonLd(),
        ]}
      />

      <PageIntro date={date} />
      <DateSelector currentDate={date} availableDates={dates} />
      <SolutionContainer solution={solution.solutions.data} />
      <GameLinks date={date} />
      <FaqSection />
    </main>
  );
}
