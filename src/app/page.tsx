'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Example check: replace this with your actual auth logic
    const user = localStorage.getItem('user'); // or check for a valid token
    if (user) {
      router.push('/chat');
    } else {
      router.push('/auth');
    }
  }, [router]);

  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}
