
'use client';

import { useState } from 'react';
import type { Book } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sun, Moon, MessageSquarePlus, Settings } from 'lucide-react';
import { Chatbot } from './Chatbot';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { DialogTitle } from '@radix-ui/react-dialog';

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
        <header className="mb-8 border-b pb-4 flex justify-between items-center">
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Ajustes de Lectura</h4>
                  <p className="text-sm text-muted-foreground">
                    Personaliza tu experiencia de lectura.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Tema</Label>
                    <div className="col-span-2 flex justify-end">
                      <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? (
                          <Moon className="h-5 w-5" />
                        ) : (
                          <Sun className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="fontSize">Fuente</Label>
                    <Slider
                      id="fontSize"
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      min={12}
                      max={32}
                      step={1}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </header>
        <article
          className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap font-body"
          style={{ fontSize: `${fontSize}px` }}
        >
          {book.content}
        </article>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            size="icon"
          >
            <MessageSquarePlus className="h-8 w-8" />
            <span className="sr-only">Abrir Chatbot</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-full flex flex-col p-0 md:h-[85vh] rounded-t-2xl"
        >
            <SheetHeader className="border-b p-4 text-center">
              <DialogTitle>Chat de LectorIA</DialogTitle>
              <SheetDescription>
                Tu compañero de estudio para "{book.title}"
              </SheetDescription>
            </SheetHeader>
          <Chatbot bookContent={book.content} bookTitle={book.title} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
