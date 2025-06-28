
import { notFound } from 'next/navigation';
import { BookReader } from '@/components/BookReader';
import { books } from '@/lib/data';
import type { Book } from '@/lib/types';

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

function getBook(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBook(params.id);

  if (!book) {
    notFound();
  }

  return <BookReader book={book} />;
}
