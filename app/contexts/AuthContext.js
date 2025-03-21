'use client';

import { createContext, useContext, useState } from 'react';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Invalid email or password');
        return false;
      }

      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An error occurred during sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email, firstName, lastName, password, receiveNews) => {
    try {
      setError('');
      setLoading(true);
      
      // Call our API to register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          receiveNews,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return false;
      }
      
      // Sign in the user after successful registration
      return await signIn(email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An error occurred during sign up');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      await nextAuthSignOut({ redirect: false });
      router.push('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Facebook sign in
  const signInWithFacebook = async () => {
    try {
      setError('');
      setLoading(true);
      
      const result = await nextAuthSignIn('facebook', {
        redirect: false,
      });

      if (result.error) {
        setError('Error signing in with Facebook');
        return false;
      }

      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Facebook sign in error:', error);
      setError('An error occurred during Facebook sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    signIn,
    signUp,
    signOut,
    signInWithFacebook,
    error,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
} 