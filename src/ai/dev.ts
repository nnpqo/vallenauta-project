import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-books.ts';
import '@/ai/flows/generate-quizzes.ts';
import '@/ai/flows/book-question-answering.ts';