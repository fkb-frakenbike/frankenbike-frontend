import Feed from '../components/Feed';

import CardComponent from '../components/CardComponent';
import Carousel from '../components/CarouselComponent';

type CardData = {
  title: string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  userImg?: string;
  userName?: string;
  date?: string;
  variant: "cardcolor" | "purpleCard";
  nature?: string;
};

const cardsData : CardData[] = [
  {
    title: "Vélo tigre",
    text: "J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls",
    img: "/bikeCustom.png",
    likes: 12,
    comments: 3,
    userImg: "/alice.jpg",
    userName: "Alice",
    date: "2025-06-27",
    variant: "cardcolor", // <-- OK
  },
  {
    title: "Titre 2",
    text: "Description 2",
    img: "/bikeCustom.png",
    likes: 5,
    comments: 1,
    userImg: "/alice.jpg",
    userName: "Bob",
    date: "2025-06-20",
    variant: "cardcolor", // <-- OK
    nature: "Selle",
  },
];

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="w-full max-w-2xl px-4 pt-16">
    

          <Carousel data={cardsData} />
        
      </div>
    </div>
  );
}
