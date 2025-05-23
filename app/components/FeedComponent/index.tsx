import { useEffect, useState } from 'react';
import api from '../../lib/axios';

interface User {
  id: number;
  email: string;
  // Ajoute d'autres propriétés si besoin
}

export default function FeedComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get('/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user === null) return <div>Non connecté</div>;
  return <div>Bienvenue, {user.id} !</div>;
}
