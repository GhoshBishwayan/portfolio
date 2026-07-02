"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { PortfolioView, usePortfolioView } from "@/components/view-context";

const prompt = "biswayan@dev:~$";

const supportedCommands = [
  "help",
  "about",
  "projects",
  "experience",
  "skills",
  "books",
  "study",
  "notes",
  "search",
  "resume",
  "github",
  "linkedin",
  "theme",
  "history",
  "clear",
  "status",
];

const viewCommands: Partial<Record<string, PortfolioView>> = {
  about: "about",
  books: "books",
  experience: "experience",
  notes: "notes",
  projects: "projects",
  skills: "skills",
  study: "study",
};

const viewLabels: Record<PortfolioView, string> = {
  about: "About",
  books: "Books",
  experience: "Experience",
  home: "Bento Grid",
  notes: "Notes",
  projects: "Projects",
  search: "Search",
  skills: "Skills",
  study: "Study Dashboard",
};

type Entry =
  | {
      type: "command";
      value: string;
    }
  | {
      type: "response";
      value: string;
      pending?: boolean;
    };

const initialEntries: Entry[] = [
  {
    type: "response",
    value: "Terminal ready. Type help to see available commands.",
  },
];

export function TerminalPanel() {
  const { openNote, openSearch, setActiveNoteQuery, setActiveView } =
    usePortfolioView();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const responses = useMemo(
    () => ({
      help: `Available commands: ${supportedCommands.join(", ")}`,
      resume: "Resume response placeholder: resume action is not connected yet.",
      github: "GitHub response placeholder: external navigation is disabled for now.",
      linkedin:
        "LinkedIn response placeholder: external navigation is disabled for now.",
      theme: "Theme response placeholder: theme switching will be wired later.",
      status: "Status: terminal shell online, commands mocked, navigation disabled.",
    }),
    [],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, input]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function getResponse(commandText: string) {
    const [command, ...args] = commandText.trim().split(/\s+/);
    const view = viewCommands[command];

    if (!command) {
      return "";
    }

    if (command === "history") {
      return commandHistory.length
        ? commandHistory.map((item, index) => `${index + 1}  ${item}`).join("\n")
        : "No command history yet.";
    }

    if (command === "search") {
      const searchQuery = args.join(" ");
      openSearch(searchQuery);
      return searchQuery
        ? `Searching everything for "${searchQuery}".`
        : "Opening universal search.";
    }

    if (command === "notes") {
      const noteQuery = args.join(" ");
      setActiveNoteQuery(noteQuery);
      openNote(noteQuery);
      return noteQuery
        ? `Opening best note match for "${noteQuery}" in the right panel.`
        : "Opening Notes in the right panel.";
    }

    if (view) {
      setActiveView(view);
      return `Opening ${viewLabels[view]} in the right panel.`;
    }

    if (command in responses) {
      return responses[command as keyof typeof responses];
    }

    return `Command not found: ${command}. Type help to see supported commands.`;
  }

  function typeResponse(response: string) {
    if (!response) {
      return;
    }

    setEntries((current) => [
      ...current,
      { type: "response", value: "", pending: true },
    ]);

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setEntries((current) => {
        const next = [...current];
        const last = next[next.length - 1];

        if (last?.type === "response" && last.pending) {
          next[next.length - 1] = {
            type: "response",
            value: response.slice(0, index),
            pending: index < response.length,
          };
        }

        return next;
      });

      if (index >= response.length) {
        window.clearInterval(timer);
      }
    }, 12);
  }

  function runCommand() {
    const commandText = input.trim();

    if (!commandText) {
      setEntries((current) => [...current, { type: "command", value: "" }]);
      setInput("");
      return;
    }

    if (commandText === "clear") {
      setEntries([]);
      setCommandHistory((current) => [...current, commandText]);
      setInput("");
      setHistoryIndex(null);
      return;
    }

    const response = getResponse(commandText);

    setEntries((current) => [
      ...current,
      { type: "command", value: commandText },
    ]);
    setCommandHistory((current) => [...current, commandText]);
    setInput("");
    setHistoryIndex(null);
    typeResponse(response);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const inputText = input.toLowerCase();
      if (!inputText) return;
      
      const matches = supportedCommands.filter((cmd) => cmd.startsWith(inputText));
      
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else if (matches.length > 1) {
        setEntries((current) => [
          ...current,
          { type: "command", value: input },
          { type: "response", value: matches.join("  ") },
        ]);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandHistory.length) {
        return;
      }

      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  }

  return (
    <aside className="h-[60vh] w-full shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#08090c] shadow-[0_24px_80px_rgba(0,0,0,0.42)] lg:sticky lg:top-[112px] lg:h-[calc(100vh-160px)] lg:w-[360px] lg:self-start">
      <div className="flex h-12 items-center gap-2 border-b border-white/8 bg-[#111217] px-5">
        <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_12px_rgba(255,95,87,0.35)]" />
        <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.28)]" />
        <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_12px_rgba(40,200,64,0.28)]" />
      </div>
      <div
        className="h-[calc(100%-48px)] cursor-text overflow-y-auto px-5 py-6 font-mono text-[13px] leading-6 text-zinc-300 outline-none"
        onClick={focusInput}
        ref={scrollRef}
      >
        <div className="mb-5 text-zinc-600">Last login: layout preview</div>
        {entries.map((entry, index) =>
          entry.type === "command" ? (
            <div className="mb-2" key={`${entry.type}-${index}`}>
              <Prompt />
              <span className="pl-2 text-zinc-100">{entry.value}</span>
            </div>
          ) : (
            <pre
              className="mb-5 whitespace-pre-wrap break-words pl-0 font-mono text-[13px] leading-6 text-zinc-500"
              key={`${entry.type}-${index}`}
            >
              {entry.value}
              {entry.pending ? (
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 animate-cursor-blink shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              ) : null}
            </pre>
          ),
        )}
        <label className="flex min-h-6 items-center" aria-label="Terminal input">
          <Prompt />
          <span className="min-w-0 flex-1 pl-2 text-zinc-100">
            {input}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 animate-cursor-blink shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </span>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="sr-only"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            spellCheck={false}
            value={input}
          />
        </label>
      </div>
    </aside>
  );
}

function Prompt() {
  return <span className="text-emerald-400">{prompt}</span>;
}
