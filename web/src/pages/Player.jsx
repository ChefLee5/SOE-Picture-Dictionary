import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MusicPlayerWidget from '../components/MusicPlayerWidget';
import TrackStack from '../components/TrackStack';
import { assetPath } from '../utils/assetPath';
import { supabase } from '../lib/supabase';

const Player = () => {
  const { t } = useTranslation();
  const [activeTrack, setActiveTrack] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Now Playing — SOE Rhythm Quest';
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('tracks')
          .select('id, slug, audio_file, cover, color, domain_icon, lyrics')
          .order('id', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        if (!data || data.length === 0) {
          setTracks([]);
          setLoading(false);
          return;
        }

        const formattedTracks = data.map(track => ({
          id: track.id,
          title: t(`media.tracks.${track.id}.title`),
          artist: 'The Sound of Essentials',
          cover: assetPath(`/assets/track-art/${track.cover}`),
          src: supabase.storage.from('audio').getPublicUrl(track.audio_file).data.publicUrl,
          color: track.color,
          domainIcon: track.domain_icon,
          lyrics: track.lyrics || null,
        }));

        setTracks(formattedTracks);
      } catch (err) {
        console.error('Error fetching tracks from Supabase:', err);
        setError(err.message || 'Failed to load tracks. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const handleTrackChange = useCallback((index) => {
    setActiveTrack(index);
  }, []);

  const handleStackSelect = useCallback((index) => {
    setSelectedTrack(index);
    setActiveTrack(index);
  }, []);

  if (loading) {
    return (
      <div className="player-page">
        <div className="player-page__bg" aria-hidden="true">
          <img src={assetPath('/assets/luminosity-hall.png')} alt="" className="player-page__bg-img" />
        </div>
        <div className="player-page__overlay" aria-hidden="true" />
        <div className="player-page__inner">
          <div className="player-page__header">
            <p style={{ color: '#fff', textAlign: 'center' }}>Loading tracks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-page">
        <div className="player-page__bg" aria-hidden="true">
          <img src={assetPath('/assets/luminosity-hall.png')} alt="" className="player-page__bg-img" />
        </div>
        <div className="player-page__overlay" aria-hidden="true" />
        <div className="player-page__inner">
          <div className="player-page__header">
            <h2 style={{ color: '#fff', textAlign: 'center' }}>Oops!</h2>
            <p style={{ color: '#aaa', textAlign: 'center' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="player-page">
        <div className="player-page__bg" aria-hidden="true">
          <img src={assetPath('/assets/luminosity-hall.png')} alt="" className="player-page__bg-img" />
        </div>
        <div className="player-page__overlay" aria-hidden="true" />
        <div className="player-page__inner">
          <div className="player-page__header">
            <p style={{ color: '#aaa', textAlign: 'center' }}>No tracks are available right now.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="player-page__bg" aria-hidden="true">
        <img src={assetPath('/assets/luminosity-hall.png')} alt="" className="player-page__bg-img" />
      </div>
      <div className="player-page__overlay" aria-hidden="true" />

      <div className="player-page__inner">
        <div className="player-page__header">
          <span className="player-page__label">♫ Now Playing</span>
          <h1 className="player-page__title">
            Rhythm <span className="accent-text">Quest</span>
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
              <span>Browse Tracks</span>
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
      </div>

      <style>{`
        .player-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem 2rem;
          background: #0a0604;
          overflow: hidden;
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
        }

        .player-page__overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 6, 4, 0.75);
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
          margin-bottom: 3rem;
          color: #fff;
        }

        .player-page__label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: #ccc;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .player-page__title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #fff;
        }

        .player-page__subtitle {
          font-size: 1rem;
          color: #aaa;
          margin: 0;
          letter-spacing: 0.05em;
        }

        .player-page__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .player-page__layout {
            grid-template-columns: 1fr;
            gap: 2rem;
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
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .player-page__stack-icon {
          font-size: 1.25rem;
        }

        .player-page__hint {
          text-align: center;
          font-size: 0.875rem;
          color: #999;
          margin: 0;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Player;