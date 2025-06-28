
import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { Toaster } from '@/components/ui/toaster';
import { RewardsProvider } from '@/providers/RewardsProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'LectorIA',
  description: 'Tu asistente de lectura con inteligencia artificial.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RewardsProvider>
            <AppHeader />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <ThemeToggle />
          </RewardsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
