
'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { getAnswerForBook, getQuizQuestions } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  User,
  Send,
  Loader2,
  Sparkles,
  Award,
  BookCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RewardsContext } from '@/context/RewardsContext';
import { Badge } from '@/context/RewardsContext';
import { Card, CardContent } from './ui/card';

interface ChatbotProps {
  bookContent: string;
  bookTitle: string;
}

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: React.ReactNode;
}

const firstQuizBadge: Badge = {
  id: 'first-quiz',
  name: 'Quiz Novice',
  icon: BookCheck,
};

export function Chatbot({ bookContent, bookTitle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `¡Hola! Soy tu asistente de lectura con IA para "${bookTitle}". ¡Pregúntame cualquier cosa sobre el libro o pídeme un cuestionario!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const rewards = useContext(RewardsContext);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getAnswerForBook(bookContent, input);
    setIsLoading(false);

    if (result.success) {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleQuizRequest = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'system',
        content: 'Generando una pregunta de cuestionario para ti...',
      },
    ]);

    const result = await getQuizQuestions(bookContent);
    setIsLoading(false);

    if (result.success && result.questions && result.questions.length > 0) {
      const question = result.questions[0];
      const quizMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: (
          <QuizCard
            question={question}
            onRevealAnswer={async () => {
              setIsLoading(true);
              const answerResult = await getAnswerForBook(bookContent, question);
              setIsLoading(false);
              rewards?.addPoints(10);
              rewards?.addBadge(firstQuizBadge);
              return answerResult.answer || 'No se pudo encontrar una respuesta.';
            }}
          />
        ),
      };
      setMessages((prev) => [...prev, quizMessage]);
    } else {
      setMessages((prev) =>
        prev.filter((m) => m.content !== 'Generando una pregunta de cuestionario para ti...')
      );
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              {message.role === 'system' ? (
                <div className="w-full text-center text-sm text-muted-foreground italic">
                  {message.content}
                </div>
              ) : (
                <div
                  className={`max-w-md rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {message.content}
                </div>
              )}
              {message.role === 'user' && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="max-w-md rounded-lg bg-secondary px-4 py-2">
                Pensando...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="mb-2 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={handleQuizRequest}
            disabled={isLoading}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Ponme a Prueba
          </Button>
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Haz una pregunta sobre el libro..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function QuizCard({
  question,
  onRevealAnswer,
}: {
  question: string;
  onRevealAnswer: () => Promise<string>;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = async () => {
    const revealedAnswer = await onRevealAnswer();
    setAnswer(revealedAnswer);
    setIsRevealed(true);
  };

  return (
    <Card className="border-primary border-2">
      <CardContent className="p-4">
        <p className="font-bold mb-2">¡Hora del Cuestionario!</p>
        <p className="mb-4">{question}</p>
        {!isRevealed ? (
          <Button onClick={handleReveal}>
            <Award className="mr-2 h-4 w-4" />
            Revelar Respuesta y Obtener 10 Puntos
          </Button>
        ) : (
          <div className="mt-4 rounded-md border bg-background p-3 text-sm">
            <p className="font-semibold text-primary">Respuesta:</p>
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
