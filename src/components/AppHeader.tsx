
'use client';

import Link from 'next/link';
import { Award, BookHeart, Library } from 'lucide-react';
import { useContext } from 'react';
import { RewardsContext } from '@/context/RewardsContext';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  const rewards = useContext(RewardsContext);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center gap-2">
          <BookHeart className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">LectorIA</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/my-library">
                <Library className="h-5 w-5" />
                <span className="hidden sm:inline-block ml-2">My Library</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
              <Award className="h-5 w-5 text-accent" />
              <span>{rewards?.score ?? 0} Points</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
