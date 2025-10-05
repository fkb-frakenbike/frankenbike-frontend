'use client';

import { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import api from '../../lib/axios';
import { Project } from '@/app/types/projects';

const ORIGIN_OPTIONS = [
  { value: 'homemade', label: 'Fait maison' },
  { value: 'bought_new', label: 'Acheté neuf' },
  { value: 'bought_used', label: 'Acheté d’occasion' },
  { value: 'recycled', label: 'Recyclé' },
  { value: 'gifted', label: 'Offert' },
  { value: 'traded', label: 'Échangé' },
  { value: 'restored', label: 'Restauré' },
  { value: 'upcycled', label: 'Upcyclé' },
];

type AddComponentFormProps = {
  projectId?: number;
};

const AddComponentForm = ({ projectId }: AddComponentFormProps) => {
  // Etat pour plusieurs fichiers
  // const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>(projectId ?? '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('bought_used'); // valeur par défaut à adapter
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    api.get('/api/me').then(res => {
      setUserId(res.data.id);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/api/users/${userId}/projects`)
      .then(res => {
        setProjects(res.data.data);
        if (projectId) {
          setSelectedProjectId(projectId);
        }
      })
      .catch(() => setProjects([]));
  }, [projectId]);

  // Handle upload multiple files
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // if (files) {
    //   setSelectedImages(Array.from(files));
    // }
    if (files && files[0]) {
      setSelectedImage(files[0]);
    }
  };

  // Soumission formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage || !selectedProjectId) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('origin', origin);
    formData.append('file', selectedImage);

    setLoading(true);
    try {
      const res = await api.post(`/api/projects/${projectId}/components`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPreview(res.data);
    } catch (err) {
      setPreview({ error: "Erreur lors de l'envoi" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 p-4">
      {/* Partie gauche : Title + Description */}

      <div>
        <label htmlFor="project" className="mb-1 block text-sm font-medium text-white">
          Projet
        </label>
        <select
          id="project"
          name="project"
          value={selectedProjectId}
          onChange={e => setSelectedProjectId(Number(e.target.value))}
          className="w-full rounded border border-gray-300 px-3 py-2 text-black"
          required
        >
          <option value="" disabled>
            Choisir un projet
          </option>
          {projects &&
            projects?.length > 0 &&
            projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
        </select>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <div className="flex flex-1 flex-col gap-4 px-6">
          <InputField
            label="Title"
            type="text"
            id="title"
            name="title"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded- w-full max-w-[600px] border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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

          <div>
            <label htmlFor="origin" className="mb-1 block text-sm font-medium text-white">
              Origin
            </label>
            <select
              id="origin"
              name="origin"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-black"
              required
            >
              {ORIGIN_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Partie droite : Upload + bouton */}
        <div className="mt-10 flex w-full flex-col gap-4 md:w-1/3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full rounded border border-gray-300 bg-white p-2"
            style={{ minWidth: 120, minHeight: 32 }}
          />

          {selectedImage && (
            <div className="ml-2 max-h-48 overflow-auto text-white">
              <p>{selectedImage.name}</p>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Aperçu"
                className="mt-2 max-h-40 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded-full border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Envoyer
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComponentForm;
