
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
import { PlusCircle, UploadCloud } from 'lucide-react';

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
            Mi Biblioteca
          </h1>
          <p className="text-muted-foreground text-lg">
            Tu colección personal de libros.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} size="lg">
          <PlusCircle />
          <span>Añadir Libro</span>
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
          <div className="text-center py-20 border-dashed border-2 rounded-lg bg-secondary/50 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Tu biblioteca está vacía</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empieza añadiendo tu primer libro para leer y analizar con LectorIA.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} size="lg">
              <PlusCircle />
              <span>Añadir Tu Primer Libro</span>
            </Button>
          </div>
        )}
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Libro</DialogTitle>
            <DialogDescription>
              Introduce los detalles de tu libro. Podrás analizarlo con la IA.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBook}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Orgullo y Prejuicio"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="Jane Austen"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdf">Subir PDF (Opcional)</Label>
                <div className="relative flex items-center justify-center w-full">
                    <Label htmlFor="pdf" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-muted-foreground">PDF (MAX. 5MB)</p>
                        </div>
                        <Input id="pdf" type="file" className="hidden" />
                    </Label>
                </div> 
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
