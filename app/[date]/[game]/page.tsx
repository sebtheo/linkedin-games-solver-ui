import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchAvailableDates, fetchSolution } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { formatDateShort, isToday, toIsoDate } from "@/lib/dateUtils";
import { SITE_URL } from "@/lib/constants";
import { GAMES, GameSlug, isValidGameSlug, slugToGameKey } from "@/lib/games";
import PageIntro from "@/components/PageIntro";
import DateSelector from "@/components/DateSelector";
import SingleGameSolution from "@/components/SingleGameSolution";
import JsonLd from "@/components/JsonLd";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

export const revalidate = false;
export const dynamicParams = true;

// Generated on-demand - see comment in app/[date]/page.tsx

interface GamePageProps {
  params: Promise<{ date: string; game: string }>;
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { date, game } = await params;
  if (!isValidGameSlug(game)) {
    return { title: "Not Found" };
  }
  return buildPageMetadata({ date, gameSlug: game });
}

export default async function GamePage({ params }: GamePageProps) {
  const { date, game } = await params;

  if (!isValidGameSlug(game)) {
    notFound();
  }

  const gameSlug = game as GameSlug;
  const gameKey = slugToGameKey(gameSlug);
  const gameInfo = GAMES[gameKey];

  const [dates, solution] = await Promise.all([
    fetchAvailableDates(),
    fetchSolution(date),
  ]);

  if (!dates.includes(date) || solution.date !== date) {
    notFound();
  }

  const readableDate = formatDateShort(date);
  const pageUrl = `${SITE_URL}/${date}/${gameSlug}`;
  const datePath = isToday(date) ? "/" : `/${date}`;

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: `LinkedIn ${gameInfo.name} Answer - ${readableDate}`,
            description: `${gameInfo.name} solution for ${readableDate}.`,
            url: pageUrl,
            datePublished: toIsoDate(date),
          }),
          buildArticleJsonLd({
            headline: `LinkedIn ${gameInfo.name} Answer - ${readableDate}`,
            description: `${gameInfo.name} solution for ${readableDate}.`,
            url: pageUrl,
            datePublished: toIsoDate(date),
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", href: SITE_URL },
            { name: readableDate, href: `${SITE_URL}${datePath}` },
            { name: gameInfo.name, href: pageUrl },
          ]),
        ]}
      />

      <PageIntro date={date} gameName={gameInfo.name} />
      <DateSelector currentDate={date} availableDates={dates} />
      <SingleGameSolution
        solution={solution.solutions.data}
        gameSlug={gameSlug}
      />
      <nav className="container mx-auto px-4 pb-8 max-w-3xl">
        <Link
          href={datePath}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all games for {readableDate}
        </Link>
      </nav>
    </main>
  );
}
