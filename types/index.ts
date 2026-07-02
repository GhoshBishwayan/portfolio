export type Note = {
  content: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
  updated: string;
};

export type NotesResponse = {
  notes: Note[];
};

export type SearchGroup = "Books" | "Projects" | "Notes" | "Study" | "Skills" | "Blog";

export type SearchItem = {
  body: string;
  group: SearchGroup;
  id: string;
  meta: string;
  tags: string[];
  title: string;
};
