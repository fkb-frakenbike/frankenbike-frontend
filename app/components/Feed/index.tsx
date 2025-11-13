'use client';

import React, { useEffect, useState, useCallback } from 'react';
import '../../components/TextLoader/TextLoader.css';
import FeedList from './FeedList';
import api from '../../lib/axios';
import { Project } from '@/app/types/projects';
import TextLoader from '../TextLoader/TextLoader';
import Link from 'next/link';

const PAGE_SIZE = 10;

const Feed = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);

  const hasMore = total === null || (Array.isArray(projects) && projects.length < total);

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
        <div className="flex min-h-screen items-center justify-center">
          <TextLoader text="FKB" className="fade font-main text-6xl" />
        </div>
      ) : error ? (
        <div className="mb-4 text-red-600">{error}</div>
      ) : (
        <>
          <FeedList projects={projects} />
          <Link
            href="/add-project"
            title="Créer un projet"
            className="
              fixed bottom-8 right-4 z-50
              flex items-center justify-center rounded-full
              bg-[#2d005e] text-white shadow transition hover:bg-[#6c3cff]
              h-10 w-10            /* mobile d'abord, petit bouton */
              sm:h-12 sm:w-12      /* petit écran/tablette */
              md:h-16 md:w-16      /* écran moyen/desktop */
              px-4 py-2            /* padding horizontal/vertical */
            "
          >
  <span className="text-4xl sm:text-5xl md:text-6xl leading-none">+</span>
</Link>

        </>
      )}
      {loadingMore && <div className="py-4 text-center text-gray-500">Chargement…</div>}
    </div>
  );
};

export default Feed;
