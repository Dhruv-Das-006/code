"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/store/authSlice';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated) {
          dispatch(setUser(data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}
