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
      <body>{children}</body>
    </html>
  );
}
