import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto px-4 pt-4 max-w-3xl"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight size={14} className="text-slate-400 shrink-0" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-800 dark:text-slate-200 font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
