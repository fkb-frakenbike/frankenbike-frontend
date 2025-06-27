'use client';

import React, { useEffect, useState } from 'react';
import api from '@/app/lib/axios';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type ApiUser = {
  id: number;
  email: string;
  password: string; // (you would never expose this in production)
  plainPassword: string | null; // (null once hashed)
  role: string; // e.g. "user" or "admin"
  createdAt: string; // ISO‐8601 date string
  projects: unknown[];
  likes: unknown[];
  userIdentifier: string;
  roles: string[];
};

export default function Feed() {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/me');
        setUser(res.data);
      } catch (err) {
        setUser(null);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.status === 401
              ? 'Not authenticated'
              : err.message
          );
          router.push("/login");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    void fetchUser();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feed</h2>
      {/* Show user info for testing */}
      {loading ? (
        <div className="text-gray-500">Loading user…</div>
      ) : error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : user ? (
        <div className="mb-4 p-3 bg-indigo-100 rounded text-indigo-900 shadow">
          <strong>User:</strong> {user.email}
        </div>
      ) : (
        <div className="text-gray-600 mb-4">No user info.</div>
      )}

      {/* ...rest of feed logic/content... */}
      <div>
        <p>Feed posts go here</p>
      </div>
    </div>
  );
}
