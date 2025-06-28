
'use client';

import Link from 'next/link';
import { Award, BookHeart, Library } from 'lucide-react';
import { useContext } from 'react';
import { RewardsContext } from '@/context/RewardsContext';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  const rewards = useContext(RewardsContext);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookHeart className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tighter">LectorIA</span>
        </Link>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/my-library">
                <Library className="h-5 w-5" />
                <span className="hidden sm:inline-block ml-2">Mi Biblioteca</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium">
              <Award className="h-5 w-5 text-primary" />
              <span>{rewards?.score ?? 0} Puntos</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
