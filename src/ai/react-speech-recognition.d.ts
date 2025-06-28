// src/types/react-speech-recognition.d.ts

declare module 'react-speech-recognition' {
  export interface SpeechRecognitionHook {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
  }

  export function useSpeechRecognition(): SpeechRecognitionHook;

  export function startListening(options?: {
    continuous?: boolean;
    language?: string;
  }): void;

  export function stopListening(): void;

  export function abortListening(): void;

  export function resetTranscript(): void;
}
