"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";

const BooksPage = dynamic(() => import("@/components/books-page").then(m => m.BooksPage));
const NotesPage = dynamic(() => import("@/components/notes-page").then(m => m.NotesPage));
const SearchPage = dynamic(() => import("@/components/search-page").then(m => m.SearchPage));
const StudyDashboard = dynamic(() => import("@/components/study-dashboard").then(m => m.StudyDashboard));
import { PortfolioView, usePortfolioView } from "@/components/view-context";

const books = ["Designing Data-Intensive Applications", "The Pragmatic Programmer"];
const topics = ["Systems", "Frontend", "Databases", "Writing"];
const activities = ["Added 2 notes", "Reviewed study queue", "Updated reading list"];

const viewDetails: Record<
  Exclude<PortfolioView, "home" | "books" | "study" | "notes" | "search">,
  {
    title: string;
    eyebrow: string;
    summary: string;
    items: string[];
  }
> = {
  about: {
    title: "About",
    eyebrow: "Profile",
    summary:
      "Placeholder profile view for background, values, and current direction.",
    items: ["Frontend systems", "Product detail", "Clean interaction design"],
  },
  books: {
    title: "Books",
    eyebrow: "Library",
    summary:
      "Placeholder books view for shelves, highlights, and reading progress.",
    items: ["Currently reading", "Recently added", "Saved highlights"],
  },
  experience: {
    title: "Experience",
    eyebrow: "Timeline",
    summary:
      "Placeholder experience view for roles, impact, and selected milestones.",
    items: ["Product interfaces", "Design systems", "Performance work"],
  },
  notes: {
    title: "Notes",
    eyebrow: "Quick Notes",
    summary:
      "Placeholder notes view for working thoughts, drafts, and references.",
    items: ["Inbox", "Pinned notes", "Study fragments"],
  },
  projects: {
    title: "Projects",
    eyebrow: "Selected Work",
    summary:
      "Placeholder projects view for case studies, experiments, and shipped work.",
    items: ["Featured builds", "Interface experiments", "Technical writeups"],
  },
  skills: {
    title: "Skills",
    eyebrow: "Toolkit",
    summary:
      "Placeholder skills view for technologies, strengths, and working style.",
    items: ["React", "Next.js", "TypeScript"],
  },
  study: {
    title: "Study Dashboard",
    eyebrow: "Learning",
    summary:
      "Placeholder study dashboard for topics, streaks, and review queues.",
    items: ["Review queue", "Topic map", "Weekly progress"],
  },
};

