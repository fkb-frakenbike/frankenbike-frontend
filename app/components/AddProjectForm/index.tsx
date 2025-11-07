'use client';

import { useState } from 'react';
import InputField from '../InputField/InputField';
import api from '@/app/lib/axios';
import { extractErrorMessage } from '@/app/lib/errorMessage';
import Image from 'next/image';

export default function AddProjectForm() {
  // Etat pour plusieurs fichiers
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle upload multiple files
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  // Soumission formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedImages.length > 0) {
      formData.append('file', selectedImages[0]);
    }
    formData.append('title', title);
    formData.append('description', description);

    setLoading(true);
    try {
      // NE PAS forcer Content-Type : axios gère la boundary pour FormData
      const res = await api.post('/api/projects', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }, // décommente si tu utilises les cookies de session
      });

      console.log('Projet créé', res.data);
      // feedback / reset
      setTitle('');
      setDescription('');
      setSelectedImages([]);
    } catch (error: unknown) {
      setError(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="mb-10 block px-6 text-center text-2xl font-medium text-white">
        Mon nouveau projet
      </h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
          {/* Partie gauche : Title + Description */}
          <div className="flex flex-1 flex-col gap-4 px-6">
            <InputField
              label="Nom du projet"
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full max-w-[600px] rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />

            <InputField
              label="Description"
              type="text"
              id="description"
              name="description"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="h-36 w-full max-w-[600px] rounded-none border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 md:h-40"
            />
          </div>

          {/* Partie droite : Upload + bouton */}
          <div className="flex w-full flex-1 flex-col px-6 md:w-1/3">
            <InputField
              label="Photo de couverture du projet"
              id="project-photo"
              name="project-photo"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block max-h-36 w-full rounded border border-gray-300 bg-white p-1"
              style={{ minWidth: 120, minHeight: 32 }}
            />

            {selectedImages.length > 0 && (
              <div className="self-center overflow-auto text-white">
                {selectedImages.map((file, index) => (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Aperçu"
                  className="mt-2 rounded"
                  width={500}          // largeur souhaitée (en pixels)
                  height={300}         // hauteur souhaitée (en pixels)
                  key={index}
                />
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mx-6 flex justify-center rounded-full border border-white bg-transparent px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
}
