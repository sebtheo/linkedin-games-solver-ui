import Link from "next/link";
import { GAME_SLUGS, GAMES, slugToGameKey } from "@/lib/games";

interface GameLinksProps {
  date: string;
}

export default function GameLinks({ date }: GameLinksProps) {
  return (
    <nav
      aria-label="Game solutions"
      className="container mx-auto px-4 pb-4 max-w-3xl pt-8 sm:pt-0"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Individual game answers
      </h2>
      <ul className="flex flex-wrap gap-2">
        {GAME_SLUGS.map((slug) => {
          const info = GAMES[slugToGameKey(slug)];
          return (
            <li key={slug}>
              <Link
                href={`/${date}/${slug}`}
                className="inline-block text-sm px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {info.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
