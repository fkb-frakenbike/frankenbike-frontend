'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from './lib/axios'; // Utilisation de ton instance axios personnalisée

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  // Définir les états pour stocker les données et l'état de chargement
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Utiliser useEffect pour appeler l'API au chargement du composant
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/api/users/');
        setUsersData(res.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois au montage du composant

  return (
    <div className="grid min-h-screen w-full grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>Bonjour les amis !</h1>
        <p>J’aime le pâté</p>
        {loading ? (
          <p>Chargement en cours...</p>
        ) : usersData ? (
          <div>
            <h2>Données depuis l&apos;API</h2>
            <pre>{usersData.map((userData: User) => userData.id)}</pre>
          </div>
        ) : (
          <p>Impossible de récupérer les données</p>
        )}
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        {/* Les autres liens dans le footer... */}
      </footer>
    </div>
  );
}
