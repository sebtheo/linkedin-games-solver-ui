import { FAQ_ITEMS } from "@/lib/structuredData";

export default function FaqSection() {
  return (
    <section className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Frequently asked questions
      </h2>
      <dl className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800/40"
          >
            <dt className="font-medium text-slate-800 dark:text-slate-100 mb-1">
              {item.question}
            </dt>
            <dd className="text-sm text-slate-600 dark:text-slate-400">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
