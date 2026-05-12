'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.length > 0 && password.length > 0 && !submitting;

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not start Google sign-in.';
      setError(message);
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Friendlier messages
        const msg = signInError.message.toLowerCase();
        if (msg.includes('email not confirmed')) {
          throw new Error('Check your email — you need to confirm your account first.');
        }
        if (msg.includes('invalid login')) {
          throw new Error('Email or password doesn\u2019t match.');
        }
        throw signInError;
      }

      router.push('/feed');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-atmosphere" aria-hidden />
      <div className="grain" aria-hidden />

      <header className="auth-topbar">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="o">Other</span>
          <span className="amp">/</span>
          <span className="s">Side</span>
        </Link>
        <div className="auth-topbar-right">
          <span className="auth-topbar-hint">New here?</span>
          <Link href="/signup" className="auth-topbar-link">Create account</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-eyebrow">
            <span className="auth-eyebrow-line" />
            <span>Welcome back</span>
          </div>
          <h1 className="auth-title">
            Log <em>in</em>
          </h1>
          <p className="auth-sub">
            Pick up where you left off.
          </p>

          {/* Google button */}
          <button
            type="button"
            className="auth-google"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>{googleLoading ? 'Opening Google…' : 'Continue with Google'}</span>
          </button>

          <div className="auth-divider">
            <span />
            <span className="auth-divider-text">or use email</span>
            <span />
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">
                Password
                <Link href="/forgot-password" className="auth-label-link">Forgot?</Link>
              </label>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error">{error}</div>
            )}

            <button
              type="submit"
              className={`auth-submit ${canSubmit ? 'enabled' : ''}`}
              disabled={!canSubmit}
            >
              {submitting ? 'Logging in…' : 'Log in →'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}