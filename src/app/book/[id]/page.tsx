 'use client';

import { useParams } from 'next/navigation';
import { BookReader } from '@/components/BookReader';
import type { Book } from '@/lib/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookPage() {
  const { id } = useParams(); 
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/book/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error('Error al obtener el libro:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Cargando libro...</p>;
  if (error || !book) return <p>No se pudo cargar el libro.</p>;

  return <BookReader book={book} />;
}
