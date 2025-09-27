export interface ProductMarketplace {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  seller: string;
}

export const featuredProducts: ProductMarketplace[] = [
  {
    id: 1,
    title: '¡Ay que solo estoy!',
    category: 'Carteles | Afiches',
    price: 15000,
    image: '/images/poster1.png',
    description: 'Cartel inspirado en la cultura caleña.',
    seller: 'La Linterna',
  },
  {
    id: 2,
    title: 'Salsa Viva',
    category: 'Carteles | Afiches',
    price: 30000,
    image: '/images/poster2.png',
    description: 'Ilustración inspirada en la salsa brava.',
    seller: 'La Linterna',
  },
];

export const cartelesAfiches: ProductMarketplace[] = [
  {
    id: 3,
    title: '¡Ay que solo estoy!',
    category: 'Carteles | Afiches',
    price: 60000,
    image: '/images/poster3.png',
    description: 'Cartel de colección de La Linterna.',
    seller: 'La Linterna',
  },
  {
    id: 4,
    title: 'Poster Retro Salsa',
    category: 'Carteles | Afiches',
    price: 55000,
    image: '/images/poster4.png',
    description: 'Ilustración retro de músicos de salsa.',
    seller: 'La Linterna',
  },
];

export const artesanias: ProductMarketplace[] = [
  {
    id: 5,
    title: 'Máscara de Carnaval',
    category: 'Artesanías',
    price: 80000,
    image: '/images/artesanias1.png',
    description: 'Máscara artesanal hecha a mano.',
    seller: 'Artesanos de Cali',
  },
  {
    id: 6,
    title: 'Sombrero Vueltiao',
    category: 'Artesanías',
    price: 120000,
    image: '/images/artesanias2.png',
    description: 'Sombrero típico colombiano.',
    seller: 'Artesanos de Cali',
  },
];
