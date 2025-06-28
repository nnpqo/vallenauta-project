
import type { Book } from './types';

export const books: Book[] = [
  {
    id: 'orgullo-y-prejuicio',
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    coverImage: 'https://placehold.co/400x600.png',
    coverImageHint: 'novela clasica portada',
    content: `Es una verdad universalmente reconocida que un hombre soltero en posesión de una buena fortuna debe necesitar una esposa.

Por poco conocidos que sean los sentimientos o puntos de vista de tal hombre a su primera entrada en un vecindario, esta verdad está tan bien fijada en las mentes de las familias circundantes, que se le considera propiedad legítima de una u otra de sus hijas.

"Mi querido Sr. Bennet", le dijo su dama un día, "¿ha oído que Netherfield Park se alquila por fin?"

El Sr. Bennet respondió que no.

"Pero sí", replicó ella; "porque la Sra. Long acaba de estar aquí y me lo ha contado todo".

El Sr. Bennet no respondió.

"¿No quieres saber quién lo ha tomado?", gritó su esposa con impaciencia.

"Tú quieres decírmelo y no tengo ninguna objeción en oírlo".

Esta fue suficiente invitación.

"Pues, querido, debes saber que la Sra. Long dice que Netherfield ha sido tomado por un joven de gran fortuna del norte de Inglaterra; que bajó el lunes en un carruaje de cuatro para ver el lugar, y quedó tan encantado con él que se puso de acuerdo con el Sr. Morris inmediatamente; que tomará posesión antes de Michaelmas, y algunos de sus sirvientes estarán en la casa para finales de la próxima semana."`,
    inLibrary: true,
  },
  {
    id: 'moby-dick',
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverImage: 'https://placehold.co/400x600.png',
    coverImageHint: 'ballena oceano',
    content: `Llamadme Ismael. Hace unos años —no importa cuánto tiempo exactamente— con poco o nada de dinero en mi bolsillo, y nada en particular que me interesara en tierra, pensé en navegar un poco y ver la parte acuática del mundo. Es una forma que tengo de ahuyentar la melancolía y regular la circulación. Cada vez que me encuentro con el ceño fruncido; cada vez que es un noviembre húmedo y lluvioso en mi alma; cada vez que me encuentro deteniéndome involuntariamente ante los almacenes de ataúdes y siguiendo cada funeral que encuentro; y especialmente cada vez que mis hipocondrías se apoderan de mí de tal manera que se requiere un fuerte principio moral para evitar que salga deliberadamente a la calle y le quite el sombrero a la gente metódicamente—entonces, considero que es hora de hacerme a la mar tan pronto como pueda. Este es mi sustituto de la pistola y la bala. Con un floreo filosófico, Catón se arroja sobre su espada; yo, tranquilamente, me embarco. No hay nada sorprendente en esto. Si tan solo lo supieran, casi todos los hombres, en su medida, alguna vez, albergan sentimientos muy parecidos a los míos hacia el océano.`,
    inLibrary: false,
  },
  {
    id: 'el-gran-gatsby',
    title: 'El Gran Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://placehold.co/400x600.png',
    coverImageHint: 'fiesta art deco',
    content: `En mis años más jóvenes y vulnerables, mi padre me dio un consejo que he estado repasando en mi mente desde entonces.

“Cada vez que sientas deseos de criticar a alguien”, me dijo, “recuerda que no todas las personas en este mundo han tenido las ventajas que tú has tenido.”

No dijo nada más, pero siempre hemos sido inusualmente comunicativos de una manera reservada, y entendí que quería decir mucho más que eso. En consecuencia, me inclino a reservar todos los juicios, un hábito que me ha abierto a muchas naturalezas curiosas y también me ha convertido en víctima de no pocos aburridos veteranos. La mente anormal es rápida para detectar y apegarse a esta cualidad cuando aparece en una persona normal, y así fue como en la universidad fui acusado injustamente de ser un político, porque estaba al tanto de las penas secretas de hombres salvajes y desconocidos. La mayoría de las confidencias no fueron buscadas—frecuentemente he fingido sueño, preocupación o una levedad hostil cuando me di cuenta por alguna señal inequívoca de que una revelación íntima se cernía en el horizonte; porque las revelaciones íntimas de los jóvenes, o al menos los términos en que las expresan, suelen ser plagios y están empañadas por supresiones evidentes.`,
    inLibrary: true,
  },
  {
    id: 'historia-de-dos-ciudades',
    title: 'Historia de Dos Ciudades',
    author: 'Charles Dickens',
    coverImage: 'https://placehold.co/400x600.png',
    coverImageHint: 'revolucion francesa',
    content: `Era el mejor de los tiempos, era el peor de los tiempos, era la edad de la sabiduría, era la edad de la insensatez, era la época de la creencia, era la época de la incredulidad, era la estación de la Luz, era la estación de la Oscuridad, era la primavera de la esperanza, era el invierno de la desesperación, teníamos todo ante nosotros, no teníamos nada ante nosotros, íbamos todos directos al Cielo, íbamos todos directos en sentido contrario—en resumen, el período era tan parecido al período actual, que algunas de sus autoridades más ruidosas insistían en que se recibiera, para bien o para mal, solo en el grado superlativo de comparación.

Había un rey con una mandíbula grande y una reina con un rostro sencillo, en el trono de Inglaterra; había un rey con una mandíbula grande y una reina con un rostro hermoso, en el trono de Francia. En ambos países era más claro que el cristal para los señores de las reservas estatales de panes y peces, que las cosas en general estaban resueltas para siempre.`,
    inLibrary: false,
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverImage: 'https://placehold.co/400x600.png',
    coverImageHint: 'monstruo relampago',
    content: `Te alegrará saber que ningún desastre ha acompañado el comienzo de una empresa que has considerado con tan malos presagios. Llegué aquí ayer, y mi primera tarea es asegurar a mi querida hermana mi bienestar y mi creciente confianza en el éxito de mi empresa.

Ya estoy muy al norte de Londres, y mientras camino por las calles de Petersburgo, siento una fría brisa del norte jugar en mis mejillas, lo que fortalece mis nervios y me llena de deleite. ¿Entiendes este sentimiento? Esta brisa, que ha viajado desde las regiones hacia las que avanzo, me da un anticipo de esos climas helados. Animado por este viento de promesa, mis ensoñaciones se vuelven más fervientes y vívidas. Intento en vano persuadirme de que el polo es la sede de la escarcha y la desolación; siempre se presenta a mi imaginación como la región de la belleza y el deleite.`,
    inLibrary: false,
  },
];
