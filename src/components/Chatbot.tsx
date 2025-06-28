
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
      content: `Hello! I'm your AI reading assistant for "${bookTitle}". Ask me anything about the book, or ask for a quiz!`,
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
        content: 'Generating a quiz question for you...',
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
              return answerResult.answer || 'Could not find an answer.';
            }}
          />
        ),
      };
      setMessages((prev) => [...prev, quizMessage]);
    } else {
      setMessages((prev) =>
        prev.filter((m) => m.content !== 'Generating a quiz question for you...')
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
      <header className="border-b p-4">
        <h2 className="font-headline text-2xl font-bold text-center">
          LectorIA Chat
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Your study partner for "{bookTitle}"
        </p>
      </header>
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
                Thinking...
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
            Quiz Me
          </Button>
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the book..."
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
        <p className="font-bold mb-2">Quiz Time!</p>
        <p className="mb-4">{question}</p>
        {!isRevealed ? (
          <Button onClick={handleReveal}>
            <Award className="mr-2 h-4 w-4" />
            Reveal Answer & Get 10 Points
          </Button>
        ) : (
          <div className="mt-4 rounded-md border bg-background p-3 text-sm">
            <p className="font-semibold text-primary">Answer:</p>
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
