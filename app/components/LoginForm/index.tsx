// File: app/components/LoginFormComponent.tsx
'use client';

import React, { useState } from 'react';
import api from '../../lib/axios'; // ← importe ton instance Axios
import axios, { AxiosError } from 'axios';
import InputField from '../InputField/InputField';

interface LoginFormState {
  email: string;
  password: string;
  rememberMe:boolean;
}

interface LoginErrorResponse {
  error: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({ email: '', password: '', rememberMe:false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({ ...prev,
      [name]: type=== 'checkbox'? checked : value, }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/api/login', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      },
        { withCredentials: true }
      );
      window.location.href = '/feed';
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiError = err as AxiosError<LoginErrorResponse>;
        setError(apiError.response?.data?.error || apiError.message || 'Erreur inconnue');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed (erreur inconnue)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2D005E] via-[#2D005E] to-[rgba(49,0,102,0.7)]">
      <div className="mx-auto my-10 max-w-md rounded-lg bg-transparent p-8">
        <h1 className="font-other mb-6 text-center text-4xl font-semibold text-white">Sign in</h1>

        {/* 6) Plain <form> so we intercept onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-green-900 text-center"
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe" // must match LoginFormState.rememberMe
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 accent-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-full border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
          <div className="text-center text-sm text-white">
            Pas de compte ?
            <a href="/register" className="ml-1 font-medium text-white hover:text-indigo-500">
              Enregistrez-vous
            </a>
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
