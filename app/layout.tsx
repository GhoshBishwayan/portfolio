import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Portfolio | Premium Engineering",
    template: "%s | Portfolio",
  },
  description: "A premium portfolio showcasing elite engineering, design, and architecture.",
  applicationName: "Portfolio",
  authors: [{ name: "Engineer" }],
  creator: "Engineer",
  publisher: "Engineer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Portfolio | Premium Engineering",
    description: "A premium portfolio showcasing elite engineering, design, and architecture.",
    url: "/",
    siteName: "Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Premium Engineering",
    description: "A premium portfolio showcasing elite engineering, design, and architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { TerminalPanel } from "@/components/terminal-panel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-accent/20">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <SiteNav />
          <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-9 px-4 pb-12 pt-4 lg:flex-row lg:px-8">
            <TerminalPanel />
            <main className="flex-1 w-full min-w-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
