"use client";

import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import booksData from "@/data/books.json";
import searchData from "@/data/search.json";
import studyData from "@/data/study.json";
import { usePortfolioView } from "@/components/view-context";
import type { NotesResponse, SearchGroup, SearchItem } from "@/types";

const groupOrder: SearchGroup[] = [
  "Books",
  "Projects",
  "Notes",
  "Study",
  "Skills",
  "Blog",
];

export function SearchPage() {
  const { activeSearchQuery } = usePortfolioView();
  const [query, setQuery] = useState(activeSearchQuery);
  const [prevActiveSearchQuery, setPrevActiveSearchQuery] = useState(activeSearchQuery);
  const [notes, setNotes] = useState<SearchItem[]>([]);

  if (activeSearchQuery !== prevActiveSearchQuery) {
    setPrevActiveSearchQuery(activeSearchQuery);
    setQuery(activeSearchQuery);
  }

  useEffect(() => {
    let isMounted = true;

    fetch("/api/notes")
      .then((response) => response.json() as Promise<NotesResponse>)
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setNotes(
          data.notes.map((note) => ({
            body: `${note.description} ${note.content}`,
            group: "Notes",
            id: note.slug,
            meta: note.updated,
            tags: note.tags,
            title: note.title,
          })),
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const items = useMemo<SearchItem[]>(
    () => [
      ...booksData.books.map((book) => ({
        body: book.summary,
        group: "Books" as const,
        id: book.id,
        meta: book.author,
        tags: book.tags,
        title: book.title,
      })),
      ...searchData.projects.map((project) => ({
        body: project.description,
        group: "Projects" as const,
        id: project.id,
        meta: "Project",
        tags: project.tags,
        title: project.title,
      })),
      ...notes,
      ...studyData.topics.map((topic) => ({
        body: `${topic.summary} ${topic.books.join(" ")} ${topic.resources.join(
          " ",
        )}`,
        group: "Study" as const,
        id: topic.id,
        meta: topic.lastUpdated,
        tags: [topic.title],
        title: topic.title,
      })),
      ...searchData.skills.map((skill) => ({
        body: skill.description,
        group: "Skills" as const,
        id: skill.id,
        meta: "Skill",
        tags: skill.tags,
        title: skill.title,
      })),
      ...searchData.blog.map((post) => ({
        body: post.description,
        group: "Blog" as const,
        id: post.id,
        meta: "Blog",
        tags: post.tags,
        title: post.title,
      })),
    ],
    [notes],
  );

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        ignoreLocation: true,
        includeScore: true,
        keys: [
          { name: "title", weight: 0.45 },
          { name: "tags", weight: 0.25 },
          { name: "body", weight: 0.2 },
          { name: "meta", weight: 0.1 },
        ],
        threshold: 0.38,
      }),
    [items],
  );

  const groupedResults = useMemo(() => {
    const trimmedQuery = query.trim();
    const results = trimmedQuery
      ? fuse.search(trimmedQuery).map((result) => result.item)
      : items;

    return groupOrder.map((group) => ({
      group,
      items: results.filter((item) => item.group === group).slice(0, 6),
    }));
  }, [fuse, items, query]);

  const totalResults = groupedResults.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  return (
    <section className="flex-1 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-[#0f1015] p-6 text-zinc-100 shadow-[0_20px_70px_rgba(0,0,0,0.22)] lg:min-h-[calc(100vh-128px)] lg:overflow-hidden">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
            Universal Search
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-100">
            Search Everything
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Search books, projects, notes, study topics, skills, and blog drafts.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="text-lg font-semibold text-zinc-100">{totalResults}</div>
          <div className="mt-1 text-xs text-zinc-500">Grouped results</div>
        </div>
      </div>

      <div className="mb-7">
        <SearchInput
          autoFocus
          className="h-12"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transformer"
          value={query}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {groupedResults.map((group) => (
          <section
            className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
            key={group.group}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-100">
                {group.group}
              </h2>
              <span className="rounded-full border border-white/10 bg-[#101116] px-3 py-1 text-xs text-zinc-500">
                {group.items.length}
              </span>
            </div>
            <div className="space-y-3">
              {group.items.map((item) => (
                <article
                  className="rounded-lg border border-white/8 bg-[#101116] p-4"
                  key={`${item.group}-${item.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                        {item.body}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-zinc-600">
                      {item.meta}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-500"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
              {!group.items.length ? (
                <div className="rounded-lg border border-white/8 bg-[#101116] p-4 text-sm text-zinc-600">
                  No matches in {group.group}.
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
