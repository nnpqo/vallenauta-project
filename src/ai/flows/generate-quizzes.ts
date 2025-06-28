// src/ai/flows/generate-quizzes.ts
'use server';

/**
 * @fileOverview A flow to generate quizzes from a given book text.
 *
 * - generateQuizzes - A function that generates quizzes based on the book content.
 * - GenerateQuizzesInput - The input type for the generateQuizzes function.
 * - GenerateQuizzesOutput - The return type for the generateQuizzes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizzesInputSchema = z.object({
  bookContent: z
    .string()
    .describe('The content of the book from which to generate quizzes.'),
  topic: z
    .string()
    .optional()
    .describe('Optional topic to generate questions about')
});
export type GenerateQuizzesInput = z.infer<typeof GenerateQuizzesInputSchema>;

const GenerateQuizzesOutputSchema = z.object({
  quizzes: z.array(z.string()).describe('An array of quizzes generated from the book content.'),
});
export type GenerateQuizzesOutput = z.infer<typeof GenerateQuizzesOutputSchema>;

export async function generateQuizzes(input: GenerateQuizzesInput): Promise<GenerateQuizzesOutput> {
  return generateQuizzesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizzesPrompt',
  input: {schema: GenerateQuizzesInputSchema},
  output: {schema: GenerateQuizzesOutputSchema},
  prompt: `You are an expert in creating quizzes based on book content.

  Generate a list of quizzes from the following book content:

  Book Content: {{{bookContent}}}

  Each quiz should be a question about the book content. The topic is {{{topic}}}. Return the quizzes as a JSON array of strings.`, 
});

const generateQuizzesFlow = ai.defineFlow(
  {
    name: 'generateQuizzesFlow',
    inputSchema: GenerateQuizzesInputSchema,
    outputSchema: GenerateQuizzesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
