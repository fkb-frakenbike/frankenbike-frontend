import axios from 'axios';
import api from '../../lib/axios'; // ou le bon chemin selon ton arborescence
import { useState } from 'react';

const useLogout = (setUser: (user: null) => void, setError: (msg: string) => void) => {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await api.post('/api/logout');
      if (res.status !== 200) {
        throw new Error(`Logout failed (status ${res.status})`);
      }
      setUser(null);
      setError('You have been logged out.');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || 'Erreur inconnue');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoggingOut(false);
    }
  };

  return { handleLogout, loggingOut };
};

export default useLogout;
