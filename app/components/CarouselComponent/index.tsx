'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardComponent from "../CardComponent";

// Type pour les données d'une carte
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
    // Le parent doit avoir une hauteur fixe ou min-h adaptée à la taille de tes cartes !
   <div className="flex items-center w-full min-h-[420px] gap-x-2 lg:gap-x-8">
  {/* Flèche gauche */}
  <button
    onClick={handlePrev}
    className="z-30 bg-white rounded-full p-3 shadow text-2xl"
    aria-label="Carte précédente"
    type="button"
  >
    ‹
  </button>

  {/* Cartes */}
  <div className="flex items-center justify-center flex-1 overflow-visible">
    {visibleIndices.map((idx, i) => {
      const center = Math.floor(visibleIndices.length / 2);
      const offset = i - center;
      const isActive = idx === active;

      return (
        <motion.div
          key={`${idx}-${i}`}
          className={`
            transition-all duration-300
            ${isActive ? "z-20 scale-100" : "z-10 scale-90 opacity-80"}
            ${offset < 0 ? "-ml-4 md:-ml-8 lg:-ml-12" : offset > 0 ? "-mr-4 md:-mr-8 lg:-mr-12" : ""}
          `}
          style={{
            pointerEvents: isActive ? "auto" : "none",
          }}
          animate={{
            scale: isActive ? 1 : 0.9,
            opacity: isActive ? 1 : 0.8,
            zIndex: isActive ? 20 : 10,
          }}
        >
          <CardComponent {...data[idx]} />
        </motion.div>
      );
    })}
  </div>

  {/* Flèche droite */}
  <button
    onClick={handleNext}
    className="z-30 bg-white rounded-full p-3 shadow text-2xl"
    aria-label="Carte suivante"
    type="button"
  >
    ›
  </button>
</div>

  );
}
