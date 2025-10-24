'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card';
import { CardData } from '../../types';

// Types

type CarouselProps = {
  data: CardData[];
};

function useCardsToShow() {
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsToShow(3); // xl et plus
      } else if (width >= 1024) {
        setCardsToShow(2); // lg
      } else {
        setCardsToShow(1); // mobile & tablette
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsToShow;
}

export default function Carousel({ data }: CarouselProps) {
  console.log('Carousel data:', data);
  const [active, setActive] = useState(0);
  const cardsToShow = useCardsToShow();

  console.log('data', data);

  // Calcul des indices des cartes à afficher
  const getVisibleIndices = () => {
    const n = cardsToShow;
    const indices = [];

    for (let i = 0; i < n; i++) {
      const idx = (active + i) % data.length;
      indices.push(idx);
    }

    return indices;
  };

  const handlePrev = () => setActive(prev => (prev - 1 + data.length) % data.length);
  const handleNext = () => setActive(prev => (prev + 1) % data.length);

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative flex min-h-[480px] w-full items-center justify-center py-8">
      {/* Flèche gauche */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        aria-label="Carte précédente"
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Cartes avec swipe */}
      <motion.div
        className="flex w-full cursor-grab items-center justify-center gap-x-2 px-12 active:cursor-grabbing lg:gap-x-4"
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

          let marginClass = '';
          if (offset < 0) {
            marginClass = '-ml-8 md:-ml-12 lg:-ml-20';
          } else if (offset > 0) {
            marginClass = '-mr-8 md:-mr-12 lg:-mr-20';
          }

          return (
            <motion.div
              key={`${idx}-${i}`}
              className={`transition-all duration-300 ${isActive ? 'z-20' : 'z-10'} ${marginClass}`}
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
              <Card key={data[idx].id} {...data[idx]} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Flèche droite */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        aria-label="Carte suivante"
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Informations sur l'utilisation */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500">
        <p className="lg:hidden">👈 Swipe pour naviguer 👉</p>
        <p className="hidden lg:block">Cliquez sur les boutons ou glissez pour naviguer</p>
      </div>
    </div>
  );
}
