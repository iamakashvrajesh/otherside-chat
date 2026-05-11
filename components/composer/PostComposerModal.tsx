'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useComposer } from './ComposerContext';

type PostType = 'question' | 'hot_take' | 'poll';
type Topic =
  | 'Dating'
  | 'Texting'
  | 'First dates'
  | 'Breakups'
  | 'Long distance'
  | 'Red flags'
  | 'Crushes'
  | 'Marriage'
  | 'Ghosting';

const TOPICS: Topic[] = [
  'Dating',
  'Texting',
  'First dates',
  'Crushes',
  'Red flags',
  'Ghosting',
  'Breakups',
  'Long distance',
  'Marriage',
];

const PLACEHOLDERS: Record<PostType, string> = {
  question:
    "Ask the other side something honest. Be specific — the more real the question, the better the answers.",
  hot_take:
    "Drop your unpopular opinion. Don't soften it. The point is to start a real disagreement.",
  poll: 'Ask a question with 2-4 options.',
};

const MAX_LEN = {
  content: 500,
  context: 800,
  pollOption: 80,
};

export default function PostComposerModal() {
  const { isOpen, initialType, close } = useComposer();
  const [type, setType] = useState<PostType>(initialType);
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [showContext, setShowContext] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setContent('');
      setContext('');
      setTopic(null);
      setPollOptions(['', '']);
      setShowContext(false);
      setError(null);
      setSuccess(false);
      setTimeout(() => contentRef.current?.focus(), 120);
    }
  }, [isOpen, initialType]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, content, context, topic, pollOptions, type]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmedContent = content.trim();
  const validPollOptions = pollOptions.map((o) => o.trim()).filter(Boolean);
  const canSubmit = (() => {
    if (!trimmedContent) return false;
    if (!topic) return false;
    if (type === 'poll' && validPollOptions.length < 2) return false;
    if (submitting) return false;
    return true;
  })();

  function updatePollOption(index: number, value: string) {
    const next = [...pollOptions];
    next[index] = value.slice(0, MAX_LEN.pollOption);
    setPollOptions(next);
  }

  function addPollOption() {
    if (pollOptions.length >= 4) return;
    setPollOptions([...pollOptions, '']);
  }

  function removePollOption(index: number) {
    if (pollOptions.length <= 2) return;
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You need to be signed in to post.');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('gender')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Could not load your profile. Try refreshing.');
      }

      const postPayload: Record<string, unknown> = {
        user_id: user.id,
        type,
        content: trimmedContent,
        topic,
        gender: profile.gender,
      };
      if (type !== 'poll' && context.trim()) postPayload.context = context.trim();

      const { error: postError } = await supabase
        .from('posts')
        .insert(postPayload)
        .select()
        .single();

      if (postError) throw postError;

      setSuccess(true);
      setTimeout(() => {
        close();
        if (window.location.pathname === '/feed') {
          window.location.reload();
        }
      }, 800);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
      setSubmitting(false);
    }
  }

  const contentLen = content.length;
  const contentNearLimit = contentLen > MAX_LEN.content * 0.85;

  return (
    <div
      className="composer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="composer-modal"
        role="dialog"
        aria-modal="true"
        aria-label="New post"
      >
        {/* Header */}
        <div className="composer-head">
          <div className="composer-head-left">
            <div className="composer-eyebrow">
              <span className="composer-eyebrow-line" />
              <span>New post</span>
            </div>
            <h2 className="composer-title">
              {type === 'question' && (
                <>
                  Ask the <em>other side</em>
                </>
              )}
              {type === 'hot_take' && (
                <>
                  Drop a <em>hot take</em>
                </>
              )}
              {type === 'poll' && (
                <>
                  Run a <em>poll</em>
                </>
              )}
            </h2>
          </div>
          <button className="composer-close" onClick={close} aria-label="Close">
            ×
          </button>
        </div>

        {/* Type switcher */}
        <div className="composer-types">
          <button
            className={`composer-type ${type === 'question' ? 'active' : ''}`}
            onClick={() => setType('question')}
            type="button"
          >
            <span className="composer-type-icon">◇</span>
            <span>Question</span>
          </button>
          <button
            className={`composer-type ${type === 'hot_take' ? 'active' : ''}`}
            onClick={() => setType('hot_take')}
            type="button"
          >
            <span className="composer-type-icon">⚡</span>
            <span>Hot take</span>
          </button>
          <button
            className={`composer-type ${type === 'poll' ? 'active' : ''}`}
            onClick={() => setType('poll')}
            type="button"
          >
            <span className="composer-type-icon">▢</span>
            <span>Poll</span>
          </button>
        </div>

        {/* Body */}
        <div className="composer-body">
          <div className="composer-field">
            <textarea
              ref={contentRef}
              className="composer-textarea-main"
              placeholder={PLACEHOLDERS[type]}
              value={content}
              onChange={(e) =>
                setContent(e.target.value.slice(0, MAX_LEN.content))
              }
              rows={3}
            />
            <div className="composer-counter">
              <span className={contentNearLimit ? 'near' : ''}>{contentLen}</span>
              <span className="composer-counter-dim">/ {MAX_LEN.content}</span>
            </div>
          </div>

          {type === 'poll' && (
            <div className="composer-poll-options">
              <div className="composer-section-label">
                Options · {validPollOptions.length}/4
              </div>
              {pollOptions.map((opt, i) => (
                <div className="composer-poll-row" key={i}>
                  <span className="composer-poll-bullet">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <input
                    className="composer-poll-input"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updatePollOption(i, e.target.value)}
                  />
                  {pollOptions.length > 2 && (
                    <button
                      className="composer-poll-remove"
                      onClick={() => removePollOption(i)}
                      type="button"
                      aria-label="Remove option"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {pollOptions.length < 4 && (
                <button
                  className="composer-poll-add"
                  onClick={addPollOption}
                  type="button"
                >
                  + Add option
                </button>
              )}
            </div>
          )}

          {type !== 'poll' && (
            <div className="composer-field">
              {!showContext ? (
                <button
                  className="composer-add-context"
                  onClick={() => setShowContext(true)}
                  type="button"
                >
                  + Add context (optional)
                </button>
              ) : (
                <>
                  <div className="composer-section-label">Context</div>
                  <textarea
                    className="composer-textarea-context"
                    placeholder="Add the backstory. The why behind the question."
                    value={context}
                    onChange={(e) =>
                      setContext(e.target.value.slice(0, MAX_LEN.context))
                    }
                    rows={2}
                  />
                  <div className="composer-counter">
                    <span>{context.length}</span>
                    <span className="composer-counter-dim">
                      / {MAX_LEN.context}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="composer-field">
            <div className="composer-section-label">
              Topic <span className="composer-section-required">required</span>
            </div>
            <div className="composer-topics">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  className={`composer-topic-chip ${topic === t ? 'sel' : ''}`}
                  onClick={() => setTopic(topic === t ? null : t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="composer-foot">
          <div className="composer-foot-left">
            <span className="composer-tag">Posting anonymously</span>
            <span className="composer-tag-dot">·</span>
            <span className="composer-tag">
              Tagged as <b>Girl</b>
            </span>
          </div>
          <div className="composer-foot-right">
            {error && <span className="composer-error">{error}</span>}
            {success && <span className="composer-success">Posted →</span>}
            <span className="composer-shortcut">⌘↵</span>
            <button
              className={`composer-submit ${canSubmit ? 'enabled' : ''}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
              type="button"
            >
              {submitting
                ? 'Posting...'
                : success
                  ? 'Posted!'
                  : type === 'poll'
                    ? 'Run poll'
                    : 'Post'}
              {!submitting && !success && <span> →</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}