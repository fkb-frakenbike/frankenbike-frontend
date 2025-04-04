'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
        const res = await fetch('/api/users/');

        if (res.ok) {
          const data = await res.json();
          setUsersData(data);
        } else {
          console.error('Échec de la récupération des données');
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois au montage du composant

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
