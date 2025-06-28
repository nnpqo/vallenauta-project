
import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 border-transparent hover:border-primary">
        <CardHeader className="p-0">
          <Image
            src={book.coverImage}
            alt={`Portada de ${book.title}`}
            width={400}
            height={600}
            className="aspect-[2/3] w-full object-cover"
            data-ai-hint={book.coverImageHint}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg leading-tight font-semibold">
            {book.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
