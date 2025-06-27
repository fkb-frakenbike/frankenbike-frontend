import Feed from '../components/Feed';
<<<<<<< HEAD
import CardComponent from '../components/CardComponent'
=======

import CardComponent from '../components/CardComponent';
import Carousel from '../components/CarouselComponent';

const cardsData = [
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
    img: "/img2.jpg",
    likes: 5,
    comments: 1,
    userImg: "/user2.jpg",
    userName: "Bob",
    date: "2025-06-20",
    variant: "purpleCard", // <-- OK
    nature: "Selle",
  },
];
>>>>>>> 42a8384 (feat(FKB-51: mistake I used the wrong branch, I do a comit for save what i did)

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="w-full max-w-2xl px-4 pt-16">
<<<<<<< HEAD
        <Feed />
        <CardComponent />
=======
    

          <Carousel data={cardsData} />
            <CardComponent
              variant="cardcolor"
              title="Vélo tigre"
              text="J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls"
              img="/bikeCustom.png"
              likes={42}
              comments={7}
              userImg="/alice.jpg"
              userName="Alice"
              date="27 juin 2025"
            />

    <CardComponent
      variant="purpleCard"
      title="Veélo tigre"
      text="J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls"
      img="/bikeCustom.png"
      likes={120}
      comments={15}
      nature="Selle"
    />

>>>>>>> 42a8384 (feat(FKB-51: mistake I used the wrong branch, I do a comit for save what i did)
      </div>
    </div>
  );
}
