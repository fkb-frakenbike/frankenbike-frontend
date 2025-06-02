// ─────────────────────────────────────────────────────────────────────────────
// app/components/LoginFormComponent.tsx
// (or wherever you keep your React components)
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import React, { useState } from 'react';

// Define exactly the shape of the JSON that /api/me returns:
type ApiUser = {
  id: number;
  email: string;
  password: string;             // (usually you wouldn’t expose this in production)
  plainPassword: string | null; // (should always be null once hashed)
  role: string;                 // e.g. "admin" or "user"
  createdAt: string;            // ISO‐8601 date string
  projects: unknown[];          // we don’t care about the project details right now
  likes: unknown[];
  userIdentifier: string;       // same as “email” typically
  roles: string[];              // e.g. ["ROLE_ADMIN"]
};

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginFormComponent() {
  // ── 1. Form state: email + password
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  // ── 2. “user” will hold the object returned by GET /api/me, or null if not yet fetched
  const [user, setUser] = useState<ApiUser | null>(null);

  // ── 3. “error” holds any error‐message string, if login or /api/me fails
  const [error, setError] = useState<string | null>(null);

  // ── 4. “loading” is true while our fetch calls are in flight
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  //  Handle every keystroke in the form inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  //  When the user submits the form:
  //   • POST to Symfony’s /api/login
  //   • Browser will store the HTTP‐only cookie “AUTH_TOKEN_COOKIE=…”
  //   • Then we immediately fetch /api/me with credentials: 'include'
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setUser(null);
    setLoading(true);

    try {
      // ── A) LOGIN STEP: POST /api/login with { email, password }
      const loginRes = await fetch('http://localhost:8787/api/login', {
        method: 'POST',
        credentials: 'include', // ⬅️ this tells the browser: “please store the Set-Cookie from Symfony”
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!loginRes.ok) {
        throw new Error(`Login failed (status ${loginRes.status})`);
      }

      // ── B) FETCH /api/me using the cookie the server just set
      const meRes = await fetch('http://localhost:8787/api/me', {
        method: 'GET',
        credentials: 'include', // ⬅️ ensures the JWT cookie is sent back to Symfony
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
  };

  // ─────────────────────────────────────────────────────────────────────────────
  //  The rendered JSX:
  //  • Plain <form onSubmit={…}> so JavaScript can intercept it.
  //  • We do NOT use next/form here, because next/form → Next router tries to find a Next “page” at /search.
  //  • Instead, we do everything by hand via fetch().
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2D005E] via-[#2D005E] to-[rgba(49,0,102,0.7)]"
      style={{ backgroundSize: '100% 100%', backgroundPosition: '0 0, 0 26%, 0 67%, 0 98%' }}
    >
      <div className="mx-auto my-10 max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Sign In</h1>

        {/* ── CHANGE: use a normal <form> so we can handle onSubmit ourselves ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Email Input ── */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // must match LoginFormState.email
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {/* ── Password Input ── */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // must match LoginFormState.password
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {/* ── Submit Button ── */}
          <div>
            <button
              type="submit"
              disabled={loading} // disable while our fetch is in flight
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* ── If the user object is now filled, display its JSON ── */}
        {user && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h2 className="font-semibold mb-2">Authenticated User</h2>
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}

        {/* ── If an error occurred, show it ── */}
        {error && (
          <div className="mt-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}

