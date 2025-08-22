'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Carousel from "../CarouselComponent";
import api from '../../lib/axios'; 
import axios, { AxiosError } from 'axios';

type CardVariant = "purpleCard";
type CardData = {
  title: string;
  projectId: number | string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  userImg: string;
  userName: string;
  nature: string;
  variant: CardVariant;
  projectName?: string; // <-- Ajoute si tu stockes le nom du projet dans la timeline
};
interface LoginErrorResponse {
  error: string;
}

export default function TimelinePage() {
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{id:number, name:string, img?:string} | null>(null);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const me = await api.get('/api/me');
        setUser(me.data);
        const userId = me.data.id;

        const response = await api.get(`/api/timelines/${userId}`);
        
        // Ici, on mappe les données API pour injecter nature et variant
        const mappedCards = response.data.map((card: any) => ({
          ...card,
          nature: "project", // logique métier ici si tu veux (par exemple selon card.type)
          variant: "purpleCard", // logique de style ici aussi
        }));
        setCards(mappedCards);

        if (mappedCards.length && mappedCards[0].projectName) {
          setProjectName(mappedCards.projectName);
        } else {
          setProjectName("Projet sans nom");
        }

      } catch (err: unknown) {
        // gestion des erreurs ici
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);


  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-300 text-center">{error}</p>;

  const purpleCards = cards.filter(card => card.variant === "purpleCard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C0857] to-purple-400 p-2 flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow text-center mt-16 mb-4">
        Timeline
      </h1>
      <div className="flex justify-center items-center gap-6 mb-0">
        {/* Nom du projet dynamique */}
        <span className="text-xl font-bold text-white">{projectName}</span>
        <div className="flex items-center gap-2">
          {/* Nom et photo dynamiques du user */}
          <span className="text-xl font-bold text-white">{user?.id || "Utilisateur"}</span>
          <img
            src={user?.img || "/default.jpg"}
            alt="Profil"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>
      <Carousel data={purpleCards} />
    </div>
  );
}
