
'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Lightbulb } from 'lucide-react';

export default function BookRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      // In a real app, this would come from the user's actual reading history
      const readingHistory = 'Orgullo y Prejuicio, El Gran Gatsby';
      const result = await getRecommendations(readingHistory);

      if (result.success && result.recommendations) {
        const parsedRecommendations = result.recommendations
          .split('\n')
          .map((r) => r.replace(/^- /, '').trim())
          .filter(Boolean);
        setRecommendations(parsedRecommendations);
      } else {
        setError(result.error || 'No se pudieron obtener las recomendaciones.');
      }
      setIsLoading(false);
    }

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2 className="font-headline text-3xl font-bold mb-6 border-b pb-2">
        Recomendado Para Ti
      </h2>
      <Card className="bg-secondary/50 border-dashed">
        <CardContent className="p-6">
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && recommendations.length > 0 && (
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">{rec}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
