export type CardVariant = "cardcolor" | "purpleCard";

export type CardData = {
  id?: number; // Id optionnel si certains composants ne l'utilisent pas
  name: string;
  description: string;
  category?: string;
  origin?: string;
  img?: string;
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
  projectId?: number; // si nécessaire
  title?: string;     // si nécessaire
  text?: string;      // si nécessaire
};