// src/ai/flows/recommend-books.ts
'use server';
/**
 * @fileOverview Un flujo que recomienda libros basado en el historial de lectura del usuario.
 *
 * - recommendBooks - Una función que maneja el proceso de recomendación de libros.
 * - RecommendBooksInput - El tipo de entrada para la función recommendBooks.
 * - RecommendBooksOutput - El tipo de retorno para la función recommendBooks.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  readingHistory: z
    .string()
    .describe('Una lista de libros que el usuario ha leído, con títulos y autores.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendedBookSchema = z.object({
  title: z.string().describe('El título del libro recomendado.'),
  author: z.string().describe('El autor del libro recomendado.'),
});

const RecommendBooksOutputSchema = z.object({
  recommendations: z
    .array(RecommendedBookSchema)
    .describe('Una lista de hasta 3 libros recomendados basada en el historial de lectura.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `Eres un experto bibliotecario. Basado en el historial de lectura del usuario, recomienda hasta 3 libros que podría disfrutar.
Devuelve las recomendaciones como un array JSON de objetos, donde cada objeto tiene las claves "title" y "author".

Historial de lectura: {{{readingHistory}}}
`,
});

const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
