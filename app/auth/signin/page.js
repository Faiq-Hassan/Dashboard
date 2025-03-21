'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthSignIn() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signin');
  }, [router]);

  return null;
} 