'use client';

import React, { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import api from '@/app/lib/axios';
import { User } from '@/app/types/user';

const Header: React.FC = () => {
  const [user,setUser] = useState<User |null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/me');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-transparent py-8">
      <h1 className="font-main text-center text-3xl text-white">FKB</h1>
      {/* Only show the logout button if user is logged in */}

      <div className="absolute right-4 top-4">
        {user && (
          <span className="text-white mr-2">{user.email}</span>
        )}
        {user && <LogoutButton setUser={setUser} setError={setError} />}
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </header>
  );
};

export default Header;
