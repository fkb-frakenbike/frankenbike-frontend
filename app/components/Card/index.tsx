'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13+
import { CardVariant } from '../../types';

type CardProps = {
  id?: string | number;
  variant: CardVariant;
  name: string;
  description: string;
  img?: string;
  likes: number;
  comments: number;
  className?: string;
  color?: string;
  userImg?: string;
  userName?: string;
  nature?: string;
  date?: string | Date;
};

const RANDOM_COLORS = [
  'bg-gradient-to-r from-blue-500 to-blue-600',
  'bg-gradient-to-r from-pink-500 to-pink-600',
  'bg-gradient-to-r from-green-400 to-green-600',
  'bg-gradient-to-r from-yellow-400 to-yellow-600',
  'bg-gradient-to-r from-red-400 to-red-600',
  'bg-gradient-to-r from-purple-500 to-pink-500',
];

function getRandomColor() {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

export default function CardComponent({
  id,
  variant,
  name,
  description,
  img,
  likes,
  comments,
  className = '',
  color,
  userImg,
  userName,
  nature,
}: CardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [randomColor, setRandomColor] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (variant === 'cardcolor') {
      setRandomColor(getRandomColor());
    }
  }, [variant]);

  let cardColor = color;
  if (!cardColor) {
    if (variant === 'cardcolor') {
      cardColor = randomColor || 'bg-gradient-to-r from-blue-500 to-blue-600';
    } else if (variant === 'purpleCard') {
      cardColor = 'bg-[#2C0857]';
    }
  }

  return (
    <div
      className={`h-80 w-64 sm:h-96 sm:w-72 md:h-[420px] md:w-80 ${cardColor} flex flex-col overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className} `}
    >
      {/* Afficher le name en haut pour purpleCard */}
      {variant === 'purpleCard' && (
        <div className="mb-2 px-3 pt-3 text-xl font-bold text-white drop-shadow sm:px-4 md:px-6">
          {name}
        </div>
      )}

      {/* Header pour cardcolor */}
      {variant === 'cardcolor' && (
        <div className="flex items-center gap-3 px-3 pt-3 sm:px-4 md:px-6">
          <img
            src={userImg}
            alt={userName}
            className="h-12 w-12 rounded-full border-2 border-white object-cover sm:h-14 sm:w-14"
          />
          <div>
            <div className="text-sm font-semibold text-white">{userName}</div>
          </div>
        </div>
      )}

      {/* PURPLECARD: nature d'abord, puis image */}
      {variant === 'purpleCard' && nature && (
        <div className="px-3 sm:px-4 md:px-6">
          <div className="mb-2 w-full text-center text-xs font-bold uppercase tracking-wide text-white">
            {nature}
          </div>
        </div>
      )}

      <div
        className={`relative w-full ${variant === 'cardcolor' ? 'mt-4' : 'mt-0'} ${variant === 'cardcolor' ? 'h-28 sm:h-36 md:h-40' : 'h-32 sm:h-40 md:h-48'} ${variant === 'purpleCard' ? 'px-3 sm:px-4 md:px-6' : ''} `}
      >
        <img src={img} alt={name} className="h-full w-full rounded-[30px] object-cover" />
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
        <div>
          {variant === 'cardcolor' && (
            <>
              <h5 className="mb-1 text-base font-semibold text-white drop-shadow sm:text-lg md:text-xl">
                {description}
              </h5>
              <p className="line-clamp-2 text-xs font-light text-white/90 sm:text-sm md:text-base">
                {name}
              </p>
            </>
          )}
          {variant === 'purpleCard' && (
            <>
              <h5 className="mb-2 mt-2 text-base font-semibold text-white drop-shadow sm:text-lg md:text-xl">
                {description}
              </h5>
              {/* Le name est déjà affiché en haut, donc on ne le remet pas ici */}
            </>
          )}
          {/* Bouton détails qui redirige vers /details */}
          <button
            className="mt-1 self-end text-xs text-white underline"
            onClick={() => router.push(`bike-components/${id}/details`)}
            type="button"
          >
            Détails
          </button>
        </div>
        {/* Icônes TOUJOURS EN BAS */}
        <div className="mt-auto flex items-center justify-between gap-1 pt-2 sm:gap-2">
          <button
            onClick={() => setIsLiked(v => !v)}
            className="flex min-w-[48px] items-center gap-1 rounded-full bg-white/90 px-2 py-1 transition-colors duration-200 hover:bg-white sm:min-w-[70px] sm:gap-2 sm:px-3 sm:py-1"
          >
            <img src={'/SvgSite/like.png'} alt="Like" className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-black sm:text-base">
              {likes + (isLiked ? 1 : 0)}
            </span>
          </button>
          <div className="flex min-w-[48px] items-center gap-1 rounded-full bg-white/90 px-2 py-1 sm:min-w-[70px] sm:gap-2 sm:px-3 sm:py-1">
            <img src="/SvgSite/comment.png" alt="Commentaire" className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-black sm:text-base">{comments}</span>
          </div>
          <button
            onClick={() => setIsSaved(v => !v)}
            className="flex min-w-[28px] items-center gap-1 rounded-full bg-white/90 px-1 py-1 transition-colors duration-200 hover:bg-white sm:min-w-[36px] sm:px-2 sm:py-1"
          >
            <img
              src={'/SvgSite/save.png'}
              alt="Enregistrer"
              className="mx-auto h-4 w-4 sm:h-5 sm:w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
