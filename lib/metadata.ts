import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { formatDateShort, isToday } from "./dateUtils";
import { GAME_NAMES_LIST, GameSlug, getGameSeoTitle } from "./games";

interface PageMetadataOptions {
  date: string;
  gameSlug?: GameSlug;
}

export function buildPageMetadata({ date, gameSlug }: PageMetadataOptions): Metadata {
  const readableDate = formatDateShort(date);
  const today = isToday(date);

  let title: string;
  let description: string;
  let path: string;

  if (gameSlug) {
    const gameTitle = getGameSeoTitle(gameSlug);
    title = `${gameTitle} Answer - ${readableDate}`;
    description = `${gameTitle} solution for ${readableDate}. Daily LinkedIn games answers for ${GAME_NAMES_LIST}.`;
    path = `/${date}/${gameSlug}`;
  } else if (today) {
    title = `LinkedIn Games Solutions Today - ${readableDate}`;
    description = `Today's LinkedIn games answers and solutions for ${readableDate}. Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku results updated daily.`;
    path = "/";
  } else {
    title = `LinkedIn Games Answers for ${readableDate}`;
    description = `LinkedIn games solutions for ${readableDate}. Answers for Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku.`;
    path = `/${date}`;
  }

  const canonical = today && !gameSlug ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "LinkedIn Games Solver",
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildArchiveMetadata(): Metadata {
  return {
    title: "LinkedIn Games Archive",
    description:
      "Browse all archived LinkedIn games solutions by date. Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku answers.",
    alternates: { canonical: `${SITE_URL}/archive` },
    openGraph: {
      title: "LinkedIn Games Archive",
      description:
        "Browse all archived LinkedIn games solutions by date.",
      url: `${SITE_URL}/archive`,
      siteName: "LinkedIn Games Solver",
      type: "website",
    },
  };
}

export function buildGameHubMetadata(gameName: string, gameSlug: GameSlug): Metadata {
  return {
    title: `LinkedIn ${gameName} Solutions & Archive`,
    description: `Daily LinkedIn ${gameName} answers, today's solution, and archive of past ${gameName} puzzles.`,
    alternates: { canonical: `${SITE_URL}/games/${gameSlug}` },
    openGraph: {
      title: `LinkedIn ${gameName} Solutions`,
      description: `Daily LinkedIn ${gameName} answers and archive.`,
      url: `${SITE_URL}/games/${gameSlug}`,
      siteName: "LinkedIn Games Solver",
      type: "website",
    },
  };
}
