'use client'
import React from "react";
import Carousel from "../CarouselComponent"; // adapte le chemin si besoin
import CardComponent from "../CardComponent";

// Typage strict pour n'accepter que les purple cards
type CardVariant = "purpleCard";
type CardData = {
  title: string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  userImg: string;
  userName: string;
  nature: string;
  variant: CardVariant;
};

// Exemple de données (remplace par tes vraies données)
const timelineData: CardData[] = [
  {
    title: "Titre 1",
    text: "Biographie ou texte du post 1...",
    img: "/bikeCustom.png",
    likes: 10,
    comments: 2,
    userImg: "/user1.jpg",
    userName: "Alice",
    nature: "Wheels",
    variant: "purpleCard"
  },
  {
    title: "Titre 2",
    text: "Biographie ou texte du post 2...",
    img: "/bikeCustom.png",
    likes: 5,
    comments: 1,
    userImg: "/user2.jpg",
    userName: "Bob",
    nature: "Saddle",
    variant: "purpleCard"
  },
  // Ajoute autant de cartes purple que tu veux
];

export default function TimelinePage() {
  // Filtrer pour ne garder que les cartes purpleCard (sécurité supplémentaire)
  const purpleCards = timelineData.filter(card => card.variant === "purpleCard");

  return (
<div className="min-h-screen bg-gradient-to-br from-[#2C0857] to-purple-400 p-2 flex flex-col gap-4">
  {/* Titre Timeline centré */}
  <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow text-center mt-16 mb-4">
    Timeline
  </h1>

  {/* Bloc projet + utilisateur centré sous Timeline */}
  <div className="flex justify-center items-center gap-6 mb-0">
    <span className="text-xl font-bold text-white">Tiger Bike</span>
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-white">Alice</span>
      <img
        src="/alice.jpg"
        alt="Profil"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
      />
    </div>
  </div>

  {/* Carousel : pas de mt ni mb ici */}
  <Carousel data={purpleCards} />
</div>


  );
}
