import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchAvailableDates, fetchSolution } from "@/lib/api";
import { buildGameHubMetadata } from "@/lib/metadata";
import { formatDateShort } from "@/lib/dateUtils";
import { SITE_URL } from "@/lib/constants";
import {
  GAME_SLUGS,
  GAMES,
  GameSlug,
  isValidGameSlug,
  slugToGameKey,
} from "@/lib/games";
import Breadcrumbs from "@/components/Breadcrumbs";
import SingleGameSolution from "@/components/SingleGameSolution";
import JsonLd from "@/components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

export const revalidate = 3600;

interface GameHubPageProps {
  params: Promise<{ game: string }>;
}

export function generateStaticParams() {
  return GAME_SLUGS.map((game) => ({ game }));
}

export async function generateMetadata({
  params,
}: GameHubPageProps): Promise<Metadata> {
  const { game } = await params;
  if (!isValidGameSlug(game)) {
    return { title: "Not Found" };
  }
  const gameInfo = GAMES[slugToGameKey(game as GameSlug)];
  return buildGameHubMetadata(gameInfo.name, game as GameSlug);
}

export default async function GameHubPage({ params }: GameHubPageProps) {
  const { game } = await params;

  if (!isValidGameSlug(game)) {
    notFound();
  }

  const gameSlug = game as GameSlug;
  const gameKey = slugToGameKey(gameSlug);
  const gameInfo = GAMES[gameKey];

  const [dates, solution] = await Promise.all([
    fetchAvailableDates(),
    fetchSolution(),
  ]);

  const recentDates = dates.slice(0, 30);
  const todayDate = solution.date;
  const pageUrl = `${SITE_URL}/games/${gameSlug}`;

  return (
    <main className="min-h-screen">
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: `LinkedIn ${gameInfo.name} Solutions`,
            description: gameInfo.description,
            url: pageUrl,
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", href: SITE_URL },
            { name: gameInfo.name, href: pageUrl },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: gameInfo.name }]}
      />

      <section className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          LinkedIn {gameInfo.name} Solutions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {gameInfo.description}. View today&apos;s answer below or browse
          recent {gameInfo.name} puzzles from the archive.
        </p>

        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Today&apos;s {gameInfo.name} answer - {formatDateShort(todayDate)}
        </h2>
      </section>

      <SingleGameSolution
        solution={solution.solutions.data}
        gameSlug={gameSlug}
      />

      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Recent {gameInfo.name} answers
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recentDates.map((date) => (
            <li key={date}>
              <Link
                href={`/${date}/${gameSlug}`}
                className="block text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              >
                {formatDateShort(date)} - {gameInfo.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <Link
            href="/archive"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View full archive
          </Link>
        </p>
      </section>
    </main>
  );
}
