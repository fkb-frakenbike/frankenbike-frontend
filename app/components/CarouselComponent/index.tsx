// CarouselComponent.jsx
'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardComponent from "../CardComponent";

// Types
type CardData = {
  title: string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  userImg?: string;
  userName?: string;
  date?: string | Date;
  nature?: string;
  variant: "cardcolor" | "purpleCard";
};

type CarouselProps = {
  data: CardData[];
};

function useCardsToShow() {
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    function handleResize() {
      setCardsToShow(window.innerWidth >= 1024 ? 3 : 1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cardsToShow;
}

export default function Carousel({ data }: CarouselProps) {
  const [active, setActive] = useState(0);
  const cardsToShow = useCardsToShow();

  // Calcul des indices des cartes à afficher
  const getVisibleIndices = () => {
    const n = cardsToShow;
    const half = Math.floor(n / 2);
    const indices = [];
    for (let i = -half; i <= half; i++) {
      let idx = (active + i + data.length) % data.length;
      indices.push(idx);
    }
    return n === 1 ? [active] : indices;
  };

  const handlePrev = () => setActive((prev) => (prev - 1 + data.length) % data.length);
  const handleNext = () => setActive((prev) => (prev + 1) % data.length);

  const visibleIndices = getVisibleIndices();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 space-y-8">
      {/* Contrôles de navigation */}
      <div className="flex items-center space-x-6">
        {/* Bouton précédent */}
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          aria-label="Carte précédente"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 4 cercles de navigation */}
       

        {/* Bouton suivant */}
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          aria-label="Carte suivante"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Cartes avec swipe */}
      <motion.div
        className="flex justify-center items-center gap-x-2 lg:gap-x-4 px-8 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          const threshold = 50;
          if (info.offset.x > threshold) {
            handlePrev();
          } else if (info.offset.x < -threshold) {
            handleNext();
          }
        }}
      >
        {visibleIndices.map((idx, i) => {
          const center = Math.floor(visibleIndices.length / 2);
          const offset = i - center;
          const isActive = idx === active;

          return (
            <motion.div
              key={`${idx}-${i}`}
              className={`
                transition-all duration-300
                ${isActive ? "z-20" : "z-10"}
              `}
              style={{
                pointerEvents: "auto",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                zIndex: isActive ? 20 : 10,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <CardComponent {...data[idx]} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Informations sur l'utilisation */}
      <div className="text-center text-gray-500 text-sm">
        <p className="lg:hidden">👈 Swipe pour naviguer 👉</p>
        <p className="hidden lg:block">Cliquez sur les boutons ou glissez pour naviguer</p>
      </div>
    </div>
  );
}