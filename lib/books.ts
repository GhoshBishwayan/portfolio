import fs from "fs";
import path from "path";

export interface Book {
  id: string;
  title: string;
  extension: string;
  createdAt: number;
}

export async function getBooks(): Promise<Book[]> {
  const booksDirectory = path.join(process.cwd(), "public", "books");
  
  try {
    if (!fs.existsSync(booksDirectory)) {
      return [];
    }

    const files = fs.readdirSync(booksDirectory);
    const books = files
      .filter((file) => file.endsWith(".pdf") || file.endsWith(".epub"))
      .map((file) => {
        const filePath = path.join(booksDirectory, file);
        const stats = fs.statSync(filePath);
        return {
          id: file,
          title: file.replace(/\.(pdf|epub)$/i, "").replace(/[-_]/g, " "),
          extension: path.extname(file).slice(1).toUpperCase(),
          createdAt: stats.birthtimeMs || stats.mtimeMs,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);
      
    return books;
  } catch (error) {
    console.error("Error reading books directory:", error);
    return [];
  }
}
