
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
        coverImageHint: 'custom book cover',
        content: `This is a custom book added by you. Content is not available for uploaded books.`,
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
            My Library
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Your personal collection of books.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Book
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
            <h2 className="text-2xl font-semibold mb-2">Your library is empty.</h2>
            <p className="text-muted-foreground mb-4">Add a book to get started.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Book
            </Button>
          </div>
        )}
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Book</DialogTitle>
            <DialogDescription>
              Upload a PDF or enter the details of your book. The book will be added to your personal library.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBook}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                        Title
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
                        Author
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
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add to Library</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
