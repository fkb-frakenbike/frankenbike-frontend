import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios';
import { User } from '../types/user';
import { extractErrorMessage } from '../lib/errorMessage';
import { Project } from '../types/projects';

type AuthData = {
  user: User;
  projects: Project[];
};

type AuthContextType = {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  loading: true,
  error: null,
  refresh: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/me');
      setAuth(res.data);
    } catch (err) {
      setAuth(null);
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, error, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
