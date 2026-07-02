"use client";

import { useMemo, useState } from "react";
import { BookOpen, FileText } from "lucide-react";
import { DetailPill } from "@/components/ui/detail-pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import library from "@/data/books.json";

type Book = (typeof library.books)[number];

const formatIcons = {
  EPUB: BookOpen,
  PDF: FileText,
};

export function BooksPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(library.page.allCategoryLabel);
  const [selectedBookId, setSelectedBookId] = useState(library.books[0].id);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return library.books.filter((book) => {
      const matchesCategory =
        category === library.page.allCategoryLabel || book.category === category;
      const searchable = [
        book.title,
        book.author,
        book.category,
        book.status,
        ...book.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [category, query]);

  const selectedBook =
    library.books.find((book) => book.id === selectedBookId) ??
    filteredBooks[0] ??
    library.books[0];

  const recentlyOpened = library.recentlyOpened
    .map((id) => library.books.find((book) => book.id === id))
    .filter((book): book is Book => Boolean(book));

  return (
    <section className="flex-1 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-[#0f1015] p-6 text-zinc-100 shadow-[0_20px_70px_rgba(0,0,0,0.22)] lg:min-h-[calc(100vh-128px)] lg:overflow-hidden">
      <div className="grid h-full gap-6 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
                {library.page.eyebrow}
              </div>
              <h1 className="text-4xl font-semibold tracking-normal text-zinc-100">
                {library.page.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                {library.page.summary}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {library.page.stats.map((stat) => (
                <div
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  key={stat.label}
                >
                  <div className="text-lg font-semibold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <SearchInput
              className="h-11 min-w-[280px] flex-1"
              onChange={(e) => setQuery(e.target.value)}
              placeholder={library.page.searchPlaceholder}
              value={query}
            />
            <div className="flex flex-wrap gap-2">
              {[library.page.allCategoryLabel, ...library.categories].map(
                (item) => (
                  <button
                    className={`h-11 rounded-xl border px-4 text-sm transition ${
                      category === item
                        ? "border-zinc-200 bg-zinc-100 text-zinc-950"
                        : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-zinc-100"
                    }`}
                    key={item}
                    onClick={() => setCategory(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                book={book}
                isSelected={book.id === selectedBook.id}
                key={book.id}
                onSelect={() => setSelectedBookId(book.id)}
              />
            ))}
          </div>

          {!filteredBooks.length ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-zinc-500">
              {library.page.emptyState}
            </div>
          ) : null}
        </div>

        <aside className="grid gap-6 xl:grid-rows-[auto_1fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-sm font-semibold text-zinc-200">
              {library.page.recentlyOpenedTitle}
            </h2>
            <div className="mt-4 space-y-3">
              {recentlyOpened.map((book) => (
                <button
                  className="flex w-full items-center gap-3 rounded-lg border border-white/8 bg-[#101116] p-3 text-left transition hover:border-white/20"
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  type="button"
                >
                  <BookCover book={book} size="small" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-zinc-200">
                      {book.title}
                    </span>
                    <span className="mt-1 block text-xs text-zinc-500">
                      {book.lastOpened}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <BookDetails book={selectedBook} />
        </aside>
      </div>
    </section>
  );
}

function BookCard({
  book,
  isSelected,
  onSelect,
}: {
  book: Book;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`group rounded-xl border bg-white/[0.04] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${
        isSelected ? "border-zinc-200/60" : "border-white/10"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="flex gap-4">
        <BookCover book={book} size="large" />
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-600">
            {book.category}
          </div>
          <h2 className="mt-2 line-clamp-2 text-base font-semibold leading-5 text-zinc-100">
            {book.title}
          </h2>
          <p className="mt-1 truncate text-sm text-zinc-500">{book.author}</p>
          <ProgressBar className="mt-4" label={library.page.progressLabel} value={book.progress} />
          <div className="mt-3 flex flex-wrap gap-2">
            {book.formats.map((format) => (
              <FormatButton format={format} key={format} />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function BookDetails({ book }: { book: Book }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex gap-4">
        <BookCover book={book} size="large" />
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
            {library.page.detailsTitle}
          </div>
          <h2 className="mt-3 text-xl font-semibold leading-6 text-zinc-100">
            {book.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{book.author}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">{book.summary}</p>
      <ProgressBar className="mt-4" label={library.page.progressLabel} value={book.progress} />
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <DetailPill label={library.page.detailLabels.status} value={book.status} />
        <DetailPill label={library.page.detailLabels.pages} value={String(book.pages)} />
        <DetailPill label={library.page.detailLabels.opened} value={book.lastOpened} />
        <DetailPill label={library.page.detailLabels.category} value={book.category} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {book.tags.map((tag) => (
          <span
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        {book.formats.map((format) => (
          <FormatButton format={format} key={format} />
        ))}
      </div>
    </div>
  );
}

function BookCover({ book, size }: { book: Book; size: "small" | "large" }) {
  const dimensions = size === "small" ? "h-16 w-11" : "h-32 w-22";

  return (
    <div
      className={`${dimensions} shrink-0 overflow-hidden rounded-lg border border-white/10 p-2 shadow-[0_16px_36px_rgba(0,0,0,0.28)]`}
      style={{
        background: `linear-gradient(145deg, ${book.cover.top}, ${book.cover.bottom})`,
      }}
    >
      <div
        className="mb-2 h-1.5 w-8 rounded-full"
        style={{ backgroundColor: book.cover.accent }}
      />
      <div className="line-clamp-4 text-[10px] font-semibold leading-3 text-white">
        {book.title}
      </div>
      <div className="mt-2 h-px w-full bg-white/20" />
    </div>
  );
}

function FormatButton({ format }: { format: string }) {
  const Icon = formatIcons[format as keyof typeof formatIcons] ?? FileText;

  return (
    <span
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-zinc-100"
    >
      <Icon size={14} strokeWidth={1.8} />
      {format}
    </span>
  );
}
