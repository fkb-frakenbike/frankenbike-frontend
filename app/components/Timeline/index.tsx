'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Carou;
import api from '../../lib/axios'; 
import axios, { AxiosError } from 'axios';
import { CardData, CardVariant } from  '../../types'

interface LoginErrorResponse {
  error: string;
}

type ProjectData = {
  projectId: number;
  projectName: string;
  components: CardData[];
};

export default function TimelinePage() {
  const router = useRouter();
  const [components, setComponents] = useState<CardData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{id: number, name: string, img?: string} | null>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const me = await api.get('/api/me');
        setUser(me.data);
        const userId = me.data.id;

        const response = await api.get<ProjectData[]>(`/api/timelines/${userId}`);
        const fetchedProjects = response.data;

        setProjects(fetchedProjects);

        if (fetchedProjects.length === 0) {
          setProjectName("Projet sans nom");
          setComponents([]);
          setSelectedProjectId(null);
          return;
        }

        const firstProject = fetchedProjects[0];
        setSelectedProjectId(firstProject.projectId);
        setProjectName(firstProject.projectName);
        loadComponentsForProject(firstProject);
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
  }, [router]);

  function loadComponentsForProject(project: ProjectData) {
    const allComponents: CardData[] = project.components.map(component => ({
      id: component.id,
      name: component.name,
      description: component.description,
      category: component.category,
      origin: component.origin,
      variant: "purpleCard",
      projectName: project.projectName,
      img: component.img?.trim(),
      likes: component.likes ?? 0,
      comments: component.comments ?? 0,
      userImg: component.userImg?.trim(),
      userName: component.userName ?? "",
      nature: component.nature ?? "",
    }));
    setComponents(allComponents);
  }

  function onProjectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const projectId = Number(event.target.value);
    setSelectedProjectId(projectId);
    const project = projects.find(p => p.projectId === projectId);
    if (project) {
      setProjectName(project.projectName);
      loadComponentsForProject(project);
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-300 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C0857] to-purple-400 p-2 flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow text-center mt-16 mb-4">
        Timeline
      </h1>
      <div className="flex justify-center items-center gap-6 mb-4">
        {/* Menu déroulant pour sélection du projet */}
        <select
          value={selectedProjectId ?? ""}
          onChange={onProjectChange}
          className="rounded p-2 text-black"
        >
          {projects.map(project => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </select>

        {/* Affichage info utilisateur */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">{user?.id || "Utilisateur"}</span>
          <img
            src={user?.img || "SvgSite/profile.png"}
            alt="Profil"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Carousel affichant les composants du projet sélectionné */}
      <Carousel data={components} />
    </div>
  );
}
