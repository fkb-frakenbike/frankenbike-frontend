'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '../Carousel';
import api from '../../lib/axios';
import axios, { AxiosError } from 'axios';
import { CardData } from '../../types';
import { useProject } from '@/app/context/ProjectContext';
import Image from 'next/image';

interface LoginErrorResponse {
  error: string;
}

type ProjectData = {
  projectId: number;
  projectName: string;
  components: CardData[];
};

export default function TimelinePage({ projectId }: { projectId?: number }) {
  const router = useRouter();
  const [components, setComponents] = useState<CardData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { selectedProjectId: contextProjectId, setSelectedProjectId: setContextProjectId } = useProject();
  const [projectName, setProjectName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ id: number; name: string; img?: string } | null>(null);

  const loadComponentsForProject = useCallback((project: ProjectData) => {
    const allComponents: CardData[] = project.components.map(component => ({
      id: component.id,
      name: component.name,
      description: component.description,
      category: component.category,
      origin: component.origin,
      variant: 'purpleCard',
      projectName: projectName,
      img: component.img?.trim(),
      likes: component.likes ?? 0,
      comments: component.comments ?? 0,
      userImg: component.userImg?.trim(),
      userName: component.userName ?? '',
      nature: component.nature ?? '',
    }));
    setComponents(allComponents);
  }, [projectName]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      setLoading(true);
      try {
        const me = await api.get('/api/me');
        setUser(me.data);

        const userId = me.data.user?.id;
        if (!userId || typeof userId !== 'number') {
          setError("Impossible de récupérer l'ID utilisateur. Êtes-vous bien connecté ?");
          return;
        }

        const response = await api.get<ProjectData[]>(`/api/timelines/${userId}`);
        const fetchedProjects = response.data;

        setProjects(fetchedProjects);

        if (fetchedProjects.length === 0) {
          setProjectName('Projet sans nom');
          setComponents([]);
          setSelectedProjectId(null);
          return;
        }

        let initialProject = fetchedProjects[0];
        if (typeof projectId === 'number') {
          const found = fetchedProjects.find(project => project.projectId === projectId);
          if (found) initialProject = found;
        } else if (typeof contextProjectId === 'number') {
          const foundContext = fetchedProjects.find(project => project.projectId === contextProjectId);
          if (foundContext) initialProject = foundContext;
        }

        setSelectedProjectId(initialProject.projectId);
        setProjectName(initialProject.projectName);
        setContextProjectId(initialProject.projectId);
        loadComponentsForProject(initialProject);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          router.push('/login');
        } else {
          if (axios.isAxiosError<LoginErrorResponse>(err)) {
            const apiError = err as AxiosError<LoginErrorResponse>;
            setError(apiError.response?.data?.error || apiError.message || 'Erreur inconnue');
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Erreur inconnue lors du chargement de la timeline');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router, contextProjectId, loadComponentsForProject, projectId, setContextProjectId]);
  

  function onProjectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const pid = Number(event.target.value);
    setSelectedProjectId(pid);
    setContextProjectId(pid);
    const project = projects.find(p => p.projectId === pid);
    if (project) {
      setProjectName(project.projectName);
      loadComponentsForProject(project);
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-center text-red-300">{error}</p>;
console.log('Utilisateur', user?.id);
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-[#2C0857] to-purple-400 p-2 pt-12">
      <h1 className="mb-4 mt-16 text-center text-2xl font-bold text-white drop-shadow md:text-3xl">
        Timeline
      </h1>
      <div className="mb-4 flex items-center justify-center gap-6">
        <select
          value={selectedProjectId ?? ''}
          onChange={onProjectChange}
          className="rounded p-2 text-black"
        >
          {projects.map(project => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">{user?.id || 'Utilisateur'}</span>
          
          <Image
            src={user?.img && user.img.trim() !== '' ? user.img : '/SvgSite/defaultProfilePic.png'}
            alt="Profil"
            width={48}
            height={48}
            className="rounded-full border-2 border-white object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
          />
        </div>
      </div>
      <Carousel data={components} />
    </div>
  );
}
