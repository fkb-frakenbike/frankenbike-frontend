// CarouselComponent.jsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card';

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
  variant: 'cardcolor' | 'purpleCard';
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      const idx = (active + i + data.length) % data.length;
      indices.push(idx);
    }
    return n === 1 ? [active] : indices;
  };

  const handlePrev = () => setActive(prev => (prev - 1 + data.length) % data.length);
  const handleNext = () => setActive(prev => (prev + 1) % data.length);

  const visibleIndices = getVisibleIndices();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 py-8">
      {/* Contrôles de navigation */}
      <div className="flex items-center space-x-6">
        {/* Bouton précédent */}
        <button
          onClick={handlePrev}
          className="flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          aria-label="Carte précédente"
          type="button"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 4 cercles de navigation */}

        {/* Bouton suivant */}
        <button
          onClick={handleNext}
          className="flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          aria-label="Carte suivante"
          type="button"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Cartes avec swipe */}
      <motion.div
        className="flex cursor-grab items-center justify-center gap-x-2 px-8 active:cursor-grabbing lg:gap-x-4"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(event, info) => {
          const threshold = 50;
          if (info.offset.y > threshold) {
            handlePrev();
          } else if (info.offset.y < -threshold) {
            handleNext();
          }
        }}
      >
        {visibleIndices.map((idx, i) => {
          // const center = Math.floor(visibleIndices.length / 2);
          // const offset = i - center;
          const isActive = idx === active;

          return (
            <motion.div
              key={`${idx}-${i}`}
              className={`transition-all duration-300 ${isActive ? 'z-20' : 'z-10'} `}
              style={{
                pointerEvents: 'auto',
              }}
              animate={{
                scale: 1,
                opacity: 1,
                zIndex: isActive ? 20 : 10,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Card {...data[idx]} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Informations sur l'utilisation */}
      <div className="text-center text-sm text-gray-500">
        <p className="lg:hidden">👈 Swipe pour naviguer 👉</p>
        <p className="hidden lg:block">Cliquez sur les boutons ou glissez pour naviguer</p>
      </div>
    </div>
  );
}
