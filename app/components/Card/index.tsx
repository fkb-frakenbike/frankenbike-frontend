'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardData } from '../../types/card';
import Link from 'next/link';
import Image from 'next/image';

type CardProps = CardData & {
  className?: string;
};

const RANDOM_COLORS = [
  'bg-gradient-to-r from-blue-500 to-blue-600',
  'bg-gradient-to-r from-pink-500 to-pink-600',
  'bg-gradient-to-r from-green-400 to-green-600',
  'bg-gradient-to-r from-yellow-400 to-yellow-600',
  'bg-gradient-to-r from-red-400 to-red-600',
  'bg-gradient-to-r from-purple-500 to-pink-500',
];

function truncateDescription(text: string | undefined, maxLength: number = 20): string {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength).trim() + '...';
}

function getRandomColor() {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

export default function CardComponent({
  id,
  projectId,
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
  date,
}: CardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [randomColor, setRandomColor] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
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

  // Fallbacks images et alt
  const safeImg = img && img.trim() !== '' ? img.trim() : '/defaultImage.png';
  const safeUserImg = userImg ?? '/defaultUser.png';
  const safeAltUser = userName ?? 'User avatar';
  const safeAlt = name ?? 'Image';

  // Format affichage date
  function formatDisplayDate(date: string | Date | undefined): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  const displayDate = formatDisplayDate(date);

  return (
    <div
      className={`relative h-80 w-64 sm:h-96 sm:w-72 md:h-[420px] md:w-80 ${cardColor} 
      flex flex-col rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}
      ${variant === 'cardcolor' ? 'cursor-pointer' : ''}`} // ✅ Seulement cardcolor cliquable
      onClick={() => {
        // ✅ Navigation seulement pour les cartes du feed (cardcolor)
        if (variant === 'cardcolor') {
          router.push(`/timeline?projectId=${projectId}`);
        }
      }}
    >
      {/* POPUP - seulement pour cardcolor */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div 
            className="w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:w-3/4 md:max-w-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-lg text-gray-700">{description}</p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="flex-1 rounded-lg bg-gray-200 px-6 py-2 text-gray-800 transition hover:bg-gray-300"
              >
                Fermer
              </button>
              <Link
                href={`/timeline?projectId=${projectId}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-center text-white transition hover:bg-blue-700"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* HEADER USER & DATE */}
      {variant === 'purpleCard' && (
        <div className="mb-2 px-3 pt-3 text-xl font-bold text-white drop-shadow sm:px-4 md:px-6">
          {name}
          {displayDate && (
            <div className="absolute -top-10 right-2 z-20 rounded-full bg-white/70 p-2 text-right text-xs text-black shadow-xl">
              {displayDate}
            </div>
          )}
        </div>
      )}

      {variant === 'cardcolor' && (
        <div className="flex items-center gap-3 px-3 pt-3 sm:px-4 md:px-6">
          <Image
            src={safeUserImg}
            alt={safeAltUser}
            width={56}
            height={56}
            className="rounded-full border-2 border-white object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-white">{userName}</div>
            {displayDate && <div className="text-xs text-white">{displayDate}</div>}
          </div>
        </div>
      )}

      {/* IMAGE */}
      <div
        className={`relative w-full ${variant === 'cardcolor' ? 'mt-4' : 'mt-0'} ${variant === 'cardcolor' ? 'h-28 sm:h-36 md:h-40' : 'h-32 sm:h-40 md:h-48'} ${variant === 'purpleCard' ? 'px-3 sm:px-4 md:px-6' : ''}`}
      >
        <Image
          src={safeImg}
          alt={safeAlt}
          fill
          className="object-cover rounded-[30px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
        <div>
          {variant === 'cardcolor' && (
            <>
              <h5 
                className="mb-1 text-base font-semibold text-white drop-shadow cursor-pointer hover:underline sm:text-lg md:text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowPopup(true);
                }}
              >
                {truncateDescription(description)}
              </h5>
              <p className="line-clamp-2 text-xs font-light text-white/90 sm:text-sm md:text-base">
                {name}
              </p>
            </>
          )}
          {variant === 'purpleCard' && (
            <>
              <h5 className="mb-2 mt-2 text-base font-semibold text-white drop-shadow sm:text-lg md:text-xl">
                {truncateDescription(description)}
              </h5>
            </>
          )}
          {/* ✅ BOUTON DÉTAILS INTELLIGENT */}
          <button
            className="mt-1 self-end text-xs text-white underline"
            onClick={(e) => {
              e.stopPropagation();
              if (variant === 'purpleCard') {
                // ✅ Sur timeline : détails du composant
                router.push(`/bike-components/${id}/details`);
              } else {
                // ✅ Sur feed : timeline du projet
                router.push(`/timeline?projectId=${projectId}`);
              }
            }}
            type="button"
          >
            Détails
          </button>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center justify-between gap-1 pt-2 sm:gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(v => !v);
            }}
            className="flex min-w-[48px] items-center gap-1 rounded-full bg-white/90 px-2 py-1 transition-colors duration-200 hover:bg-white sm:min-w-[70px] sm:gap-2 sm:px-3 sm:py-1"
          >
            <Image src={'/SvgSite/like.png'} alt="Like" width={20} height={20} className="mx-auto" />
            <span className="text-xs font-bold text-black sm:text-base">
              {likes + (isLiked ? 1 : 0)}
            </span>
          </button>
          <div className="flex min-w-[48px] items-center gap-1 rounded-full bg-white/90 px-2 py-1 sm:min-w-[70px] sm:gap-2 sm:px-3 sm:py-1">
            <Image src="/SvgSite/comment.png" alt="Commentaire" width={20} height={20} className="mx-auto" />
            <span className="text-xs font-bold text-black sm:text-base">{comments}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert('Fonctionnalité de sauvegarde non implémentée');
            }}
            className="flex min-w-[28px] items-center gap-1 rounded-full bg-white/90 px-1 py-1 transition-colors duration-200 hover:bg-white sm:min-w-[36px] sm:px-2 sm:py-1"
          >
            <Image src={'/SvgSite/save.png'} alt="Enregistrer" width={20} height={20} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
