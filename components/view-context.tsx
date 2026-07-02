"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type PortfolioView =
  | "home"
  | "books"
  | "study"
  | "notes"
  | "search"
  | "projects"
  | "about"
  | "skills"
  | "experience";

type PortfolioViewContextValue = {
  activeNoteQuery: string;
  activeSearchQuery: string;
  activeView: PortfolioView;
  openNote: (query: string) => void;
  openSearch: (query: string) => void;
  setActiveNoteQuery: (query: string) => void;
  setActiveSearchQuery: (query: string) => void;
  setActiveView: (view: PortfolioView) => void;
};

const PortfolioViewContext = createContext<PortfolioViewContextValue | null>(
  null,
);

export function PortfolioViewProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<PortfolioView>("home");
  const [activeNoteQuery, setActiveNoteQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const openNote = useCallback((query: string) => {
    setActiveNoteQuery(query);
    setActiveView("notes");
  }, []);

  const openSearch = useCallback((query: string) => {
    setActiveSearchQuery(query);
    setActiveView("search");
  }, []);

  const value = useMemo(
    () => ({
      activeNoteQuery,
      activeSearchQuery,
      activeView,
      openNote,
      openSearch,
      setActiveNoteQuery,
      setActiveSearchQuery,
      setActiveView,
    }),
    [activeNoteQuery, activeSearchQuery, activeView, openNote, openSearch],
  );

  return (
    <PortfolioViewContext.Provider value={value}>
      {children}
    </PortfolioViewContext.Provider>
  );
}

export function usePortfolioView() {
  const context = useContext(PortfolioViewContext);

  if (!context) {
    throw new Error("usePortfolioView must be used inside PortfolioViewProvider");
  }

  return context;
}
