'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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

  if (!id || !/^\d+$/.test(id)) {
    return <p className="text-red-500">ID de composant invalide</p>;
  }

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const res = await api.get(`/api/components/${id}`);
        setComponent({
          img: res.data.photoS3Key || '/defaultImage.png',
          title: res.data.name,
          text: res.data.description,
          comment: 'Commentaire statique pour l’instant',
        });
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Erreur lors du chargement du composant';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!component) return <p>Aucun composant trouvé.</p>;
  return (
    <div className="fkb-bg-diagonal relative flex min-h-screen flex-col p-6 pt-24 md:flex-row md:pt-0">
      {/* Côté gauche : image + titre */}
      <div className="mb-8 flex flex-col items-center justify-center md:mb-0 md:w-1/2">
        <div className="mt-12 h-32 w-52 overflow-hidden rounded-[30px] bg-white shadow-xl md:mt-0 md:h-[220px] md:w-[350px] lg:h-[283px] lg:w-[449px] xl:h-[283px] xl:w-[449px] 2xl:h-[283px] 2xl:w-[449px]">
          <Image
            src={component.img}
            alt={component.title}
            width={576}
            height={320}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="mt-4 text-center text-lg font-bold text-white drop-shadow md:text-3xl">
          {component.title}
        </h1>
      </div>
      {/* Côté droit : texte + commentaire */}
      <div className="relative flex flex-col items-center justify-center space-y-6 md:w-1/2">
        <div className="w-full max-w-xl rounded-2xl bg-white/90 p-6 shadow-lg md:p-10">
          <h2 className="mb-4 text-base font-semibold text-purple-900 md:text-xl">Biographie</h2>
          <p className="whitespace-pre-line text-sm text-gray-800 md:text-lg">{component.text}</p>
        </div>
        {component.comment && (
          <div className="hidden max-w-sm self-end rounded-xl border-2 border-white bg-white/80 p-4 shadow-lg md:block">
            <p className="text-base text-purple-900 md:text-lg">{component.comment}</p>
          </div>
        )}
        {/* Section CommentBox éventuelle */}
        <div className="w-full max-w-xl"></div>
      </div>
    </div>
  );
}
