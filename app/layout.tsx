import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LinkedIn Games Solver",
    template: "%s | Solver",
  },
  description:
    "Daily solutions for LinkedIn games including Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku.",
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
  openGraph: {
    siteName: "LinkedIn Games Solver",
    locale: "en_GB",
    type: "website",
  },
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
