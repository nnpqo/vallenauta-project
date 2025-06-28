
'use server';

import { bookQuestionAnswering } from '@/ai/flows/book-question-answering';
import { generateQuizzes } from '@/ai/flows/generate-quizzes';
import { recommendBooks } from '@/ai/flows/recommend-books';

export async function getAnswerForBook(bookContent: string, question: string) {
  try {
    const { answer } = await bookQuestionAnswering({ bookContent, question });
    return { success: true, answer };
  } catch (error) {
    console.error('Error answering book question:', error);
    return {
      success: false,
      error: 'Lo siento, tuve problemas para encontrar una respuesta. Por favor, inténtalo de nuevo.',
    };
  }
}

export async function getQuizQuestions(bookContent: string, topic?: string) {
  try {
    const { quizzes } = await generateQuizzes({ bookContent, topic });
    return { success: true, questions: quizzes };
  } catch (error) {
    console.error('Error generating quiz:', error);
    return {
      success: false,
      error: 'Lo siento, tuve problemas para crear un cuestionario. Por favor, inténtalo de nuevo.',
    };
  }
}

export async function getRecommendations(readingHistory: string) {
  try {
    const { recommendations } = await recommendBooks({ readingHistory });
    return { success: true, recommendations };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      success: false,
      error: 'Lo siento, tuve problemas para encontrar recomendaciones. Por favor, inténtalo de nuevo.',
    };
  }
}
