'use client';

import React from 'react';
import Carousel from '../Carousel';

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

type CardData = {
  title: string;
  text: string;
  img: string;
  likes: number;
  comments: number;
  userImg?: string;
  userName?: string;
  date?: string;
  variant: 'cardcolor' | 'purpleCard';
  nature?: string;
};

const cardsData: CardData[] = [
  {
    title: 'Vélo tigre',
    text: "J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls",
    img: '/bikeCustom.png',
    likes: 12,
    comments: 3,
    userImg: '/alice.jpg',
    userName: 'Alice',
    date: '2025-06-27',
    variant: 'purpleCard', // <-- OK
  },
  {
    title: 'Titre 2',
    text: "J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls, J'ai changé les roues de mon vélo tigre, dites moi ce que vous en pensez pls",
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 3',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },

  {
    title: 'Titre 4',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 5',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 6',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 7',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 8',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 9',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
  {
    title: 'Titre 10',
    text: 'Description 2',
    img: '/bikeCustom.png',
    likes: 5,
    comments: 1,
    userImg: '/alice.jpg',
    userName: 'Bob',
    date: '2025-06-20',
    variant: 'cardcolor', // <-- OK
    nature: 'Selle',
  },
];

const Feed = () => {
  // const router = useRouter();
  // const [user, setUser] = useState<ApiUser | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await api.get('/api/me');
  //       setUser(res.data);
  //     } catch (err) {
  //       setUser(null);
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
  //   void fetchUser();
  // }, []);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Feed</h2>
      {/* {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : error ? (
        <div className="mb-4 text-red-600">{error}</div>
      ) : user ? ( */}
        <div className="mb-4 rounded bg-indigo-100 p-3 text-indigo-900 shadow">
          <Carousel data={cardsData} />
        </div>
      {/* ) : (
        <div className="mb-4 text-gray-600">Nothing to display.</div>
      )}

      <div>
        <p>Feed posts go here</p>
      </div> */}
    </div>
  );
};

export default Feed;
