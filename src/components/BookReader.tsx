
'use client';

import { useState } from 'react';
import type { Book } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sun, Moon, MessageSquarePlus } from 'lucide-react';
import { Chatbot } from './Chatbot';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';

export function BookReader({ book }: { book: Book }) {
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const themeColors =
    theme === 'light'
      ? 'bg-background text-foreground'
      : 'bg-foreground text-background';

  return (
    <div
      className={`relative min-h-full transition-colors duration-300 ${themeColors}`}
    >
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8 border-b pb-4">
          <h1 className="font-headline text-4xl font-bold">{book.title}</h1>
          <p className="text-lg text-muted-foreground">{book.author}</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-1/2 md:w-1/3">
              <span className="text-sm">Tamaño de Fuente</span>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={12}
                max={32}
                step={1}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>
        <article
          className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap"
          style={{ fontSize: `${fontSize}px` }}
        >
          {book.content}
        </article>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
            size="icon"
          >
            <MessageSquarePlus className="h-8 w-8" />
            <span className="sr-only">Abrir Chatbot</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-full flex flex-col p-0 md:h-[85vh]"
        >
          <SheetHeader className="border-b p-4">
            <SheetTitle className="font-headline text-2xl font-bold text-center">
              Chat de LectorIA
            </SheetTitle>
            <SheetDescription className="text-center">
              Tu compañero de estudio para "{book.title}"
            </SheetDescription>
          </SheetHeader>
          <Chatbot bookContent={book.content} bookTitle={book.title} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
