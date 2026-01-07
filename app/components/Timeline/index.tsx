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
import Image from 'next/image';

interface Profile {
  firstName?: string;
  photoUrl?: string | null;
}

interface User {
  id: number;
  email: string;
  profile: Profile | [] | null;
}

type ProjectData = {
  id: number;
  title: string;
  components: Component[];
  user: User;
};

type ApiMeResponse = {
  projects: ProjectData[];
  user?: User;
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

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        let userProjects: ProjectData[] = [];
        let initialProjectId: number | '' = '';

        if (typeof projectId === 'number') {
          const projectRes = await api.get<ProjectApiResponse>(`/api/projects/${projectId}`);
          const userId = projectRes.data.user.id;
          const userProjectsRes = await api.get<{ data: ProjectData[] }>(`/api/users/${userId}/projects`);
          userProjects = userProjectsRes.data.data || [];
          console.log('projects from /api/users/:id/projects', userProjects);
        } else {
          const res = await api.get<ApiMeResponse>('/api/me');
          userProjects = res.data.projects || [];
          console.log('projects from /api/me', userProjects);

          // ✅ Fix TypeScript : gère undefined → null + [] vide
          const apiUserProfile: Profile | null = res.data.user?.profile && !Array.isArray(res.data.user.profile) 
            ? res.data.user.profile 
            : null;

          // Copie profile vers tous les projects (safe)
          if (apiUserProfile && userProjects.length > 0) {
            userProjects.forEach(project => {
              if (!project.user.profile || Array.isArray(project.user.profile)) {
                project.user.profile = apiUserProfile;
              }
            });
          }
        }

        setProjects(userProjects);
        initialProjectId = userProjects.find(p => p.id === projectId)?.id ?? userProjects[0]?.id ?? '';
        setSelectedProjectId(initialProjectId);
        setContextProjectId(initialProjectId);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = err as AxiosError<ComponentsFetchErrorResponse>;
          setError(apiError.response?.data?.error || apiError.message || 'Erreur API');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur lors du chargement des projets.');
        }
        console.error('Fetch projects error:', err);
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

  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const mappedComponents = (selectedProject?.components || []).map(mapApiComponentToCardData);
  const isOwner =
    auth?.user &&
    selectedProject &&
    String(auth?.user.id) === String(selectedProject.user.id);

  // ✅ Safe profile access
  const profileData = selectedProject?.user.profile && !Array.isArray(selectedProject.user.profile)
    ? selectedProject.user.profile
    : null;
  const displayName = profileData?.firstName || 'Utilisateur';
  const displayPhoto = profileData?.photoUrl?.trim() 
  ? `${profileData.photoUrl}?v=${crypto.randomUUID()}` : '/SvgSite/defaultProfilePic.png';

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
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <span className="text-xl font-bold text-white">
          {displayName}
        </span>
        <Image
          src={displayPhoto}
          alt="Profil"
          width={48}
          height={48}
          className="rounded-full border-2 border-white object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
        />
      </div>

      {mappedComponents.length > 0 ? (
        <Carousel data={mappedComponents} />
      ) : (
        <div className="flex flex-col items-center gap-6 py-12 text-center text-lg font-semibold text-[#2d005e]">
          <p>Aucun composant disponible pour ce projet.</p>
          {isOwner && (
            <>
              <p>Ajoutez le premier composant !</p>
              <Link
                href={`/add-component?projectId=${selectedProjectId}`}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2d005e] px-6 py-2 text-white shadow transition hover:bg-[#6c3cff]"
              >
                <span className="text-6xl leading-none">+</span>
              </Link>
            </>
          )}
        </div>
      )}

      {isOwner && mappedComponents.length > 0 && (
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
