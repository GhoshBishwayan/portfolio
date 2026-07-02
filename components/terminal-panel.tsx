"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Entry =
  | { type: "command"; value: string }
  | { type: "response"; value: React.ReactNode };

const supportedCommands = ["help", "clear", "home", "books", "study", "notes", "projects", "github", "contact", "about"];

export function TerminalPanel() {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [entries, setEntries] = React.useState<Entry[]>([
    {
      type: "response",
      value: "Terminal ready. Type help to see available commands.",
    },
  ]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Aliases
    let parsedCmd = trimmed.toLowerCase();
    if (parsedCmd === "ls") parsedCmd = "help";
    if (parsedCmd === "cd") parsedCmd = "home";

    const newEntries: Entry[] = [...entries, { type: "command", value: trimmed }];

    if (parsedCmd === "clear") {
      setEntries([]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    if (parsedCmd === "help") {
      newEntries.push({
        type: "response",
        value: (
          <div className="space-y-1 text-muted-foreground">
            <div>Available commands:</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-emerald-400">home</div>
              <div>Navigate to dashboard</div>
              <div className="text-emerald-400">books</div>
              <div>Open library</div>
              <div className="text-emerald-400">study</div>
              <div>Open study topics</div>
              <div className="text-emerald-400">notes</div>
              <div>Open markdown notes</div>
              <div className="text-emerald-400">projects</div>
              <div>Open projects view</div>
              <div className="text-emerald-400">github</div>
              <div>Open GitHub stats</div>
              <div className="text-emerald-400">about</div>
              <div>Open profile</div>
              <div className="text-emerald-400">clear</div>
              <div>Clear terminal output</div>
            </div>
          </div>
        ),
      });
    } else if (
      ["home", "books", "study", "notes", "projects", "github", "contact", "about"].includes(parsedCmd)
    ) {
      newEntries.push({
        type: "response",
        value: `Navigating to /${parsedCmd === "home" ? "" : parsedCmd}...`,
      });
      router.push(parsedCmd === "home" ? "/" : `/${parsedCmd}`);
    } else {
      newEntries.push({
        type: "response",
        value: (
          <span className="text-[#ff5f57]">
            Command not found: {parsedCmd}. Type &apos;help&apos; for available commands.
          </span>
        ),
      });
    }

    setEntries(newEntries);
    setCommandHistory((prev) => [...prev, trimmed]);
    setInput("");
    setHistoryIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand(input);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const inputText = input.toLowerCase();
      if (!inputText) return;

      const matches = supportedCommands.filter((c) => c.startsWith(inputText));

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
      if (!commandHistory.length) return;
      const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
    }
  }

  return (
    <aside className="hidden lg:flex h-[calc(100vh-120px)] w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border/5 bg-zinc-950/80 shadow-xl sticky top-[96px] self-start backdrop-blur-xl">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-white/5 bg-white/5 px-5">
        <span className="size-3 rounded-full bg-[#ff5f57] shadow-sm" />
        <span className="size-3 rounded-full bg-[#ffbd2e] shadow-sm" />
        <span className="size-3 rounded-full bg-[#28c840] shadow-sm" />
        <div className="ml-4 flex gap-3 text-xs font-medium text-muted-foreground">
          <button className="text-foreground">zsh</button>
          <button className="hover:text-foreground">node</button>
          <button className="hover:text-foreground">git</button>
        </div>
      </div>
      <div
        className="flex-1 cursor-text overflow-y-auto px-5 py-6 font-mono text-[13px] leading-6 text-foreground outline-none"
        onClick={() => inputRef.current?.focus()}
        ref={scrollRef}
      >
        <div className="mb-5 text-muted-foreground">Last login: {new Date().toLocaleDateString()} on ttys000</div>
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <div key={i}>
              {entry.type === "command" ? (
                <div className="flex gap-3">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-sky-400">~</span>
                  <span>{entry.value}</span>
                </div>
              ) : (
                <div className="mt-1">{entry.value}</div>
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <span className="text-emerald-400">➜</span>
            <span className="text-sky-400">~</span>
            <div className="relative flex-1">
              <input
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="w-full bg-transparent text-foreground outline-none"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                spellCheck={false}
                value={input}
                autoFocus
              />
              <span 
                className="pointer-events-none absolute left-0 top-0 text-transparent whitespace-pre"
                aria-hidden="true"
              >
                {input}
                <span className="animate-cursor-blink inline-block h-[15px] w-[8px] translate-y-[2px] bg-muted-foreground/80" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
