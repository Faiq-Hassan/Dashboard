'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './signin.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithFacebook, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleFacebookSignIn = async () => {
    await signInWithFacebook();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src="/imusician-logo.svg" alt="iMusician" width={150} height={40} />
        <div className={styles.navLinks}>
          <Link href="/signup" className={styles.navLink}>Sign up</Link>
          <Link href="/signin" className={`${styles.navLink} ${styles.active}`}>Sign in</Link>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign in</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.signinButton}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          
          <button 
            type="button" 
            className={styles.facebookButton}
            onClick={handleFacebookSignIn}
            disabled={loading}
          >
            <span className={styles.facebookIcon}>f</span> Sign in with Facebook
          </button>
          
          <div className={styles.forgotPassword}>
            <Link href="/auth/forgot-password" className={styles.link}>Forgot password</Link>
          </div>
          
          <div className={styles.signupLink}>
            Do not have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 