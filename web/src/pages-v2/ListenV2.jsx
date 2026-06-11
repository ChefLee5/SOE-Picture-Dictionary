import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { assetPath } from '../utils/assetPath';
import FullSection from '../components-v2/FullSection';
import CharSplitText from '../components-v2/CharSplitText';
import { RevealV2 } from '../hooks/useScrollReveal';
import tracksData from '../data/tracks.json';

// ── Kit.com (ConvertKit) v3 config — same funnel as original Listen page ──
const KIT_API_KEY = 'P-utcloLVPjLE6oDuz3-sA';
const KIT_TAG_ID = 19643125; // "listen-optin" tag
const STORAGE_KEY = 'soe_listen_unlocked';

const ListenV2 = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [isUnlocked, setIsUnlocked] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });
  const [email, setEmail] = useState(location.state?.email || '');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('');
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    document.title = 'Listen — SOE Rhythm Quest';
  }, []);

  const tracks = tracksData.map((track) => ({
    id: track.id,
    title: t(`media.tracks.${track.id}.title`),
    domain: t(`media.tracks.${track.id}.domain`),
    domainIcon: track.domainIcon,
    color: track.color,
    cover: assetPath(`/assets/track-art/${track.cover}`),
    src: assetPath(`/audio/${track.audioFile}`),
  }));

  const unlock = () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    setIsUnlocked(true);
    setJustUnlocked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`https://api.convertkit.com/v3/tags/${KIT_TAG_ID}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email: email.trim(),
          first_name: firstName.trim() || undefined,
        }),
      });
      if (res.ok) {
        if (typeof window !== 'undefined') {
          window.gtag?.('event', 'generate_lead', { event_category: 'funnel', event_label: 'listen_optin_v2', value: 1 });
          window.fbq?.('track', 'Lead', { content_name: 'listen_optin_v2', content_category: 'email_funnel' });
        }
        unlock();
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || 'Subscription failed');
      }
    } catch (err) {
      console.error('Kit.com subscription error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="listen-v2">
      {/* ── Hero ── */}
      <FullSection
        bg={assetPath('/assets/marketing/quest-collage.webp')}
        overlay="light"
      >
        <div className="v2-container v2-text-center">
          <RevealV2>
            <span className="v2-label">Free preview · 19 tracks</span>
          </RevealV2>
          <CharSplitText tag="h1" className="v2-display v2-display--section" stagger={24}>
            Hear What Learning Sounds Like
          </CharSplitText>
          <RevealV2 className="v2-reveal--delay-2">
            <p className="v2-serif-italic" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', marginTop: '1rem' }}>
              Designed for the developing brain — not the algorithm.
            </p>
          </RevealV2>
        </div>
        <div className="v2-scroll-hint">↓</div>
      </FullSection>

      {/* ── Email gate ── */}
      {!isUnlocked && (
        <section className="v2-section v2-section--alt" id="optin">
          <div className="v2-container--narrow v2-container v2-text-center">
            <RevealV2>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🎧</span>
              <h2 className="v2-heading v2-heading--lg">Unlock the Full Quest</h2>
              <p className="v2-body v2-body--lg" style={{ maxWidth: '480px', margin: '1rem auto 2rem' }}>
                Enter your email to unlock all 19 tracks and start a free 5-day learning journey.
              </p>
              {status === 'error' && errorMsg && (
                <p style={{ color: '#e53935', fontWeight: 500, marginBottom: '1rem' }}>{errorMsg}</p>
              )}
              <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto' }}>
                <input
                  type="text"
                  className="v2-email-capture__input"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-label="First name"
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                />
                <div className="v2-email-capture" style={{ maxWidth: '100%' }}>
                  <input
                    type="email"
                    className="v2-email-capture__input"
                    placeholder="Your best email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="v2-btn v2-btn--gold" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Unlocking…' : 'Unlock →'}
                  </button>
                </div>
              </form>
              <p className="v2-email-meta">No spam, ever. Unsubscribe anytime.</p>
            </RevealV2>
          </div>
        </section>
      )}

      {justUnlocked && (
        <section className="v2-section v2-section--sage v2-text-center" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="v2-container">
            <h2 className="v2-heading v2-heading--md">🎉 You’re in, explorer!</h2>
            <p className="v2-body v2-body--lg" style={{ marginTop: '0.5rem' }}>
              All 19 tracks are unlocked below.
            </p>
          </div>
        </section>
      )}

      {/* ── Editorial tracklist ── */}
      <section className="v2-section">
        <div className="v2-container--narrow v2-container">
          <RevealV2>
            <div className="v2-text-center" style={{ marginBottom: '3rem' }}>
              <span className="v2-label">The full tracklist</span>
              <h2 className="v2-display v2-display--section" style={{ marginTop: '0.75rem' }}>
                19 Tracks. 7 Lands.
              </h2>
            </div>
          </RevealV2>

          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tracks.map((track, i) => (
              <li
                key={track.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--v2-border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--v2-font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'var(--v2-text-muted)',
                    minWidth: '2.2rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={track.cover}
                  alt={track.title}
                  loading="lazy"
                  style={{ width: 56, height: 56, borderRadius: 'var(--v2-radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="v2-heading v2-heading--sm" style={{ marginBottom: '0.15rem' }}>
                    {track.title}
                  </h3>
                  <span className="v2-label" style={{ color: track.color }}>
                    {track.domainIcon} {track.domain}
                  </span>
                </div>
                {isUnlocked ? (
                  <audio controls preload="none" src={track.src} style={{ height: 36, maxWidth: 220 }} />
                ) : (
                  <span style={{ fontSize: '1.1rem', color: 'var(--v2-text-muted)' }} aria-label="Locked">🔒</span>
                )}
              </li>
            ))}
          </ol>

          {!isUnlocked && (
            <div className="v2-text-center" style={{ marginTop: '2.5rem' }}>
              <a href="#optin" className="v2-btn v2-btn--gold">🎧 Unlock all 19 tracks free →</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListenV2;
