import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Page not found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        We couldn&apos;t find solutions for that date or game.
      </p>
      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Back to today&apos;s solutions
      </Link>
    </main>
  );
}
