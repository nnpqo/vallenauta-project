
import { books } from '@/lib/data';
import { BookCard } from '@/components/BookCard';
import BookRecommendations from '@/components/BookRecommendations';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2 text-center">
          Welcome to LectorIA
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl text-center">
          Your personal AI-powered reading companion.
        </p>
      </section>

      <section className="mb-16">
        <BookRecommendations />
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6 border-b pb-2">
          Browse Library
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
