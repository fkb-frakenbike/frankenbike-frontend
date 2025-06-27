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
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* Centered FKB logo */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          <h1 className="font-main text-3xl text-white">FKB</h1>
        </div>
        {/* Right-aligned user/email/logout */}
        <div className="ml-auto flex items-center gap-4">
          {user && (
            <span className="text-white hidden sm:block">{user.email}</span>
          )}
          {user && <LogoutButton setUser={setUser} setError={setError} />}
        </div>
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </header>
  );
};

export default Header;
