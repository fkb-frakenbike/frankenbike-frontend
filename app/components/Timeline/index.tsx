'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '../Carousel';
import api from '../../lib/axios';
import { CardData } from '../../types';
import { useProject } from '@/app/context/ProjectContext';
import axios, { AxiosError } from 'axios';

type ProjectData = {
  id: number;
  title: string;
  components: CardData[];
};

interface ComponentsFetchErrorResponse {
  error: string;
}

export default function TimelinePage({ projectId }: { projectId?: number }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [components, setComponents] = useState<CardData[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>(projectId ?? '');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedProjectId: setContextProjectId } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/me');
        const userProjects: ProjectData[] = res.data.projects || [];
        setProjects(userProjects);

        // Détermine le projet sélectionné
        let initialId: number | '' = '';
        if (typeof projectId === 'number') {
          initialId = userProjects.find(p => p.id === projectId)?.id ?? '';
        } else if (userProjects.length > 0) {
          initialId = userProjects[0].id;
        }
        setSelectedProjectId(initialId);
        setContextProjectId(initialId);

        // Charge les composants du projet sélectionné
        const selectedProject = userProjects.find(p => p.id === initialId);
        setComponents(selectedProject?.components ?? []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = err as AxiosError<ComponentsFetchErrorResponse>;
          setError(apiError.response?.data?.error || apiError.message || 'unknown error');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur lors du chargement des projets.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectId, setContextProjectId]);

  function onProjectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = Number(event.target.value);
    setSelectedProjectId(id);
    setContextProjectId(id);
    const project = projects.find(p => p.id === id);
    setComponents(project?.components ?? []);
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-center text-red-300">{error}</p>;

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-[#2C0857] to-purple-400 p-2 pt-12">
      <h1 className="mb-4 mt-16 text-center text-2xl font-bold text-white drop-shadow md:text-3xl">
        Timeline
      </h1>
      <div className="mb-4 flex items-center justify-center gap-6">
        <select
          value={selectedProjectId}
          onChange={onProjectChange}
          className="rounded p-2 text-black"
        >
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      <Carousel data={components} />
    </div>
  );
}
