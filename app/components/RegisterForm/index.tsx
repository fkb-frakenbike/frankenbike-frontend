'use client';

import { useState } from 'react';
import InputField from '../InputField/InputField';
import axios, { AxiosError } from 'axios';
import api from '@/app/lib/axios';

interface SignUpFormState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterErrorResponse {
  error: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<SignUpFormState>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log(formData);

    if (formData.password !== formData.passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/users', {
        email: formData.email,
        password: formData.password,
        firstname: formData.firstname,
      });
      window.location.href = '/feed';
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiError = err as AxiosError<RegisterErrorResponse>;
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
    <div
      className="fkb-bg flex min-h-screen items-center justify-center"
      style={{ backgroundSize: '100% 100%', backgroundPosition: '0 0, 0 26%, 0 67%, 0 98%' }}
    >
      <div className="mx-auto my-10 max-w-md rounded-lg bg-transparent p-8">
        <h1 className="font-other mb-6 text-center text-4xl font-semibold text-white">Sign up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Prénom"
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="inset-shadow-xl/20 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="inset-shadow-xl/20 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <InputField
            label="Mot de passe"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="inset-shadow-xl/20 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <InputField
            label="Confirmation du mot de passe"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            className="inset-shadow-xl/20 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-full border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? 'Signing up…' : 'Sign up'}
            </button>
          </div>

          <div className="text-center text-sm text-white">
            Vous avez déjà un compte ?
            <a href="/login" className="ml-1 font-medium text-white hover:text-indigo-500">
              Se connecter
            </a>
          </div>
        </form>
        {error && (
          <div className="mt-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}
