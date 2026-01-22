'use client';

import { useState } from 'react';
import InputField from '../InputField/InputField';
import axios, { AxiosError } from 'axios';
import api from '@/app/lib/axios';

interface SignUpFormState {
  firstname: string;
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
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)){1,}[a-zA-Z]{2,6}$/;
  const PASSWORD_REGEX_3=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

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
    
     if (!EMAIL_REGEX.test(formData.email)) {
    setError('Adresse email invalide. Utilisez un format comme : nom@domaine.com');
    setLoading(false);
    return;
  }

  // ✅ Évite les emails trop longs ou vides
  if (formData.email.length < 6 || formData.email.length > 254) {
    setError('L\'email doit faire entre 6 et 254 caractères.');
    setLoading(false);
    return;
  }


    try {
      await api.post(
        '/api/users',
        {
          email: formData.email,
          password: formData.password,
          firstname: formData.firstname,
        },
        {
          headers: {},
        }
        
      );
      // Auto-login après inscription réussie
        await api.post('/api/login', {
      email: formData.email,
      password: formData.password,
    });
      window.location.href = '/feed';
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiError = err as AxiosError<RegisterErrorResponse>;
        if (apiError.response?.data?.error?.toLowerCase().includes('email')) {
          setShowResetModal(true); // Affiche le modal de réinitialisation
        } else {
          setError(apiError.response?.data?.error || apiError.message || 'Erreur inconnue');
        }
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
      className="fkb-bg flex min-h-screen items-center justify-center pt-28"
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
            validationError={
            formData.email && !EMAIL_REGEX.test(formData.email)
            ? 'Format email invalide (ex: nom@domaine.com)'
            : null
            } 
            className="inset-shadow-xl/20 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <InputField
            label="Mot de passe"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            validationError={
              formData.password && !PASSWORD_REGEX_3.test(formData.password)
              ? 'Format invalide (8 caractères minimum, 1 caractère spécial min, 1 chiffre min)'
              : null
            }
 
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
            {error && <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">{error}</div>}
          </div>
        </form>
        {error && (
          <div className="mt-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex max-w-sm flex-col justify-center rounded-lg bg-white p-8 text-center">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Email déjà utilisé</h2>
              <p className="mb-6 text-gray-700">
                Cet email existe déjà. Voulez-vous réinitialiser votre mot de passe&nbsp;?
              </p>
              <a
                href="/reset-password"
                className="mx-auto inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Réinitialiser le mot de passe
              </a>
              <button
                onClick={() => setShowResetModal(false)}
                className="mx-auto mt-2 inline-block rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
