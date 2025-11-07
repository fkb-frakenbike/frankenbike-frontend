'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from '../../lib/axios';

export type DetailsProps = {
  img: string;
  title: string;
  text: string;
  comment?: string;
};

type Props = {
  id: string;
};

export default function ComponentDetailsWrapper({ id }: Props) {
  const [component, setComponent] = useState<DetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Condition validée en variable pour garder l'appel des hooks en haut
  const isValidId = id && /^\d+$/.test(id);

  useEffect(() => {
    if (!isValidId) return; // Effet conditionné à l'intérieur du hook

    const fetchComponent = async () => {
      try {
        const res = await api.get(`/api/components/${id}`);
        setComponent({
          img: res.data.img || "/defaultImage.png",
          title: res.data.name,
          text: res.data.description,
          comment: "Commentaire statique pour l’instant",
        });
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        const message =
          err.response?.data?.message ||
          err.message ||
          "Erreur lors du chargement du composant";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [id, isValidId]); // useEffect toujours appelé même si id invalide

  if (!isValidId) return <p className="text-red-500">ID de composant invalide</p>;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!component) return <p>Aucun composant trouvé.</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#2C0857] to-purple-400 p-6 relative pt-24 md:pt-0">
      {/* Côté gauche : image + titre */}
      <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
        <div className="mt-12 md:mt-0 w-52 h-32 md:w-[350px] md:h-[220px] lg:w-[449px] lg:h-[283px] xl:w-[449px] xl:h-[283px] 2xl:w-[449px] 2xl:h-[283px] rounded-[30px] overflow-hidden shadow-xl bg-white">
          <Image
            src={component.img}
            alt={component.title}
            width={576}
            height={320}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h1 className="mt-4 text-lg md:text-3xl font-bold text-white drop-shadow text-center">{component.title}</h1>
      </div>
      {/* Côté droit : texte + commentaire */}
      <div className="md:w-1/2 flex flex-col items-center justify-center relative space-y-6">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10 max-w-xl w-full">
          <h2 className="text-base md:text-xl font-semibold text-purple-900 mb-4">Biographie</h2>
          <p className="text-gray-800 text-sm md:text-lg whitespace-pre-line">{component.text}</p>
        </div>
        {component.comment && (
          <div className="hidden md:block border-2 border-white bg-white/80 rounded-xl shadow-lg p-4 max-w-sm self-end">
            <p className="text-purple-900 text-base md:text-lg">{component.comment}</p>
          </div>
        )}
        {/* Section CommentBox éventuelle */}
        <div className="w-full max-w-xl"></div>
      </div>
    </div>
  );
}
