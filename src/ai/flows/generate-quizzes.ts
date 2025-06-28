// src/ai/flows/generate-quizzes.ts
'use server';

/**
 * @fileOverview Un flujo para generar cuestionarios a partir de un texto de libro dado.
 *
 * - generateQuizzes - Una función que genera cuestionarios basados en el contenido del libro.
 * - GenerateQuizzesInput - El tipo de entrada para la función generateQuizzes.
 * - GenerateQuizzesOutput - El tipo de retorno para la función generateQuizzes.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizzesInputSchema = z.object({
  bookContent: z
    .string()
    .describe('El contenido del libro a partir del cual generar los cuestionarios.'),
  topic: z
    .string()
    .optional()
    .describe('Tema opcional sobre el cual generar preguntas')
});
export type GenerateQuizzesInput = z.infer<typeof GenerateQuizzesInputSchema>;

const GenerateQuizzesOutputSchema = z.object({
  quizzes: z.array(z.string()).describe('Un array de cuestionarios generados a partir del contenido del libro.'),
});
export type GenerateQuizzesOutput = z.infer<typeof GenerateQuizzesOutputSchema>;

export async function generateQuizzes(input: GenerateQuizzesInput): Promise<GenerateQuizzesOutput> {
  return generateQuizzesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizzesPrompt',
  input: {schema: GenerateQuizzesInputSchema},
  output: {schema: GenerateQuizzesOutputSchema},
  prompt: `Eres un experto en crear cuestionarios basados en el contenido de un libro.

  Genera una lista de cuestionarios a partir del siguiente contenido del libro:

  Contenido del libro: {{{bookContent}}}

  Cada cuestionario debe ser una pregunta sobre el contenido del libro. El tema es {{{topic}}}. Devuelve los cuestionarios como un array JSON de cadenas.`, 
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
