import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

type NoteMeta = {
  content: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
  updated: string;
};

const notesDirectory = path.join(process.cwd(), "notes");

export async function GET() {
  const files = await readdir(notesDirectory);
  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => readNote(file)),
  );

  return Response.json({
    notes: notes.sort((a, b) => a.title.localeCompare(b.title)),
  });
}

async function readNote(file: string): Promise<NoteMeta> {
  const slug = file.replace(/\.md$/, "");
  const raw = await readFile(path.join(notesDirectory, file), "utf8");
  const { content, frontmatter } = parseFrontmatter(raw);

  return {
    content,
    description: frontmatter.description ?? "",
    slug,
    tags: splitTags(frontmatter.tags),
    title: frontmatter.title ?? titleFromSlug(slug),
    updated: frontmatter.updated ?? "",
  };
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return { content: raw, frontmatter: {} as Record<string, string> };
  }

  const frontmatter = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) {
          return null;
        }

        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim(),
        ];
      })
      .filter((entry): entry is [string, string] => Boolean(entry)),
  );

  return { content: match[2], frontmatter };
}

function splitTags(value: string | undefined) {
  return value
    ? value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}
