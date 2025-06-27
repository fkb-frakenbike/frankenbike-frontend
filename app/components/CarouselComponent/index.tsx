'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import CardComponent from "../CardComponent";

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

const CARDS_TO_SHOW = {
  base: 1,
  lg: 3,
};

export default function Carousel({ data }: CarouselProps) {
  const [active, setActive] = useState(0);

  const getCardsToShow = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return CARDS_TO_SHOW.lg;
    return CARDS_TO_SHOW.base;
  };

  const getVisibleIndices = () => {
    const n = getCardsToShow();
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
    <div className="relative flex flex-col items-center w-full">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
      >
        ›
      </button>
      <div className="flex items-center justify-center w-full overflow-visible">
        {visibleIndices.map((idx, i) => {
          const center = Math.floor(visibleIndices.length / 2);
          const offset = i - center;
          const isActive = idx === active;

          return (
            <motion.div
              key={idx}
              className={`
                transition-all duration-300
                ${isActive ? "z-20 scale-100" : "z-10 scale-90 opacity-80"}
                ${offset < 0 ? "-ml-8 md:-ml-12 lg:-ml-20" : offset > 0 ? "-mr-8 md:-mr-12 lg:-mr-20" : ""}
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
