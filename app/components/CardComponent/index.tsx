'use client'
import { useState, useEffect } from "react";

type CardVariant = "cardcolor" | "purpleCard";

type CardProps = {
  variant: CardVariant;
  title: string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  className?: string;
  color?: string;
  userImg?: string;
  userName?: string;
  date?: string;
  nature?: string;
};

const RANDOM_COLORS = [
  "bg-gradient-to-r from-blue-500 to-blue-600",
  "bg-gradient-to-r from-pink-500 to-pink-600",
  "bg-gradient-to-r from-green-400 to-green-600",
  "bg-gradient-to-r from-yellow-400 to-yellow-600",
  "bg-gradient-to-r from-red-400 to-red-600",
  "bg-gradient-to-r from-purple-500 to-pink-500",
];

function getRandomColor() {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

export default function CardComponent({
  variant,
  title,
  text,
  img,
  likes,
  comments,
  className = "",
  color,
  userImg,
  userName,
  date,
  nature,
}: CardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [randomColor, setRandomColor] = useState<string | null>(null);

  useEffect(() => {
    if (variant === "cardcolor") {
      setRandomColor(getRandomColor());
    }
  }, [variant]);

  let cardColor = color;
  if (!cardColor) {
    if (variant === "cardcolor") {
      cardColor = randomColor || "bg-gradient-to-r from-blue-500 to-blue-600";
    } else if (variant === "purpleCard") {
      cardColor = "bg-[#2C0857]";
    }
  }

  return (
  <div
    className={`
      w-64 h-80
      sm:w-72 sm:h-96
      md:w-80 md:h-[420px]
      ${cardColor}
      rounded-xl shadow-xl flex flex-col overflow-hidden
      transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
      ${className}
    `}
  >
    {/* Header pour cardcolor */}
    {variant === "cardcolor" && (
      <div className="flex items-center gap-3 px-3 pt-3 sm:px-4 md:px-6">
        <img
          src={userImg}
          alt={userName}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
        />
        <div>
          <div className="text-white font-semibold text-sm">{userName}</div>
          <div className="text-white/70 text-xs">{date}</div>
        </div>
      </div>
    )}

    {/* PURPLECARD: nature d'abord, puis image */}
    {variant === "purpleCard" && nature && (
      <div className="px-3 pt-3 sm:px-4 md:px-6">
       <div className="mb-2 text-xs font-bold text-white uppercase tracking-wide text-center w-full">{nature}</div>
      </div>
    )}

    <div
      className={`relative w-full 
        ${variant === "cardcolor" ? "mt-4" : "mt-2"} 
        ${variant === "cardcolor" ? "h-28 sm:h-36 md:h-40" : "h-32 sm:h-40 md:h-48"}
        ${variant === "purpleCard" ? "px-3 sm:px-4 md:px-6" : ""}
      `}
    >
      <img
        src={img}
        alt={title}
        className="object-cover w-full h-full rounded-[30px]"
      />
    </div>

    {/* Contenu */}
    <div className="flex-1 flex flex-col justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
      <div>
        {/* Pour cardcolor : titre et bio */}
        {variant === "cardcolor" && (
          <>
            <h5 className="mb-2 font-semibold text-white drop-shadow text-base sm:text-lg md:text-xl">{title}</h5>
            <p className="font-light text-white/90 text-xs sm:text-sm md:text-base">{text}</p>
          </>
        )}
        {/* Pour purpleCard : titre et bio en dessous de l'image */}
        {variant === "purpleCard" && (
          <>
            <h5 className="mt-2 mb-2 font-semibold text-white drop-shadow text-base sm:text-lg md:text-xl">{title}</h5>
            <p className="font-light text-white/90 text-xs sm:text-sm md:text-base">{text}</p>
          </>
        )}
      </div>
      {/* Icônes */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 mt-3 sm:mt-4">
        <button
          onClick={() => setIsLiked((v) => !v)}
          className="flex items-center bg-white/90 hover:bg-white rounded-full transition-colors duration-200 px-2 py-1 sm:px-3 sm:py-1 min-w-[48px] sm:min-w-[70px] gap-1 sm:gap-2"
        >
          <img
            src={"/SvgSite/like.png"}
            alt="Like"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="font-bold text-black text-xs sm:text-base">{likes + (isLiked ? 1 : 0)}</span>
        </button>
        <div className="flex items-center bg-white/90 rounded-full px-2 py-1 sm:px-3 sm:py-1 min-w-[48px] sm:min-w-[70px] gap-1 sm:gap-2">
          <img src="/SvgSite/comment.png" alt="Commentaire" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-bold text-black text-xs sm:text-base">{comments}</span>
        </div>
        <button
          onClick={() => setIsSaved((v) => !v)}
          className="flex items-center bg-white/90 hover:bg-white rounded-full transition-colors duration-200 px-1 py-1 sm:px-2 sm:py-1 min-w-[28px] sm:min-w-[36px] gap-1"
        >
          <img
            src={"/SvgSite/save.png"}
            alt="Enregistrer"
            className="w-4 h-4 sm:w-5 sm:h-5 mx-auto"
          />
        </button>
      </div>
    </div>
  </div>
);

}
