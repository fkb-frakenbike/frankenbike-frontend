'use client';

import React, { useEffect, useState } from 'react';

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
  const [user, setUser] = useState<ApiUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE!;

  useEffect(() => {
    (async () => {
      try {
        const meRes = await fetch(`${baseUrl}/api/me`, {
          method: 'GET',
          credentials: 'include', // ← send the JWT cookie
        });

        if (!meRes.ok) {
          throw new Error(`/api/me failed (status ${meRes.status})`);
        }

        const meJson: ApiUser = await meRes.json();
        setUser(meJson);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [baseUrl]);

  // 2) A function to call /api/logout and clear state
  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading feed…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // If user is null but no error, it means maybe the token was missing/expired
  if (!user) {
    return (
      <div className="p-8 text-center text-gray-700">
        <p>You are not authenticated. Please log in.</p>
        <button
          onClick={() => (window.location.href = '/login')}
          className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // If we have a valid user, show them + a logout button
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Feed (Authenticated)</h2>
      </div>

      <div className="rounded-md border bg-gray-50 p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-800">Your User Object</h3>
        <pre className="whitespace-pre-wrap bg-white p-4 text-sm text-gray-700">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
