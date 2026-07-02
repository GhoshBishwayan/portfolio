import Link from "next/link";
import { FileText, Moon } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 flex h-24 items-center justify-center px-8">
      <nav className="grid h-14 w-full max-w-[1020px] grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/10 bg-[#111217]/80 px-4 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div />
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <Link
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link
            aria-label="GitHub Profile"
            className="grid size-10 place-items-center rounded-full text-zinc-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            href="https://github.com"
          >
            <GitHubMark />
          </Link>
          <button
            aria-label="Toggle Theme"
            className="grid size-10 place-items-center rounded-full text-zinc-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            type="button"
          >
            <Moon size={18} strokeWidth={1.8} />
          </button>
          <Link
            className="ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            href="#resume"
          >
            <FileText size={16} strokeWidth={1.9} />
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.94 10.94 0 0 1 12 6.05c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
