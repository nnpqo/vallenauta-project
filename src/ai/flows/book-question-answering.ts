// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview Proporciona un flujo de Genkit para responder preguntas de los usuarios sobre el contenido de un libro.
 *
 * - bookQuestionAnswering - Una función que acepta el contenido de un libro y una pregunta, y luego devuelve una respuesta a la pregunta basada en el contenido del libro.
 * - BookQuestionAnsweringInput - El tipo de entrada para la función bookQuestionAnswering.
 * - BookQuestionAnsweringOutput - El tipo de retorno para la función bookQuestionAnswering.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookQuestionAnsweringInputSchema = z.object({
  bookContent: z.string().describe('El contenido del libro.'),
  question: z.string().describe('La pregunta a ser respondida basada en el contenido del libro.'),
});
export type BookQuestionAnsweringInput = z.infer<typeof BookQuestionAnsweringInputSchema>;

const BookQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('La respuesta a la pregunta basada en el contenido del libro.'),
});
export type BookQuestionAnsweringOutput = z.infer<typeof BookQuestionAnsweringOutputSchema>;

export async function bookQuestionAnswering(input: BookQuestionAnsweringInput): Promise<BookQuestionAnsweringOutput> {
  return bookQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bookQuestionAnsweringPrompt',
  input: {schema: BookQuestionAnsweringInputSchema},
  output: {schema: BookQuestionAnsweringOutputSchema},
  prompt: `Eres un asistente de IA útil que responde preguntas basadas en el contenido del libro proporcionado.\n\nContenido del libro:\n{{bookContent}}\n\nPregunta: {{question}}\n\nRespuesta: `,
});

const bookQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'bookQuestionAnsweringFlow',
    inputSchema: BookQuestionAnsweringInputSchema,
    outputSchema: BookQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
