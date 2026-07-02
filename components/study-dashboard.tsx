"use client";

import { useState } from "react";
import { BookOpen, FileText, Link as LinkIcon } from "lucide-react";
import { DetailPill } from "@/components/ui/detail-pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import study from "@/data/study.json";

type StudyTopic = (typeof study.topics)[number];

export function StudyDashboard() {
  const [selectedTopicId, setSelectedTopicId] = useState(study.topics[0].id);
  const selectedTopic =
    study.topics.find((topic) => topic.id === selectedTopicId) ??
    study.topics[0];

  return (
    <section className="flex-1 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-[#0f1015] p-6 text-zinc-100 shadow-[0_20px_70px_rgba(0,0,0,0.22)] lg:min-h-[calc(100vh-128px)] lg:overflow-hidden">
      <div className="grid h-full gap-6 xl:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
                {study.page.eyebrow}
              </div>
              <h1 className="text-4xl font-semibold tracking-normal text-zinc-100">
                {study.page.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                {study.page.summary}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {study.page.stats.map((stat) => (
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

          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {study.topics.map((topic) => (
              <TopicCard
                isSelected={topic.id === selectedTopic.id}
                key={topic.id}
                onSelect={() => setSelectedTopicId(topic.id)}
                topic={topic}
              />
            ))}
          </div>
        </div>

        <TopicDetails topic={selectedTopic} />
      </div>
    </section>
  );
}

function TopicCard({
  isSelected,
  onSelect,
  topic,
}: {
  isSelected: boolean;
  onSelect: () => void;
  topic: StudyTopic;
}) {
  return (
    <button
      className={`group rounded-xl border bg-white/[0.04] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${
        isSelected ? "border-zinc-200/60" : "border-white/10"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className="mb-4 size-3 rounded-full shadow-[0_0_18px_currentColor]"
            style={{ color: topic.accent, backgroundColor: topic.accent }}
          />
          <h2 className="text-lg font-semibold tracking-normal text-zinc-100">
            {topic.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
            {topic.summary}
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-[#101116] px-3 py-1 text-xs text-zinc-400">
          {topic.progress}%
        </span>
      </div>

      <ProgressBar accent={topic.accent} className="mt-5" label={study.page.progressLabel} value={topic.progress} />

      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-zinc-500">
        <Metric label={study.page.labels.notes} value={String(topic.notesCount)} />
        <Metric label={study.page.labels.books} value={String(topic.books.length)} />
        <Metric
          label={study.page.labels.resources}
          value={String(topic.resources.length)}
        />
      </div>

      <div className="mt-4 text-xs text-zinc-600">
        {study.page.lastUpdatedLabel}: {topic.lastUpdated}
      </div>
    </button>
  );
}

function TopicDetails({ topic }: { topic: StudyTopic }) {
  return (
    <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-6">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
          {study.page.detailsTitle}
        </div>
        <h2 className="text-3xl font-semibold tracking-normal text-zinc-100">
          {topic.title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-zinc-500">{topic.summary}</p>
      </div>

      <ProgressBar accent={topic.accent} className="mt-5" label={study.page.progressLabel} value={topic.progress} />

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <DetailPill label={study.page.progressLabel} value={`${topic.progress}%`} />
        <DetailPill label={study.page.notesLabel} value={String(topic.notesCount)} />
        <DetailPill label={study.page.lastUpdatedLabel} value={topic.lastUpdated} />
        <DetailPill label={study.page.booksLabel} value={String(topic.books.length)} />
      </div>

      <DetailList
        icon="book"
        items={topic.books}
        title={study.page.booksLabel}
      />
      <DetailList
        icon="resource"
        items={topic.resources}
        title={study.page.resourcesLabel}
      />
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-[#101116] px-2 py-3">
      <div className="text-sm font-semibold text-zinc-200">{value}</div>
      <div className="mt-1">{label}</div>
    </div>
  );
}

function DetailList({
  icon,
  items,
  title,
}: {
  icon: "book" | "resource";
  items: string[];
  title: string;
}) {
  const Icon = icon === "book" ? BookOpen : LinkIcon;

  return (
    <div className="mt-7">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
        <Icon size={16} strokeWidth={1.8} />
        {title}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            className="flex items-center gap-3 rounded-lg border border-white/8 bg-[#101116] px-3 py-2 text-sm text-zinc-400"
            key={item}
          >
            <FileText size={14} strokeWidth={1.8} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
