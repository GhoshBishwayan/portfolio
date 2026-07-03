"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { Code2, BookOpen, Clock, Activity, Lightbulb, Link as LinkIcon, Mail, TrendingUp, Quote } from "lucide-react";
import { Book } from "@/lib/books";

const STUDY_SLIDES = [
  { topic: "ML Course", current: "Linear Regression", next: "Logistic Regression", deadline: "15 July", progress: 62 },
  { topic: "Deep Learning", current: "Neural Nets", next: "Backprop", deadline: "22 August", progress: 45 },
  { topic: "Math", current: "Calculus", next: "Linear Algebra", deadline: "01 Sept", progress: 12 },
];

export function BentoGrid({ initialBooks = [] }: { initialBooks?: Book[] }) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % STUDY_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = STUDY_SLIDES[slideIndex];

  return (
    <motion.section
      className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      }}
    >
      {/* ROW 1: 4 Cards (each col-span-1) */}
      
      {/* 1. Profile */}
      <Card className="col-span-1 overflow-hidden p-0 relative group">
        <Link href="/about" className="absolute inset-0 z-20"><span className="sr-only">About</span></Link>
        <Image src="/profile.png" alt="Profile" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 group-hover:opacity-80 z-10" />
        <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
          <div className="text-lg font-bold tracking-tight">Biswayan Ghosh</div>
          <div className="text-xs font-medium text-white/80">Junior Web Developer</div>
        </div>
      </Card>

      {/* 2. Study Topics */}
      <Card className="col-span-1 relative group cursor-pointer overflow-hidden">
        <Link href="/study" className="absolute inset-0 z-10"><span className="sr-only">Study Topics</span></Link>
        <CardHeader eyebrow="Map" title="Topics" />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["ML", "Deep Learning", "Neural Nets", "Algebra"].map((topic) => (
            <span key={topic} className="rounded-md border border-border/20 bg-background/50 px-2 py-1 text-[10px] text-muted-foreground transition-colors group-hover:border-border/40">
              {topic}
            </span>
          ))}
        </div>
      </Card>

      {/* 3. GitHub */}
      <Card className="col-span-1 relative group cursor-pointer bg-gradient-to-br from-zinc-900 to-zinc-950">
        <Link href="https://github.com/BiswayanGhosh" target="_blank" className="absolute inset-0 z-10"><span className="sr-only">GitHub</span></Link>
        <div className="flex justify-between items-start">
          <CardHeader eyebrow="Code" title="GitHub" />
          <GitHubMark className="size-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <GitHubStats />
      </Card>

      {/* 4. Recent Activity */}
      <Card className="col-span-1 relative group cursor-pointer">
        <Link href="/activity" className="absolute inset-0 z-10"><span className="sr-only">Activity</span></Link>
        <CardHeader eyebrow="Timeline" title="Activity" />
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen size={12} className="text-sky-400" /> Opened Deep Learning
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity size={12} className="text-emerald-400" /> Completed Math
          </div>
        </div>
      </Card>

      {/* ROW 2: Books (2), Study (1), Notes (1) */}

      {/* 5. Books */}
      <Card className="col-span-1 md:col-span-2 relative group cursor-pointer">
        <Link href="/books" className="absolute inset-0 z-10"><span className="sr-only">Books</span></Link>
        <div className="flex justify-between items-start">
          <CardHeader eyebrow="Library" title="Recently Added Books" />
          <BookOpen className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <div className="mt-3 flex gap-3 h-24 overflow-hidden">
          {initialBooks.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground border border-dashed border-border/50 rounded-lg bg-white/5">
              No books added.
            </div>
          ) : (
            initialBooks.slice(0, 3).map((book) => (
              <div key={book.id} className="flex-1 min-w-0 rounded-lg border border-white/5 bg-gradient-to-br from-slate-800 to-slate-900 p-3 shadow-inner">
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{book.extension}</div>
                <div className="mt-1 text-sm font-medium text-white/90 line-clamp-2" title={book.title}>{book.title}</div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* 6. Study Dashboard */}
      <Card className="col-span-1 relative group cursor-pointer flex flex-col justify-between overflow-hidden">
        <Link href="/study" className="absolute inset-0 z-20"><span className="sr-only">Study Dashboard</span></Link>
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {STUDY_SLIDES.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0 p-6 flex flex-col justify-between h-full">
              <CardHeader eyebrow="Focus" title={slide.topic} />
              <div>
                <div className="text-xs text-muted-foreground mb-1">{slide.current}</div>
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-emerald-400" style={{ width: `${slide.progress}%` }} />
                  </div>
                </div>
                <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Deadline: {slide.deadline}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 7. Quick Notes */}
      <Card className="col-span-1 relative group cursor-pointer bg-gradient-to-br from-emerald-950/20 to-transparent">
        <Link href="/notes" className="absolute inset-0 z-10"><span className="sr-only">Notes</span></Link>
        <CardHeader eyebrow="Drafts" title="Notes" />
        <p className="mt-1 text-xs leading-5 text-muted-foreground line-clamp-4">
          Backpropagation is the backbone of neural network training. It uses the chain rule to compute gradients backward from the output layer...
        </p>
      </Card>

      {/* ROW 3: Summary (1), Stats (1), Quote (1), Contact (1) */}

      {/* 8. Learning Summary */}
      <Card className="col-span-1 relative group cursor-pointer">
        <Link href="/study" className="absolute inset-0 z-10"><span className="sr-only">Summary</span></Link>
        <CardHeader eyebrow="Overview" title="Goal" />
        <div className="mt-1">
          <div className="text-sm font-medium text-foreground">Neural Nets</div>
          <div className="mt-3">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-emerald-400">68%</span>
            </div>
            <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="h-full bg-emerald-400 w-[68%]" />
            </div>
          </div>
        </div>
      </Card>

      {/* 9. Stats */}
      <Card className="col-span-1 relative group cursor-pointer">
        <Link href="/activity" className="absolute inset-0 z-10"><span className="sr-only">Stats</span></Link>
        <CardHeader eyebrow="Metrics" title="Streak" />
        <div className="mt-2 flex items-end gap-1.5 h-12">
          {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm relative group-hover:bg-emerald-500/40 transition-colors" style={{ height: `${h}%` }}>
              {i === 6 && <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-400">19d</div>}
            </div>
          ))}
        </div>
      </Card>

      {/* 10. Quote */}
      <Card className="col-span-1 relative group flex flex-col justify-center items-center text-center p-6 bg-zinc-900/20">
        <Quote className="text-muted-foreground/30 mb-2" size={24} />
        <p className="text-xs italic text-muted-foreground font-serif">
          "The best way to predict the future is to invent it."
        </p>
        <div className="mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">- Alan Kay</div>
      </Card>

      {/* 11. Contact/LinkedIn */}
      <Card className="col-span-1 relative group cursor-pointer bg-blue-950/20 hover:bg-blue-950/40 border-blue-900/30">
        <Link href="https://linkedin.com" target="_blank" className="absolute inset-0 z-10"><span className="sr-only">LinkedIn</span></Link>
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">in</div>
            <div>
              <div className="text-xs font-bold text-foreground">Connect</div>
              <div className="text-[10px] text-muted-foreground">LinkedIn</div>
            </div>
          </div>
          <div className="flex items-center justify-end text-[10px] font-medium text-blue-400 gap-1 mt-auto">
            View Profile <LinkIcon size={10} />
          </div>
        </div>
      </Card>

    </motion.section>
  );
}

function GitHubStats() {
  const [stats, setStats] = useState<{ repos: number; loading: boolean }>({ repos: 0, loading: true });

  useEffect(() => {
    fetch("https://api.github.com/users/BiswayanGhosh")
      .then((res) => res.json())
      .then((data) => setStats({ repos: data.public_repos || 42, loading: false }))
      .catch(() => setStats({ repos: 42, loading: false })); // Fallback
  }, []);

  return (
    <>
      <div className="mt-1 text-2xl font-bold text-foreground">
        {stats.loading ? "..." : `${stats.repos}+`}
      </div>
      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
        <Code2 size={14} className="text-emerald-400" /> Repositories
      </div>
    </>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.94 10.94 0 0 1 12 6.05c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
