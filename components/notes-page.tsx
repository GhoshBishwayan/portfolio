"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { SearchInput } from "@/components/ui/search-input";
import { usePortfolioView } from "@/components/view-context";
import type { Note, NotesResponse } from "@/types";



export function NotesPage() {
  const { activeNoteQuery } = usePortfolioView();
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/notes")
      .then((response) => response.json() as Promise<NotesResponse>)
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setNotes(data.notes);
        setSelectedSlug((current) => current ?? data.notes[0]?.slug ?? null);
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeNoteQuery || !notes.length) {
      return;
    }

    const match = fuzzyFindNote(notes, activeNoteQuery);
    const timer = window.setTimeout(() => {
      setSelectedSlug(match?.slug ?? notes[0].slug);
      setQuery(activeNoteQuery);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeNoteQuery, notes]);

  const visibleNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return notes;
    }

    return notes.filter((note) =>
      [note.title, note.description, note.slug, ...note.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [notes, query]);

  const selectedNote =
    notes.find((note) => note.slug === selectedSlug) ?? visibleNotes[0] ?? notes[0];

  return (
    <section className="flex-1 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-[#0f1015] p-6 text-zinc-100 shadow-[0_20px_70px_rgba(0,0,0,0.22)] lg:min-h-[calc(100vh-128px)] lg:overflow-hidden">
      <div className="grid h-full gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Markdown
            </div>
            <h1 className="text-2xl font-semibold tracking-normal text-zinc-100">
              Notes
            </h1>
          </div>

          <div className="mb-4">
            <SearchInput
              className="h-10"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes"
              value={query}
            />
          </div>

          <div className="max-h-[calc(100vh-300px)] space-y-3 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="rounded-lg border border-white/10 bg-[#101116] p-4 text-sm text-zinc-500">
                Loading notes...
              </div>
            ) : null}
            {visibleNotes.map((note) => (
              <button
                className={`w-full rounded-lg border p-4 text-left transition hover:border-white/20 ${
                  selectedNote?.slug === note.slug
                    ? "border-zinc-200/60 bg-zinc-100 text-zinc-950"
                    : "border-white/10 bg-[#101116] text-zinc-300"
                }`}
                key={note.slug}
                onClick={() => setSelectedSlug(note.slug)}
                type="button"
              >
                <span className="block text-sm font-semibold">{note.title}</span>
                <span
                  className={`mt-2 line-clamp-2 block text-xs leading-5 ${
                    selectedNote?.slug === note.slug
                      ? "text-zinc-600"
                      : "text-zinc-500"
                  }`}
                >
                  {note.description}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <article className="min-w-0 overflow-y-auto rounded-xl border border-white/10 bg-[#101116] p-8">
          {selectedNote ? (
            <>
              <div className="mb-8 border-b border-white/10 pb-6">
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
                  {selectedNote.updated}
                </div>
                <h2 className="text-4xl font-semibold tracking-normal text-zinc-100">
                  {selectedNote.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">
                  {selectedNote.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="markdown-body">
                <ReactMarkdown
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  remarkPlugins={[remarkGfm, remarkMath]}
                >
                  {selectedNote.content}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-zinc-500">
              No notes found.
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

function fuzzyFindNote(notes: Note[], search: string) {
  const normalizedSearch = normalize(search);

  return notes
    .map((note) => ({
      note,
      score: scoreNote(note, normalizedSearch),
    }))
    .sort((a, b) => b.score - a.score)[0]?.note;
}

function scoreNote(note: Note, search: string) {
  const haystacks = [note.slug, note.title, note.description, ...note.tags].map(
    normalize,
  );

  return Math.max(...haystacks.map((haystack) => scoreText(haystack, search)));
}

function scoreText(text: string, search: string) {
  if (!search) {
    return 0;
  }

  if (text === search) {
    return 1000;
  }

  if (text.includes(search)) {
    return 800 - (text.length - search.length);
  }

  let score = 0;
  let searchIndex = 0;

  for (const character of text) {
    if (character === search[searchIndex]) {
      score += 10;
      searchIndex += 1;
    } else {
      score -= 1;
    }

    if (searchIndex === search.length) {
      score += 100;
      break;
    }
  }

  return searchIndex === search.length ? score : 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
