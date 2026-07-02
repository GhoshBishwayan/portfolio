import { BentoGrid } from "@/components/bento-grid";
import { getBooks } from "@/lib/books";

export default async function Home() {
  const books = await getBooks();
  return <BentoGrid initialBooks={books} />;
}
