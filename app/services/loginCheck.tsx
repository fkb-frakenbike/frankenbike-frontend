import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCheck() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          router.push('/feed');
        }
      })
      .catch(() => {
        // Non connecté, ne rien faire
      });
  }, [router]);

  return null;
}
