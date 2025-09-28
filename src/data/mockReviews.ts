// data/mockReviews.ts
import type { ReviewItem } from '../types/ReviewItem';

export const mockReviews: ReviewItem[] = [
  {
    id: '1',
    name: 'John Clark',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    comment:
      'Todo lo que se espera de la rumba salsera latinoamericana se encuentra en este lugar: las instalaciones, la música y sobre todo el ambiente.',
  },
  {
    id: '2',
    name: 'María López',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    comment:
      'Un lugar increíble para compartir con amigos. El servicio es excelente y la música siempre te pone a bailar. ¡Recomendado!',
  },
  {
    id: '3',
    name: 'Carlos Méndez',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    comment:
      'He visitado varios lugares similares, pero este definitivamente tiene un toque especial. La atmósfera es única.',
  },
];
