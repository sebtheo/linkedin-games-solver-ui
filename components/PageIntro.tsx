import { formatDate, isToday } from "@/lib/dateUtils";
import { GAME_NAMES_LIST } from "@/lib/games";

interface PageIntroProps {
  date: string;
  gameName?: string;
}

export default function PageIntro({ date, gameName }: PageIntroProps) {
  const readableDate = formatDate(date);
  const today = isToday(date);

  if (gameName) {
    return (
      <section className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          LinkedIn {gameName} Answer for {readableDate}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {today ? "Today's" : "The"} LinkedIn {gameName} solution for{" "}
          {readableDate}. View all six daily LinkedIn games answers including{" "}
          {GAME_NAMES_LIST} on this site.
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-2 px-4 sm:py-6 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
        {today
          ? `LinkedIn Games Solutions Today - ${readableDate}`
          : `LinkedIn Games Solutions for ${readableDate}`}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {today ? "Today's" : "Complete"} LinkedIn games answers and results for{" "}
        {readableDate}. Solutions for {GAME_NAMES_LIST} - updated daily when
        LinkedIn releases new puzzles.
      </p>
    </section>
  );
}
