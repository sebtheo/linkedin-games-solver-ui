import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { formatDateShort, isToday } from "./dateUtils";
import { GameSlug, getGameSeoTitle } from "./games";
import { buildSocialMetadata } from "./socialMetadata";

interface PageMetadataOptions {
  date: string;
  gameSlug?: GameSlug;
}

export function buildPageMetadata({
  date,
  gameSlug,
}: PageMetadataOptions): Metadata {
  const readableDate = formatDateShort(date);
  const today = isToday(date);

  let title: string;
  let description: string;
  let path: string;

  if (gameSlug) {
    const gameTitle = getGameSeoTitle(gameSlug);
    title = `${gameTitle} Answer — ${readableDate}`;
    description = `${gameTitle} answer for ${readableDate}. Daily LinkedIn games solutions for all six puzzle games.`;
    path = `/${date}/${gameSlug}`;
  } else if (today) {
    title = `LinkedIn Games Solutions Today — ${readableDate}`;
    description = `Today's LinkedIn games answers for ${readableDate}. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.`;
    path = "/";
  } else {
    title = `LinkedIn Games Answers for ${readableDate}`;
    description = `LinkedIn games answers for ${readableDate}. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.`;
    path = `/${date}`;
  }

  const canonical = today && !gameSlug ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    ...buildSocialMetadata({
      title,
      description,
      url: canonical,
      type: "article",
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildArchiveMetadata(): Metadata {
  const title = "LinkedIn Games Archive";
  const description =
    "Browse archived LinkedIn games answers by date. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/archive` },
    ...buildSocialMetadata({
      title,
      description,
      url: `${SITE_URL}/archive`,
    }),
  };
}

export function buildGameHubMetadata(
  gameName: string,
  gameSlug: GameSlug,
): Metadata {
  const title = `LinkedIn ${gameName} Solutions & Archive`;
  const description = `Daily LinkedIn ${gameName} answers, today's solution, and an archive of past ${gameName} puzzles.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/games/${gameSlug}` },
    ...buildSocialMetadata({
      title,
      description,
      url: `${SITE_URL}/games/${gameSlug}`,
    }),
  };
}
