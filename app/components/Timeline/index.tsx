'use client';
import '../../components/TextLoader/TextLoader.css';
import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel';
import api from '../../lib/axios';
import { mapApiComponentToCardData } from '../../types/card';
import { useProject } from '@/app/context/ProjectContext';
import axios, { AxiosError } from 'axios';
import { Component } from '@/app/types/component';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import TextLoader from '../TextLoader/TextLoader';

type ProjectData = {
  id: number;
  title: string;
  components: Component[];
  user: { id: number; email: string };
};

interface ProjectApiResponse {
  id: number;
  title: string;
  user: { id: number };
}

interface ComponentsFetchErrorResponse {
  error: string;
}

export default function TimelinePage({ projectId }: { projectId?: number }) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>(projectId ?? '');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedProjectId: setContextProjectId } = useProject();
  const { auth, loading: authLoading } = useAuth();

  console.log('authenticated user in TimelinePage:', auth);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let userProjects: ProjectData[] = [];
        let initialProjectId: number | '' = '';

        if (typeof projectId === 'number') {
          const projectRes = await api.get<ProjectApiResponse>(`/api/projects/${projectId}`);
          const userId = projectRes.data.user.id;
          const userProjectsRes = await api.get<{ data: ProjectData[] }>(
            `/api/users/${userId}/projects`
          );
          userProjects = userProjectsRes.data.data || [];
          setProjects(userProjects);

          initialProjectId =
            userProjects.find(userProject => userProject.id === projectId)?.id ??
            userProjects[0]?.id ??
            '';
        } else {
          const res = await api.get<{ projects: ProjectData[] }>('/api/me');
          userProjects = res.data.projects || [];
          setProjects(userProjects);
          initialProjectId = userProjects[0]?.id ?? '';
        }
        setSelectedProjectId(initialProjectId);
        setContextProjectId(initialProjectId);
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
  }

  if (loading || authLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <TextLoader text="FKB" className="fade font-main text-6xl" />
      </div>
    );
  if (error) return <p className="text-center text-red-300">{error}</p>;

  // Récupère les composants du projet sélectionné
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const mappedComponents = (selectedProject?.components || []).map(mapApiComponentToCardData);
  console.log('selectedProject:', selectedProject);
  const isOwner =
    auth?.user &&
    selectedProject &&
    selectedProject.user &&
    String(auth?.user.id) === String(selectedProject.user.id);

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
      <Carousel data={mappedComponents} />
      {/* Bouton flottant en bas à droite */}
      {isOwner && (
        <Link
          href={`/add-component?projectId=${selectedProjectId}`}
          title="Ajouter un composant"
          className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#2d005e] px-6 py-2 text-white shadow transition hover:bg-[#6c3cff]"
        >
          <span className="text-6xl leading-none">+</span>
        </Link>
      )}
    </div>
  );
}