const cards = [
  {
    title: "Books",
    eyebrow: "Library",
    className: "lg:col-span-5 lg:row-span-2",
    content: (
      <div className="mt-7 space-y-3">
        {books.map((book) => (
          <div
            className="rounded-lg border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300"
            key={book}
          >
            {book}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Study Dashboard",
    eyebrow: "Progress",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 grid grid-cols-3 gap-3">
        {["24", "08", "71%"].map((value) => (
          <div
            className="rounded-lg border border-white/8 bg-white/[0.04] p-3 text-center"
            key={value}
          >
            <div className="text-xl font-semibold text-zinc-100">{value}</div>
            <div className="mt-1 h-1 rounded-full bg-emerald-400/50" />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Quick Notes",
    eyebrow: "Drafts",
    className: "lg:col-span-3",
    content: (
      <p className="mt-7 text-sm leading-6 text-zinc-500">
        Placeholder note stream for ideas, reminders, and saved fragments.
      </p>
    ),
  },
  {
    title: "Recently Added Books",
    eyebrow: "New",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 flex gap-3">
        {[1, 2, 3].map((item) => (
          <div
            className="h-24 flex-1 rounded-lg border border-white/8 bg-gradient-to-br from-zinc-700 to-zinc-950"
            key={item}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Profile",
    eyebrow: "Identity",
    className: "lg:col-span-3 overflow-hidden p-0",
    content: (
      <div className="group relative h-full w-full">
        <Image
          alt="Biswayan Ghosh Portrait"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          src="/profile.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-75" />
        <div className="absolute bottom-6 left-6 right-6 text-zinc-100">
          <div className="text-lg font-semibold tracking-tight">Biswayan Ghosh</div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Junior Web Developer</div>
          <div className="mt-0.5 text-xs text-zinc-400">Aspiring AI Engineer</div>
        </div>
      </div>
    ),
  },
  {
    title: "Study Topics",
    eyebrow: "Map",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400"
            key={topic}
          >
            {topic}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Knowledge Graph",
    eyebrow: "Links",
    className: "lg:col-span-4 lg:row-span-2",
    content: (
      <div className="relative mt-7 h-52 overflow-hidden rounded-lg border border-white/8 bg-white/[0.03]">
        <span className="absolute left-8 top-8 size-4 rounded-full bg-emerald-300" />
        <span className="absolute right-10 top-16 size-3 rounded-full bg-sky-300" />
        <span className="absolute bottom-10 left-16 size-3 rounded-full bg-violet-300" />
        <span className="absolute bottom-12 right-14 size-5 rounded-full bg-amber-300" />
        <span className="absolute left-10 right-12 top-16 h-px rotate-12 bg-white/14" />
        <span className="absolute bottom-20 left-20 right-14 h-px -rotate-12 bg-white/14" />
      </div>
    ),
  },
  {
    title: "Recent Activities",
    eyebrow: "Timeline",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 space-y-3">
        {activities.map((activity) => (
          <div className="flex items-center gap-3 text-sm text-zinc-400" key={activity}>
            <span className="size-2 rounded-full bg-emerald-400" />
            {activity}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Stats Overview",
    eyebrow: "Metrics",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 space-y-3">
        {["Reading", "Notes", "Reviews"].map((label, index) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-xs text-zinc-500">
              <span>{label}</span>
              <span>{62 + index * 11}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-zinc-200"
                style={{ width: `${62 + index * 11}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Quote Card",
    eyebrow: "Pinned",
    className: "lg:col-span-4",
    content: (
      <p className="mt-7 text-lg leading-7 text-zinc-300">
        &ldquo;Make it work, make it clear, then make it feel inevitable.&rdquo;
      </p>
    ),
  },
  {
    title: "Contact Card",
    eyebrow: "Reach",
    className: "lg:col-span-4",
    content: (
      <div className="mt-7 rounded-lg border border-white/8 bg-white/[0.04] p-4 text-sm leading-6 text-zinc-400">
        Email, social links, and availability placeholders.
      </div>
    ),
  },
];

export function BentoGrid() {
  const { activeView } = usePortfolioView();

  if (activeView !== "home") {
    return <PanelView view={activeView} />;
  }

  return (
    <motion.section
      animate="visible"
      className="grid flex-1 auto-rows-[190px] grid-cols-1 gap-6 text-zinc-100 md:grid-cols-2 xl:grid-cols-12"
      initial="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      }}
    >
      {cards.map((card) => (
        <motion.article
          className={`group rounded-xl border border-white/10 bg-[#101116] ${card.title === "Profile" ? "p-0" : "p-6"} shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:border-white/20 hover:bg-[#14161d] hover:shadow-[0_28px_90px_rgba(0,0,0,0.4)] ${card.className}`}
          key={card.title}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 20 },
            },
          }}
          whileHover={{ scale: 1.015, y: -4 }}
        >
          <div className="flex h-full flex-col overflow-hidden">
            {card.title !== "Profile" && (
              <div>
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
                  {card.eyebrow}
                </div>
                <h2 className="text-xl font-semibold tracking-normal text-zinc-100">
                  {card.title}
                </h2>
              </div>
            )}
            <div className="min-h-0 flex-1">{card.content}</div>
          </div>
        </motion.article>
      ))}
    </motion.section>
  );
}

function PanelView({ view }: { view: Exclude<PortfolioView, "home"> }) {
  if (view === "books") {
    return <BooksPage />;
  }

  if (view === "study") {
    return <StudyDashboard />;
  }

  if (view === "notes") {
    return <NotesPage />;
  }

  if (view === "search") {
    return <SearchPage />;
  }

  const detail = viewDetails[view];

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 text-zinc-100"
      initial={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <article className="min-h-[calc(100vh-128px)] rounded-xl border border-white/10 bg-[#101116] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
        <div className="mb-14">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
            {detail.eyebrow}
          </div>
          <h1 className="text-5xl font-semibold tracking-normal text-zinc-100">
            {detail.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
            {detail.summary}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {detail.items.map((item) => (
            <div
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-sm text-zinc-300"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </article>
    </motion.section>
  );
}
