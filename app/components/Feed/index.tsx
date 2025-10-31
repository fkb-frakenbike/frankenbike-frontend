'use client';

import React, { useEffect, useState, useCallback } from 'react';
import FeedList from './FeedList';
import api from '../../lib/axios';
import Carousel from '../Carousel';
import { CardVariant } from '@/app/types';

type Project = {
  id: number;
  user: { email: string; profile: { photoUrl: string } };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  comments: unknown[];
  components: unknown[];
};

const PAGE_SIZE = 10;

const Feed = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);

  const hasMore = total === null || (Array.isArray(projects) && projects.length < total);

 const cardsData = projects?.map((project) => ({
  id: project.id,
  name: project.title,            // Utilise 'name' ici comme attendu par CardData
  description: project.description,
  img: project.imageUrl,
  likes: 0,                      // Valeur par défaut, ou adapte selon tes données
  comments: Array.isArray(project.comments) ? project.comments.length : 0,
  userImg: '',                   // Remplace si tu as une image utilisateur
  userName: project.user?.email || '',
  date: project.createdAt,
  variant: 'purpleCard' as CardVariant,         // Utilise la valeur correspondante au type CardVariant
}));

  const fetchProjects = useCallback(async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const res = await api.get('/api/projects', {
        params: { page: pageNum, limit: PAGE_SIZE },
      });
      const { data, total: totalCount } = res.data;
      if (pageNum === 1) setProjects(data);
      else setProjects(prev => [...prev, ...data]);
      setTotal(totalCount);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur de chargement');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Premier chargement
  useEffect(() => {
    fetchProjects(1);
  }, [fetchProjects]);

  // Scroll infini anticipé
  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore]);

  // Charger la page suivante
  useEffect(() => {
    if (page > 1) fetchProjects(page);
  }, [page, fetchProjects]);

  return (
    <div className="min-h-screen">
      {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">Feed</h2> */}
      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : error ? (
        <div className="mb-4 text-red-600">{error}</div>
      ) : (
        <FeedList projects={projects} />
      )}
      {loadingMore && <div className="py-4 text-center text-gray-500">Chargement…</div>}
      <Carousel data={cardsData}  />

    </div>
  );
};

export default Feed;
