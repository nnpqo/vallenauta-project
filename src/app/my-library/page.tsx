
'use client';

import { useState } from 'react';
import { books as initialBooks } from '@/lib/data';
import type { Book } from '@/lib/types';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

export default function MyLibraryPage() {
  const [myBooks, setMyBooks] = useState<Book[]>(
    initialBooks.filter((b) => b.inLibrary)
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      const createdBook: Book = {
        id: newBook.title.toLowerCase().replace(/\s/g, '-'),
        title: newBook.title,
        author: newBook.author,
        coverImage: 'https://placehold.co/400x600.png',
        coverImageHint: 'portada libro personalizado',
        content: `Este es un libro personalizado añadido por ti. El contenido no está disponible para los libros subidos.`,
        inLibrary: true,
      };
      setMyBooks((prevBooks) => [...prevBooks, createdBook]);
      setNewBook({ title: '', author: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
            Mi Biblioteca
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Tu colección personal de libros.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Libro
        </Button>
      </section>

      <section>
        {myBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {myBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-dashed border-2 rounded-lg bg-secondary/50">
            <h2 className="text-2xl font-semibold mb-2">Tu biblioteca está vacía.</h2>
            <p className="text-muted-foreground mb-4">Añade un libro para empezar.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Añade Tu Primer Libro
            </Button>
          </div>
        )}
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Añadir un Nuevo Libro</DialogTitle>
            <DialogDescription>
              Sube un PDF o introduce los detalles de tu libro. El libro se añadirá a tu biblioteca personal.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBook}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                        Título
                    </Label>
                    <Input
                        id="title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                        Autor
                    </Label>
                    <Input
                        id="author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pdf" className="text-right">
                        PDF
                    </Label>
                    <Input id="pdf" type="file" className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Añadir a la Biblioteca</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
