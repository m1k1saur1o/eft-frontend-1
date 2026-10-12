// Catálogo inicial de demostración.
// Los precios son valores ficticios en pesos chilenos (CLP) y no representan
// precios comerciales reales ni inventario disponible.
// La propiedad `image` es una ruta relativa a un archivo existente en img/.
export const initialGames = [
  {
    id: 'gta-6',
    name: 'Grand Theft Auto VI',
    category: 'Acción',
    price: 69990,
    platform: 'PS5 · Xbox Series X|S',
    description:
      'Regresa a Vice City en un mundo abierto lleno de detalles, persecuciones y una historia criminal a dos voces.',
    image: 'img/gta 6.jpeg',
    tag: 'Destacado',
  },
  {
    id: 'wolverine',
    name: "Marvel's Wolverine",
    category: 'Acción',
    price: 64990,
    platform: 'PS5',
    description:
      'Encarna a Logan en una aventura brutal y cinematográfica, con garras de adamantium y combate sin concesiones.',
    image: 'img/wolverine.jpg',
  },
  {
    id: 'crimson-desert',
    name: 'Crimson Desert',
    category: 'Aventura',
    price: 59990,
    platform: 'PS5 · Xbox Series X|S · PC',
    description:
      'Explora el vasto continente de Pywel como Kliff, un mercenario que lucha por sobrevivir en un mundo hostil.',
    image: 'img/crimson desert.jpeg',
  },
  {
    id: 'ea-sports-fc-26',
    name: 'EA Sports FC 26',
    category: 'Deportes',
    price: 54990,
    platform: 'PS5 · Xbox Series X|S · PC',
    description:
      'Clubes, ligas y jugadores de todo el mundo en la nueva entrega del simulador de fútbol de EA Sports.',
    image: 'img/ea sports fc 26.jpeg',
    tag: 'Oferta',
  },
  {
    id: 'silent-hill-townfall',
    name: 'Silent Hill: Townfall',
    category: 'Terror',
    price: 44990,
    platform: 'PS5 · PC',
    description:
      'Niebla, ruido de radio y un pueblo que esconde secretos. Terror psicológico en estado puro.',
    image: 'img/silent hill.jpg',
  },
  {
    id: 'super-mario-odyssey',
    name: 'Super Mario Odyssey',
    category: 'Plataformas',
    price: 49990,
    platform: 'Nintendo Switch',
    description:
      'Viaja por reinos sorprendentes junto a Cappy y rescata a la princesa Peach en un clásico de las plataformas 3D.',
    image: 'img/super mario odyssey.jpg',
  },
];
