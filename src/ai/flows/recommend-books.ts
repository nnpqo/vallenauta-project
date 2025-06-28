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

const RecommendBooksOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Una lista de libros recomendados basada en el historial de lectura.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `Basado en el historial de lectura del usuario, recomienda algunos libros que podría disfrutar.

Historial de lectura: {{{readingHistory}}}

Recomendaciones:`, 
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
