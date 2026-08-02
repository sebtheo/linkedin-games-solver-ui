interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };
}

export function buildWebPageJsonLd(options: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    ...(options.datePublished
      ? { datePublished: options.datePublished }
      : {}),
    isPartOf: {
      "@type": "WebSite",
      name: "LinkedIn Games Solver",
      url: "https://solver.sebtheo.uk",
    },
  };
}

export function buildArticleJsonLd(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    author: {
      "@type": "Person",
      name: "Sebastian Theo",
      url: "https://sebtheo.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "LinkedIn Games Solver",
      url: "https://solver.sebtheo.uk",
    },
  };
}

export const FAQ_ITEMS = [
  {
    question: "When do LinkedIn games reset?",
    answer:
      "LinkedIn games reset daily at midnight in your local timezone. New puzzles for Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku become available each day.",
  },
  {
    question: "Where can I find today's LinkedIn games solutions?",
    answer:
      "This site publishes daily answers for all LinkedIn games. Visit the homepage for today's solutions or browse the archive for past dates.",
  },
  {
    question: "Which LinkedIn games are covered?",
    answer:
      "We provide solutions for Pinpoint, Crossclimb, Queens, Zip, Tango, and Mini Sudoku - all six daily LinkedIn puzzle games.",
  },
];

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
