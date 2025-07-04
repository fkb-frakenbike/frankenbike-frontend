'use client'
import Image from "next/image";

type DetailsProps = {
  img: string;
  title: string;
  text: string; // biographie ou description longue
};

export default function CardDetailsPage({ img, title, text }: DetailsProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#2C0857] to-purple-400 p-6">
      {/* Côté gauche : image + titre */}
      <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
        {/* Plus d'espace au-dessus de l'image sur mobile */}
        <div className="mt-12 md:mt-0 w-52 h-52 md:w-80 md:h-80 rounded-[30px] overflow-hidden shadow-xl bg-white">
          <Image
            src={img}
            alt={title}
            width={320}
            height={320}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        {/* Titre : petit sur mobile, grand sur desktop */}
        <h1 className="mt-4 text-lg md:text-3xl font-bold text-white drop-shadow text-center">{title}</h1>
      </div>

      {/* Côté droit : biographie/texte */}
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10 max-w-xl w-full">
          <h2 className="text-base md:text-xl font-semibold text-purple-900 mb-4">Biographie</h2>
          <p className="text-gray-800 text-sm md:text-lg whitespace-pre-line">{text}</p>
        </div>
      </div>
    </div>
  );
}
