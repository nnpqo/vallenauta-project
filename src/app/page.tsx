'use client'
import { BookCard } from '@/components/BookCard';
import BookRecommendations from '@/components/BookRecommendations';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Book } from '@/lib/types';

export default function Home() {
  const [books,setBooks] = useState<Book[]>([]);;
  useEffect(()=>{
    async function fetchData() {
    const books1 = await axios.get<Book[]>('http://localhost:4000/api/cuentos');
    console.log(books1.data);
    setBooks(books1.data);
    }
    fetchData();
},[])
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Abre un Nuevo Mundo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Tu compañero de lectura inteligente para explorar, descubrir y crear.
        </p>
      </section>

      <section className="mb-16">
        <BookRecommendations />
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Biblioteca Principal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book}/>
          ))}
        </div>
      </section>
    </div>
  );
}
