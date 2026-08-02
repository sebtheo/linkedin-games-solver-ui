import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { buildSocialMetadata } from "@/lib/socialMetadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LinkedIn Games Solver",
    template: "%s | Solver",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "LinkedIn games",
    "LinkedIn games solutions today",
    "Pinpoint solutions",
    "Queens solutions",
    "Zip solutions",
    "Tango solutions",
    "Crossclimb solutions",
    "Mini Sudoku solutions",
  ],
  authors: [{ name: "SebTheo", url: "https://sebtheo.uk" }],
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo512.png",
  },
  ...buildSocialMetadata({
    title: "LinkedIn Games Solver",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <DarkModeProvider>
          <Header />
          {children}
          <RelatedLinks />
          <Footer />
        </DarkModeProvider>
        <Analytics />
      </body>
    </html>
  );
}
