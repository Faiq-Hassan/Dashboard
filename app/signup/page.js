'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './signup.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [receiveNews, setReceiveNews] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signUp, signInWithFacebook, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      return;
    }
    
    await signUp(email, firstName, lastName, password, receiveNews);
  };

  const handleFacebookSignUp = async () => {
    await signInWithFacebook();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src="/imusician-logo.svg" alt="iMusician" width={150} height={40} />
        <div className={styles.navLinks}>
          <Link href="/signup" className={`${styles.navLink} ${styles.active}`}>Sign up</Link>
          <Link href="/signin" className={styles.navLink}>Sign in</Link>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign up</h1>
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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
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
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={receiveNews}
                onChange={() => setReceiveNews(!receiveNews)}
                className={styles.checkbox}
                disabled={loading}
              />
              <span className={styles.checkboxText}>
                I want to receive music distribution discounts, emails on how to succeed as an artist, and the latest iMusician news.
              </span>
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className={styles.checkbox}
                required
                disabled={loading}
              />
              <span className={styles.checkboxText}>
                I accept the <Link href="/auth/terms" className={styles.link}>terms and conditions</Link> and <Link href="/auth/privacy" className={styles.link}>privacy policy</Link>
              </span>
            </label>
          </div>
          <button 
            type="submit" 
            className={styles.signupButton}
            disabled={loading || !acceptTerms}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
          <button 
            type="button" 
            className={styles.facebookButton}
            onClick={handleFacebookSignUp}
            disabled={loading}
          >
            <span className={styles.facebookIcon}>f</span> Sign up with Facebook
          </button>
          <div className={styles.loginLink}>
            Already have an account? <Link href="/signin" className={styles.link}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 