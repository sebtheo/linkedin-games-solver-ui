import type { Metadata } from "next";
import { formatDateShort, isToday } from "./dateUtils";
import { GameSlug, getGameSeoTitle } from "./games";
import { buildSocialMetadata } from "./socialMetadata";

interface PageMetadataOptions {
  date: string;
  siteUrl: string;
  gameSlug?: GameSlug;
}

export function buildPageMetadata({
  date,
  siteUrl,
  gameSlug,
}: PageMetadataOptions): Metadata {
  const readableDate = formatDateShort(date);
  const today = isToday(date);

  let title: string;
  let description: string;
  let path: string;

  if (gameSlug) {
    const gameTitle = getGameSeoTitle(gameSlug);
    title = `${gameTitle} Answer - ${readableDate}`;
    description = `${gameTitle} answer for ${readableDate}. Daily LinkedIn games solutions for all six puzzle games.`;
    path = `/${date}/${gameSlug}`;
  } else if (today) {
    title = `LinkedIn Games Solutions Today - ${readableDate}`;
    description = `Today's LinkedIn games answers for ${readableDate}. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.`;
    path = "/";
  } else {
    title = `LinkedIn Games Answers for ${readableDate}`;
    description = `LinkedIn games answers for ${readableDate}. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.`;
    path = `/${date}`;
  }

  const canonical = today && !gameSlug ? siteUrl : `${siteUrl}${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical },
    ...buildSocialMetadata({
      title,
      description,
      url: canonical,
      siteUrl,
      type: "article",
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildArchiveMetadata(siteUrl: string): Metadata {
  const title = "LinkedIn Games Archive";
  const description =
    "Browse archived LinkedIn games answers by date. Pinpoint, Queens, Zip, Tango, Crossclimb and Mini Sudoku.";

  const canonical = `${siteUrl}/archive`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical },
    ...buildSocialMetadata({
      title,
      description,
      url: canonical,
      siteUrl,
    }),
  };
}

export function buildGameHubMetadata(
  gameName: string,
  gameSlug: GameSlug,
  siteUrl: string,
): Metadata {
  const title = `LinkedIn ${gameName} Solutions & Archive`;
  const description = `Daily LinkedIn ${gameName} answers, today's solution, and an archive of past ${gameName} puzzles.`;

  const canonical = `${siteUrl}/games/${gameSlug}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical },
    ...buildSocialMetadata({
      title,
      description,
      url: canonical,
      siteUrl,
    }),
  };
}
