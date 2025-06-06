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
  const [loggingOut, setLoggingOut] = useState<boolean>(false);


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
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch(`${baseUrl}/api/logout`, {
        method: 'POST',
        credentials: 'include', // ensure the cookie is sent so the server can clear it
      });
      if (!res.ok) {
        throw new Error(`Logout failed (status ${res.status})`);
      }
      // Clear local state so we no longer think the user is logged in
      setUser(null);
      setError('You have been logged out.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoggingOut(false);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Feed (Authenticated)</h2>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loggingOut ? 'Logging out…' : 'Logout'}
        </button>
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
