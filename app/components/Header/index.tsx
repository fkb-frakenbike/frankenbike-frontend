'use client';

import React, { useEffect, useState } from 'react';
import api from '@/app/lib/axios'; // use correct path!
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ApiUser = {
  email: string;
  //we can add more info about the user....
};

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/me');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    void fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      setUser(null);
      router.push('/login');
    } catch {
      // Optional: show an error if you want
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-transparent py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        {/* App name, clickable to go home */}
        <Link href="/feed" className="font-main text-2xl font-bold text-testpurple">
          FKB
        </Link>
        {/* Navigation + user controls */}
        {!loading &&
          (user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-white sm:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          ))}
      </div>
    </header>
  );
}
