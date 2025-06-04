// File: app/components/LoginFormComponent.tsx
'use client';

import React, { useState } from 'react';

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginFormComponent() {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Pull base URL from environment variable:
  // (The “!” tells TypeScript “trust me, this will be defined at runtime.”)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ── A) LOGIN : Use the env var instead of hard-coding “http://localhost:8787”
      const loginRes = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include', // ← Without this, Set-Cookie is dropped
      });
      if (!loginRes.ok) {
        let msg = `Login failed (status ${loginRes.status})`;
        try {
          const errJson = await loginRes.json();
          if (errJson.error) {
            msg = errJson.error;
          }
        } catch {}
        throw new Error(msg);
      }

      window.location.href = '/feed';
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2D005E] via-[#2D005E] to-[rgba(49,0,102,0.7)]">
      <div className="mx-auto my-10 max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Sign In</h1>

        {/* 6) Plain <form> so we intercept onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* If there was an error, show it */}
        {error && (
          <div className="mt-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}
