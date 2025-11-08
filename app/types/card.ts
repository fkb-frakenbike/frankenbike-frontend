import { Component } from './component';

export type CardVariant = 'cardcolor' | 'purpleCard';

export type CardData = {
  id?: number; // Id optionnel si certains composants ne l'utilisent pas
  name: string;
  description: string;
  category?: string;
  origin?: string;
  img?: string; //photo
  likes: number;
  comments: number;
  userImg?: string;
  userName?: string;
  nature?: string;
  variant: CardVariant;
  projectName?: string;
  date?: string | Date;
  className?: string;
  color?: string;
  //  projectId?: number; // si nécessaire
  //  title?: string;     // si nécessaire
  //  text?: string;      // si nécessaire
};

export function mapApiComponentToCardData(apiComponent: Component): CardData {
  return {
    id: apiComponent.id,
    name: apiComponent.name,
    description: apiComponent.description,
    img: apiComponent.photoS3Key,
    likes: apiComponent.likes ?? 0,
    comments: apiComponent.comments ?? 0,
    variant: 'purpleCard',
    // autres champs...
  };
}
