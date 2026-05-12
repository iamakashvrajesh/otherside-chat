'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Gender = 'girl' | 'guy' | 'nonbinary' | 'prefer_not';

const GENDERS: { value: Gender; label: string; pronouns: string }[] = [
  { value: 'girl', label: 'Girl', pronouns: 'she/her' },
  { value: 'guy', label: 'Guy', pronouns: 'he/him' },
  { value: 'nonbinary', label: 'Non-binary', pronouns: 'they/them' },
  { value: 'prefer_not', label: 'Prefer not to say', pronouns: 'private' },
];

// Password strength check
function checkPasswordStrength(password: string) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  let label = '';
  let color = '';
  if (password.length === 0) {
    label = '';
    color = '';
  } else if (score <= 1) {
    label = 'Too weak';
    color = 'pk';
  } else if (score === 2) {
    label = 'Getting there';
    color = 'go';
  } else if (score === 3) {
    label = 'Strong';
    color = 'gr';
  } else {
    label = 'Excellent';
    color = 'gr';
  }
  return { checks, score, label, color };
}

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const strength = checkPasswordStrength(password);

  const usernameValid = username.length >= 3 && /^[a-z0-9_]+$/i.test(username);
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passwordValid = strength.score >= 2;
  const genderValid = gender !== null;

  const canSubmit = usernameValid && emailValid && passwordValid && genderValid && !submitting;

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
      // Supabase redirects on success — no further code runs here
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
          data: {
            username,
            gender,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Detect "already exists" via empty identities array
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        throw new Error('An account with this email already exists. Try logging in.');
      }

      // Insert into profiles table
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          username,
          gender,
        });
      }

      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      // Friendlier error messages
      if (message.toLowerCase().includes('rate limit')) {
        setError('Slow down — try again in a minute.');
      } else {
        setError(message);
      }
      setSubmitting(false);
    }
  }

  if (success) {
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
        </header>

        <main className="auth-main">
          <div className="auth-card">
            <div className="auth-success-icon">✉</div>
            <h1 className="auth-success-title">Check your <em>email</em></h1>
            <p className="auth-success-sub">
              We sent a confirmation link to <strong>{email}</strong>.<br />
              Click it to finish signing up.
            </p>
            <div className="auth-success-hint">
              Didn&apos;t arrive? Check spam, or wait 30 seconds and try again.
            </div>
          </div>
        </main>
      </div>
    );
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
          <span className="auth-topbar-hint">Already have an account?</span>
          <Link href="/login" className="auth-topbar-link">Log in</Link>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-eyebrow">
            <span className="auth-eyebrow-line" />
            <span>Join OtherSide</span>
          </div>
          <h1 className="auth-title">
            Create your <em>side</em>
          </h1>
          <p className="auth-sub">
            30 seconds. No real name needed.
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
            {/* Username */}
            <div className="auth-field">
              <label className="auth-label">
                Username
                <span className="auth-label-hint">your anonymous alias</span>
              </label>
              <input
                type="text"
                className={`auth-input ${username.length > 0 && !usernameValid ? 'invalid' : ''}`}
                placeholder="e.g. willowhaze"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                maxLength={20}
                autoComplete="username"
              />
              {username.length > 0 && !usernameValid && (
                <div className="auth-hint err">3+ characters, letters/numbers/underscore only</div>
              )}
              {usernameValid && (
                <div className="auth-hint ok">Looks good — others will see @{username}</div>
              )}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">
                Email
                <span className="auth-label-hint">we never share it</span>
              </label>
              <input
                type="email"
                className={`auth-input ${email.length > 0 && !emailValid ? 'invalid' : ''}`}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password with strength meter */}
            <div className="auth-field">
              <label className="auth-label">
                Password
                {strength.label && (
                  <span className={`auth-label-strength c-${strength.color}`}>
                    {strength.label}
                  </span>
                )}
              </label>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
              {password.length > 0 && (
                <div className="auth-strength">
                  <div className="auth-strength-bar">
                    <div
                      className={`auth-strength-fill c-${strength.color}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <div className="auth-strength-checks">
                    <span className={strength.checks.length ? 'ok' : ''}>8+ chars</span>
                    <span className={strength.checks.upper ? 'ok' : ''}>uppercase</span>
                    <span className={strength.checks.number ? 'ok' : ''}>number</span>
                    <span className={strength.checks.special ? 'ok' : ''}>symbol</span>
                  </div>
                </div>
              )}
            </div>

            {/* Gender selector */}
            <div className="auth-field">
              <label className="auth-label">
                I identify as
                <span className="auth-label-hint">shown next to your posts</span>
              </label>
              <div className="auth-gender-grid">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    className={`auth-gender-card ${gender === g.value ? 'sel' : ''} ${g.value}`}
                    onClick={() => setGender(g.value)}
                  >
                    <span className="auth-gender-label">{g.label}</span>
                    <span className="auth-gender-pronouns">{g.pronouns}</span>
                  </button>
                ))}
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
              {submitting ? 'Creating your account…' : 'Create account →'}
            </button>

            <p className="auth-tos">
              By signing up you agree to our <a>Terms</a> and <a>Privacy Policy</a>. OtherSide is for users 13+. 1-on-1 matching requires 18+.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}