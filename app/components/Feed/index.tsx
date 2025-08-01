'use client';

import React, { useEffect, useState } from 'react';
import FeedList from './FeedList';
import api from '../../lib/axios'; // Adjust the import path as necessary
import axios from 'axios';
import { useRouter } from 'next/navigation';

// type ApiUser = {
//   id: number;
//   email: string;
//   password: string; // (you would never expose this in production)
//   plainPassword: string | null; // (null once hashed)
//   role: string; // e.g. "user" or "admin"
//   createdAt: string; // ISO‐8601 date string
//   projects: unknown[];
//   likes: unknown[];
//   userIdentifier: string;
//   roles: string[];
// };

type Project = {
  id: number;
  user: { email: string };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  comments: unknown[];
  components: unknown[];
};

// const projects: CardData[] = [
//   {
//     title: 'Vélo tigre',
//     text: "J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls",
//     img: '/bikeCustom.png',
//     likes: 12,
//     comments: 3,
//     userImg: '/alice.jpg',
//     userName: 'Alice',
//     date: '2025-06-27',
//     variant: 'purpleCard', // <-- OK
//   },
//   {
//     title: 'Titre 2',
//     text: "J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls, J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls",
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 3',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },

//   {
//     title: 'Titre 4',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 5',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 6',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 7',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 8',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 9',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
//   {
//     title: 'Titre 10',
//     text: 'Description 2',
//     img: '/bikeCustom.png',
//     likes: 5,
//     comments: 1,
//     userImg: '/alice.jpg',
//     userName: 'Bob',
//     date: '2025-06-20',
//     variant: 'cardcolor', // <-- OK
//     nature: 'Selle',
//   },
// ];

const Feed = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        setProjects(null);
        console.error('Error fetching projects:', err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.status === 401 ? 'Not authenticated' : err.message);
          router.push('/login');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    void fetchProjects();
  }, []);

  // const router = useRouter();

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const res = await api.get('/api/projects');
  //       setProjects(res.data);
  //     } catch (err) {
  //       setProjects(null);
  //       if (axios.isAxiosError(err)) {
  //         setError(err.response?.status === 401 ? 'Not authenticated' : err.message);
  //         router.push('/login');
  //       } else if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('Unknown error');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   void fetchProjects();
  // }, []);

  return (
    <div className="min-h-screen rounded bg-indigo-100 p-3 text-indigo-900 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Feed</h2>
      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : error ? (
        <div className="mb-4 text-red-600">{error}</div>
      ) : (
        projects && <FeedList projects={projects} />
      )}
    </div>
  );
};

export default Feed;
