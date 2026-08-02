export default function Footer() {
  return (
    <footer className="py-6 bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
        <p className="mb-2">LinkedIn Games Solver</p>
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://sebtheo.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sebastian Theo
          </a>
        </p>
      </div>
    </footer>
  );
}
