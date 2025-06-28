
import { books } from '@/lib/data';
import { BookCard } from '@/components/BookCard';
import BookRecommendations from '@/components/BookRecommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Lightbulb, PencilRuler } from 'lucide-react';

const featureCards = [
  {
    icon: Compass,
    title: 'Explora',
    description: 'Explora un mundo de conocimiento desconocido.',
  },
  {
    icon: Lightbulb,
    title: 'Descubre',
    description: 'Descubre la belleza a tu alrededor con cada página.',
  },
  {
    icon: PencilRuler,
    title: 'Crea',
    description: 'Crea nuevas posibilidades y expande tu mente.',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Abre un Nuevo Mundo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Tu compañero de lectura inteligente para explorar, descubrir y crear.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="text-center bg-card/50">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <BookRecommendations />
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Biblioteca Principal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
