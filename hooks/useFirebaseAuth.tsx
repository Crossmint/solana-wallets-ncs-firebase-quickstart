import { useEffect, useState } from 'react';
import { useCrossmint } from '@crossmint/client-sdk-react-ui';
import type {  User } from 'firebase/auth';
import {  onAuthStateChange } from '@/lib/firebase';

export const useFirebaseAuth = () => {
  const { setJwt } = useCrossmint();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        try {
          const token = await user.getIdToken();
          setJwt(token);
        } catch (error) {
          console.error('Failed to get Firebase JWT:', error);
          setJwt(undefined);
        }
      } else {
        setJwt(undefined);
      }
    });

    return () => unsubscribe();
  }, [setJwt]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}; 