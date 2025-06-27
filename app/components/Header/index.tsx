'use client';

import { useState } from 'react';
import LogoutButton from '../LogoutButton';
import { User } from '@/app/types/user';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <header
      className="fixed left-0 top-0 z-50 w-full bg-transparent py-8"
    >
      <h1 className="font-main text-center text-3xl text-white">FKB</h1>
      {user && <LogoutButton setUser={setUser} setError={setError} />}
      {error && <div>{error}</div>}
    </header>
  );
};

export default Header;
