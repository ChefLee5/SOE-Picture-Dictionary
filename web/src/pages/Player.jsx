import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import MusicPlayerWidget from '../components/MusicPlayerWidget';
import TrackStack from '../components/TrackStack';
import BeehiivSubscribeForm from '../components/BeehiivSubscribeForm';
import { assetPath } from '../utils/assetPath';
import { audioUrl } from '../utils/audioUrl';
import tracksData from '../data/tracks.json';
import { trackLead } from '../utils/analytics';
import { triggerQuestCelebration } from '../components/ui/DesignSpells';

const STORAGE_KEY = 'soe_listen_unlocked';

const Player = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTrack, setActiveTrack] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(null);

  // ── Gate State ──────────────────────────────────────────────
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const isParamUnlocked = urlParams && (
        urlParams.get('unlocked') === 'true' ||
        urlParams.get('_bhref') === 'subscribe-forms' ||
        urlParams.has('email') ||
        urlParams.has('subscriber_id')
      );
      if (isParamUnlocked) {
        localStorage.setItem(STORAGE_KEY, '1');
        return true;
      }
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  // ── 19 Canonical Tracks Data ────────────────────────────────
  const tracks = useMemo(() => {
    return tracksData.map((track) => ({
      id: track.id,
      slug: track.slug || track.id,
      title: t(`media.tracks.${track.id}.title`) || track.title,
      artist: 'The Sound of Essentials',
      cover: assetPath(`/assets/track-art/${track.cover}`),
      src: audioUrl(track.audioFile),
      color: track.color || '#FF6F00',
      domain: t(`media.tracks.${track.id}.domain`) || track.domain,
      domainIcon: track.domainIcon || '🎵',
      lyrics: track.lyrics || null,
    }));
  }, [t]);

  useEffect(() => {
    document.title = isUnlocked
      ? 'Now Playing — SOE Rhythm Quest'
      : 'Unlock 19 Tracks — SOE Rhythm Quest';
  }, [isUnlocked]);

  // ── Unlock Handler ──────────────────────────────────────────
  const unlock = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch { /* ignore */ }
    setIsUnlocked(true);
    triggerQuestCelebration();
  }, []);

  // ── Beehiiv Redirect Detection ──────────────────────────────
  useEffect(() => {
    const isBeehiivRedirect =
      searchParams.get('unlocked') === 'true' ||
      searchParams.get('_bhref') === 'subscribe-forms' ||
      searchParams.has('email') ||
      searchParams.has('subscriber_id');

    if (!isBeehiivRedirect) return;

    trackLead({ formName: 'player_optin', source: 'player_page' });
    unlock();

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('unlocked');
      next.delete('_bhref');
      next.delete('email');
      next.delete('subscriber_id');
      return next;
    }, { replace: true });
  }, [searchParams, setSearchParams, unlock]);

  const handleTrackChange = useCallback((index) => {
    setActiveTrack(index);
  }, []);

  const handleStackSelect = useCallback((index) => {
    setSelectedTrack(index);
    setActiveTrack(index);
  }, []);

  return (
    <div className="player-page">
      <div className="player-page__bg" aria-hidden="true">
        <img
          src={assetPath('/assets/luminosity-hall.png')}
          alt=""
          className="player-page__bg-img"
        />
      </div>
      <div className="player-page__overlay" aria-hidden="true" />

      <div className="player-page__inner">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* ── LOCKED GATE STATE (Behind Email Capture) ── */
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="player-gate-wrap"
            >
              <div className="player-page__header">
                <span className="player-page__label">🔒 Free Founding Family Pass</span>
                <h1 className="player-page__title">
                  Unlock the <span className="accent-text">Full Player</span>
                </h1>
                <p className="player-page__subtitle">
                  Instant, screen-free access to all 19 remastered tracks, lyrics, and learning guides across the 7 Lands.
                </p>
              </div>

              <div className="player-gate-card">
                <div className="player-gate-badge">🎧 100% Free · Instant Unlock</div>
                <h2 className="player-gate-title">Enter your email to start listening</h2>
                <p className="player-gate-desc">
                  Join thousands of conscious parents and homeschoolers using music-first phonics and somatic rhythm for early learning.
                </p>

                <div style={{ maxWidth: '520px', margin: '1.5rem auto 0 auto' }}>
                  <BeehiivSubscribeForm
                    placeholder="Enter your best email address..."
                    buttonText="Unlock All 19 Tracks Free →"
                  />
                </div>

                <div className="player-gate-footer">
                  <span>🔒 No credit card required</span>
                  <span>•</span>
                  <span>⚡️ Instant browser streaming</span>
                  <span>•</span>
                  <Link to="/listen" style={{ color: 'var(--color-orange-light)', textDecoration: 'underline' }}>
                    Or preview tracks on Media Room →
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── UNLOCKED PLAYER STATE (Full Music Experience) ── */
            <motion.div
              key="unlocked-player"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="player-page__header">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span className="player-page__label" style={{ margin: 0 }}>♫ Now Playing</span>
                  <Link
                    to="/listen?unlocked=true"
                    className="player-page__back-link"
                    style={{ fontSize: '0.85rem', color: 'var(--color-orange, #FF6F00)', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,111,0,0.12)', border: '1px solid rgba(255,111,0,0.22)', padding: '0.25rem 0.9rem', borderRadius: '20px' }}
                  >
                    ← Media Room &amp; Gallery
                  </Link>
                </div>
                <h1 className="player-page__title">
                  Rhythm <span className="accent-text" style={{ color: 'var(--color-orange, #FF6F00)' }}>Quest</span>
                </h1>
                <p className="player-page__subtitle">
                  {tracks.length} tracks · 7 Lands · Designed for the developing brain
                </p>
              </div>

              <div className="player-page__layout">
                <div className="player-page__player-col">
                  <MusicPlayerWidget
                    tracks={tracks}
                    onTrackChange={handleTrackChange}
                    selectedTrack={selectedTrack}
                  />
                </div>

                <div className="player-page__stack-col">
                  <div className="player-page__stack-label">
                    <span className="player-page__stack-icon">🎵</span>
                    <span>Browse All 19 Tracks</span>
                  </div>
                  <TrackStack
                    tracks={tracks}
                    currentIndex={activeTrack}
                    onSelect={handleStackSelect}
                  />
                </div>
              </div>

              <p className="player-page__hint">
                Space to play/pause · ← → to seek · Shift+← → to skip · S shuffle · L loop
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .player-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6.5rem 1.5rem 3.5rem;
          background: var(--color-bg-cream, #FFF8F0);
          overflow-x: hidden;
        }

        .player-page__bg {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .player-page__bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.42;
          filter: saturate(130%) contrast(105%);
        }

        .player-page__overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(255, 248, 240, 0.72) 0%, rgba(250, 244, 235, 0.88) 100%);
          z-index: 1;
        }

        .player-page__inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          width: 100%;
        }

        .player-page__header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .player-page__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-orange, #FF6F00);
          background: rgba(255, 111, 0, 0.12);
          border: 1px solid rgba(255, 111, 0, 0.22);
          padding: 0.25rem 0.9rem;
          border-radius: 50px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .player-page__title {
          font-size: clamp(2.5rem, 7vw, 3.8rem);
          font-family: var(--font-heading, Fredoka, sans-serif);
          font-weight: 700;
          margin: 0.4rem 0 0.5rem 0;
          color: var(--color-text, #2D3142);
          letter-spacing: -0.015em;
        }

        .player-page__subtitle {
          font-size: 1.05rem;
          color: var(--color-text-light, #5C6479);
          margin: 0;
          max-width: 620px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .player-page__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
          align-items: start;
        }

        @media (max-width: 860px) {
          .player-page__layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .player-page__player-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .player-page__stack-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .player-page__stack-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          font-family: var(--font-heading, Fredoka, sans-serif);
          font-weight: 700;
          color: var(--color-text, #2D3142);
          margin-bottom: 0.5rem;
        }

        .player-page__stack-icon {
          font-size: 1.25rem;
        }

        .player-page__hint {
          text-align: center;
          font-size: 0.875rem;
          color: var(--color-text-muted, #8E95A5);
          margin: 0;
          margin-top: 2rem;
        }

        /* ── Gate Card ── */
        .player-gate-wrap {
          max-width: 720px;
          margin: 0 auto;
        }

        .player-gate-card {
          background: rgba(255, 255, 255, 0.94);
          border: 2px solid rgba(255, 111, 0, 0.25);
          border-radius: var(--radius-lg, 28px);
          padding: 3rem 2rem;
          text-align: center;
          backdrop-filter: blur(20px) saturate(160%);
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 20px 50px rgba(74, 53, 30, 0.10);
        }

        .player-gate-badge {
          display: inline-block;
          background: rgba(255, 111, 0, 0.12);
          color: var(--color-orange, #FF6F00);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.35rem 1.2rem;
          border-radius: 50px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .player-gate-title {
          color: var(--color-text, #2D3142);
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-family: var(--font-heading, Fredoka, sans-serif);
          margin-bottom: 0.75rem;
        }

        .player-gate-desc {
          color: var(--color-text-light, #5C6479);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto;
        }

        .player-gate-footer {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--color-text-muted, #8E95A5);
        }
      `}</style>
    </div>
  );
};

export default Player;