// src/ai/flows/recommend-books.ts
'use server';
/**
 * @fileOverview A flow that recommends books based on the user's reading history.
 *
 * - recommendBooks - A function that handles the book recommendation process.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  readingHistory: z
    .string()
    .describe('A list of books the user has read, with titles and authors.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended books based on the reading history.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `Based on the user's reading history, recommend some books they might enjoy.

Reading History: {{{readingHistory}}}

Recommendations:`, 
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
