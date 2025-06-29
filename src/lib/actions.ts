
'use server';

import axios from 'axios';
import { recommendBooks } from '@/ai/flows/recommend-books';

const OLLAMA_API_URL = 'http://localhost:4000/ia/ollama/';

export async function getAnswerForBook(bookContent: string, userPrompt: string) {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      prompt: `${bookContent}\n\n${userPrompt}`,
    });

    return { success: true, answer: response.data.response };
  } catch (error: any) {
    console.error('Error en getAnswerForBook:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error inesperado al conectar con la IA',
    };
  }
}

export async function getQuizQuestions(bookContent: string) {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      prompt: `Genera una pregunta de opción abierta para evaluar comprensión lectora del siguiente contenido:\n\n${bookContent}`,
    });

    return {
      success: true,
      questions: [response.data.response], // puedes parsear más si es JSON
    };
  } catch (error: any) {
    console.error('Error en getQuizQuestions:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error al generar preguntas',
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
