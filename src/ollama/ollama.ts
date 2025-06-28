// src/ollamaAPI.ts
import axiosInstance from './axiosInstance';

interface OllamaGenerateResponse {
  response: string;
  done: boolean;
}

export const sendRequestToOllama = async (prompt: string): Promise<string> => {
  try {
    const response = await axiosInstance.post<OllamaGenerateResponse>('/generate', {
      prompt: "quieor Que se haga bajo el contexto educativo dirigido a infantes,"+prompt,
      model: 'gemma2:2b', // asegúrate que este modelo esté descargado (verifica con `ollama list`)
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error('Error al llamar a Ollama:', error);
    throw new Error('No se pudo obtener respuesta de Ollama');
  }
};
