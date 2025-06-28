
'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '@/lib/actions';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import type { Book } from '@/lib/types';
import { BookCard } from './BookCard';

export default function BookRecommendations() {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);
      // In a real app, this would come from the user's actual reading history
      const readingHistory = 'Orgullo y Prejuicio, El Gran Gatsby';
      const result = await getRecommendations(readingHistory);

      if (result.success && result.recommendations) {
        const recommendedBooks: Book[] = result.recommendations.map(
          (rec: { title: string; author: string }) => ({
            id: rec.title.toLowerCase().replace(/\s+/g, '-'),
            title: rec.title,
            author: rec.author,
            coverImage: 'https://placehold.co/400x600.png',
            coverImageHint: 'portada libro recomendado',
            content: `El contenido no está disponible para libros recomendados. Añádelo a tu biblioteca para leerlo.`,
            inLibrary: false,
          })
        );
        setRecommendations(recommendedBooks);
      } else {
        setError(result.error || 'No se pudieron obtener las recomendaciones.');
      }
      setIsLoading(false);
    }

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Recomendaciones Mágicas Para Ti
      </h2>
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!isLoading && !error && recommendations.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {recommendations.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
