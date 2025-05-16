import { useEffect, useState } from 'react';
import api from '../../lib/axios';

interface User {
  firstname: string;
  // Ajoute d'autres propriétés si besoin
}

export default function FeedComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get('/users')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user === null) return <div>Non connecté</div>;
  return <div>Bienvenue, {user.firstname} !</div>;
}
