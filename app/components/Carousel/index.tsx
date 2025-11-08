'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card';
import { CardData } from '../../types/card';

type CarouselProps = {
  data: CardData[];
  vertical?: boolean;
};

function useCardsToShow() {
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsToShow(3);
      } else if (width >= 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsToShow;
}

export default function Carousel({ data, vertical = false }: CarouselProps) {
  const [active, setActive] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardsToShow = useCardsToShow();

  // Si data vide, ne rien afficher
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500"></p>;
  }

  // Calcul des indices visibles avec protection data.length > 0
  const getVisibleIndices = () => {
    const n = cardsToShow;
    const indices = [];
    for (let i = 0; i < n; i++) {
      const idx = (active + i) % data.length;
      indices.push(idx);
    }
    return indices;
  };

  const handlePrev = () => {
    setActive(prev => (prev - 1 + data.length) % data.length);
    setSwipeDirection('right');
  };
  const handleNext = () => {
    setActive(prev => (prev + 1) % data.length);
    setSwipeDirection('left');
  };

  const dragDirection = vertical ? 'y' : 'x';
  const dragConstraints = vertical ? { top: 0, bottom: 0 } : { left: 0, right: 0 };
  const swipeThreshold = 50;

  const visibleIndices = getVisibleIndices();

  return (
    <div className={`relative flex min-h-[480px] w-full items-center justify-center py-8`}>
      {/* Bouton précédent */}
      <button
        onClick={handlePrev}
        className={`absolute ${
          vertical ? 'left-1/2 top-0 -translate-x-1/2' : 'left-0 top-1/2 -translate-y-1/2'
        } z-20 flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl`}
        aria-label="Carte précédente"
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={vertical ? 'M5 15l7-7 7 7' : 'M15 19l-7-7 7-7'}
          />
        </svg>
      </button>

      {/* Cartes */}
      <motion.div
        className={`flex w-full cursor-grab gap-x-2 px-12 active:cursor-grabbing lg:gap-x-4 ${
          vertical ? 'flex-col' : 'flex-row'
        } items-center justify-center`}
        drag={dragDirection}
        dragConstraints={dragConstraints}
        onDragEnd={(event, info) => {
          const offset = vertical ? info.offset.y : info.offset.x;
          if (offset > swipeThreshold) handlePrev();
          else if (offset < -swipeThreshold) handleNext();
        }}
      >
        {visibleIndices.map((idx, i) => {
          const card = data[idx];
          if (!card) return null;
          const isActive = idx === active;

          let marginClass = '';
          if (swipeDirection === 'left') {
            marginClass = '-ml-8 md:-ml-12 lg:-ml-20';
          } else if (swipeDirection === 'right') {
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
              <Card {...card} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bouton suivant */}
      <button
        onClick={handleNext}
        className={`absolute ${
          vertical ? 'bottom-0 left-1/2 -translate-x-1/2' : 'right-0 top-1/2 -translate-y-1/2'
        } z-20 flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl`}
        aria-label="Carte suivante"
        type="button"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={vertical ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
          />
        </svg>
      </button>

      {/* Informations */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500">
        {vertical ? (
          <p>Swipe vertical pour naviguer</p>
        ) : (
          <p className="lg:hidden">👈 Swipe horizontal pour naviguer 👉</p>
        )}
        <p className="hidden lg:block">Cliquez sur les boutons ou glissez pour naviguer</p>
      </div>
    </div>
  );
}
