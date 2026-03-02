import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AudioVisualizer from '../components/AudioVisualizer';
import { assetPath } from '../utils/assetPath';

/* ── Reveal Hook ── */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};


/* ── Book Pages ── */
const bookPages = [
  '/assets/coloring-book/Coloring book cover.png',
  '/assets/coloring-book/Coloring page 1.png',
  '/assets/coloring-book/Coloring page 2.png',
  '/assets/coloring-book/Coloring page 3.png',
  '/assets/coloring-book/Coloring page 4.png',
  '/assets/coloring-book/Coloring page 5.png',
  '/assets/coloring-book/Coloring page 6.png',
  '/assets/coloring-book/Coloring page 7.png',
].map(assetPath);

const soeBookPages = [
  '/assets/soe-book/The Sound of Essentials_ Rhythm Quest Book Cover.png',
  ...Array.from({ length: 15 }, (_, i) => `/assets/soe-book/${i + 2}.png`),
].map(assetPath);

/* ── Album Art Carousel ── */
const AlbumCarousel = ({ tracks, currentTrack, onSelect }) => {
  return (
    <div className="album-carousel">
      <div className="album-carousel__track">
        {tracks.map((t, i) => {
          const offset = i - currentTrack;
          const isActive = i === currentTrack;

          return (
            <motion.div
              key={t.id}
              className={`album-slide ${isActive ? 'active' : ''}`}
              initial={false}
              animate={{
                x: offset * 140,
                scale: isActive ? 1.15 : 0.8,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.4,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                filter: isActive ? 'none' : 'grayscale(0.6) blur(2px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
              onClick={() => onSelect(i)}
            >
              <img src={t.cover} alt={t.title} className="album-cover" />
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="album-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <span className="album-label__title">{t.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Audio Player Component ── */
const AudioPlayer = ({ tracks }) => {
  const { t } = useTranslation();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const initAudio = () => {
    if (audioContextRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 64;
      const source = context.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(context.destination);
      audioContextRef.current = context;
      setAnalyser(analyserNode);
    } catch (err) {
      console.error("AudioPlayer: Failed to init audio graph", err);
    }
  };

  const track = tracks[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    const onLoadedMeta = () => {
      setDuration(audio.duration);
    };
    const onEnded = () => {
      setIsPlaying(false);
      if (currentTrack < tracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrack, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => { });
    }
  }, [currentTrack]);

  const togglePlay = () => {
    initAudio();
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const audio = audioRef.current;
    audio.currentTime = pct * duration;
    setProgress(pct * duration);
  };

  const selectTrack = (i) => {
    initAudio();
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    if (i === currentTrack && isPlaying) {
      togglePlay();
      return;
    }
    setCurrentTrack(i);
    setIsPlaying(true);
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player glass-card">
      <audio ref={audioRef} src={track.src} preload="metadata" />

      {/* Album Carousel */}
      <AlbumCarousel tracks={tracks} currentTrack={currentTrack} onSelect={selectTrack} />

      {/* Now Playing */}
      <div className="audio-player__now">
        <div className="audio-player__icon-wrap" style={{ background: `${track.color}22`, borderColor: `${track.color}44` }}>
          <span className="audio-player__domain-icon">{track.domainIcon}</span>
        </div>
        <div className="audio-player__info">
          <h4 className="audio-player__title" style={{ color: track.color }}>{track.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="audio-player__domain">{track.domain}</span>
            <AudioVisualizer analyser={analyser} isPlaying={isPlaying} color={track.color} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="audio-player__controls">
        <button className="audio-player__play-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
          )}
        </button>

        <div className="audio-player__progress-wrap" onClick={handleSeek} role="slider" aria-label="Track progress" aria-valuenow={progress} aria-valuemax={duration}>
          <div className="audio-player__progress-bar">
            <div className="audio-player__progress-fill" style={{ width: `${duration ? (progress / duration) * 100 : 0}%`, background: track.color }}></div>
          </div>
        </div>

        <span className="audio-player__time">{formatTime(progress)} / {formatTime(duration)}</span>

        {track.lyrics && (
          <button
            className={`audio-player__lyrics-btn ${showLyrics ? 'active' : ''}`}
            onClick={() => setShowLyrics(!showLyrics)}
            aria-label="Toggle lyrics"
          >
            {t('media.lyrics_btn')}
          </button>
        )}
      </div>

      {/* Lyrics Panel */}
      {showLyrics && track.lyrics && (
        <div className="audio-player__lyrics animate-fade-in">
          <div className="audio-player__lyrics-content">
            {track.lyrics.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('(') ? 'lyrics-label' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Track List */}
      <div className="audio-player__tracks">
        {tracks.map((t, i) => (
          <button
            key={t.id}
            className={`audio-player__track ${i === currentTrack ? 'audio-player__track--active' : ''}`}
            onClick={() => selectTrack(i)}
            aria-label={`Play ${t.title}`}
          >
            <span className="audio-player__track-icon" style={{ color: t.color }}>{t.domainIcon}</span>
            <div className="audio-player__track-info">
              <span className="audio-player__track-title">{t.title}</span>
              <span className="audio-player__track-domain">{t.domain}</span>
            </div>
            {i === currentTrack && isPlaying && (
              <AudioVisualizer analyser={analyser} isPlaying={isPlaying} color={t.color} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Media Room Page ── */
const MediaRoom = () => {
  const { t } = useTranslation();
  const [bookIndex, setBookIndex] = useState(0);
  const [soeBookIndex, setSoeBookIndex] = useState(0);

  /* ── Track Data ── */
  const tracks = [
    { id: 1, title: t('media.tracks.1.title'), domain: t('media.tracks.1.domain'), domainIcon: '☀️', desc: t('media.tracks.1.desc'), src: assetPath('/audio/01. Sunny Day (intro).mp3'), color: '#FF6F00', lyrics: null, cover: assetPath('/assets/soe-logo.png') },
    { id: 2, title: t('media.tracks.2.title'), domain: t('media.tracks.2.domain'), domainIcon: '📅', desc: t('media.tracks.2.desc'), src: assetPath('/audio/02. Days of the Week.mp3'), color: '#1E88E5', cover: assetPath('/assets/characters/ELIAS.jpg'), lyrics: `(Verse)\nSeven days of a week I'll sing my song.\nCreation speaks to me all day long.\nHow I enjoy looking at those big white fluffy clouds.\nIn the daytime at night, I always look forward\nto the bright stars sparkling in the sky.\n\n(Chorus)\nSunday, Monday, Tuesday, Wednesday,\nThursday, Friday, Saturday.\nSunday, Monday, Tuesday, Wednesday,\nThursday, Friday, Saturday.` },
    { id: 3, title: t('media.tracks.3.title'), domain: t('media.tracks.3.domain'), domainIcon: '🗣️', desc: t('media.tracks.3.desc'), src: assetPath('/audio/03. Alphabet Song Remix.mp3'), color: '#FF6F00', cover: assetPath('/assets/characters/KENJI.jpg'), lyrics: `(Verse)\nA B C D E F G H I J K L M N O P\nQ R S T U V W X Y and Z.\nNow I know my ABC.\nNext time, won't you sing with me?\n\n(Remix / Breakdown)\nNow I know my ABCs remix.\nA A A B B B... C C C... D...\nE E F F... G G... H H I I I...\nJ J... K K K... L L M M...\nN O O O... P P P... Q...\nR S S T T T... U V W X Y Z` },
    { id: 4, title: t('media.tracks.4.title'), domain: t('media.tracks.4.domain'), domainIcon: '🎨', desc: t('media.tracks.4.desc'), src: assetPath('/audio/04. Horses Interlude.mp3'), color: '#9C27B0', cover: assetPath('/assets/characters/AMARA.jpg'), lyrics: `(Spoken / Dialogue)\nHorses. Horses.\nThat's not a horse. That's a donkey.\nHorses. Horses.\nWait a minute. That's not a horse. That's a pig.\nHorses. Horses.\nGuys, did someone let the dogs out? That's a sheep.\nThat's not a horse.\n\nOh, can someone please get that cat out of here?\nWe're looking for a horse.\nAn elephant is certainly not a horse.\nLove those chickens, but I still need a horse.\nMonkeys. We need a horse.\nHorses. Now that's a horse.` },
    { id: 5, title: t('media.tracks.5.title'), domain: t('media.tracks.5.domain'), domainIcon: '🇫🇷', desc: t('media.tracks.5.desc'), src: assetPath('/audio/05. Le Cheval.mp3'), color: '#1E88E5', cover: assetPath('/assets/characters/RONAN.jpg'), lyrics: `(Verse — Sung in French)\nDeux accrets le cheval, fort et puissant\nDeux accrets le cheval, fort et puissant\nDeux accrets le cheval, fort et puissant\n\nOh, I can almost see the horses now grazing,\nEating up grass and apples, which they love so much.\nThe horse has strength and power,\nable to see almost all the way around its body.\nAfraid of nothing in the time of war,\nThe horse walks, trots, canter, and gallops.\nWhat an amazing creation.` },
    { id: 6, title: t('media.tracks.6.title'), domain: t('media.tracks.6.domain'), domainIcon: '🤸', desc: t('media.tracks.6.desc'), src: assetPath('/audio/06. Lets Stretch.mp3'), color: '#4CAF50', cover: assetPath('/assets/characters/FELIX.jpg'), lyrics: `(Breathing Exercise)\\nBreathe in through your nose.\\nBreathe out through your mouth.\\n(Repeat)\\n\\n(Stretching Movements)\\nLet's stretch.\\nBring your arms up. Reach to the sky.\\nStretch real high.\\nBring your arms down.\\nDon't bend your knees.\\nTouch your toes.\\n(Repeat)` },
    { id: 7, title: t('media.tracks.7.title'), domain: t('media.tracks.7.domain'), domainIcon: '💪', desc: t('media.tracks.7.desc'), src: assetPath('/audio/07. Drill Time.mp3'), color: '#4CAF50', cover: assetPath('/assets/characters/VESTA.jpg'), lyrics: `(Intro)\\nOn your mark, get set, ready, go.\\nStay on the path. Always learning.\\n\\n(The March)\\nForward march.\\nLeft, left, left, right, left.\\nLeft, left, left, right, left.\\n\\n(Chant)\\nAll I know is all I know.\\nWisdom is more precious than gold.\\nSound off! 1, 2, 3, 4.\\n\\n(The Shake)\\nWe're so excited about learning, we want to shake. Woohoo!\\nShake, shake, shake your left arm.\\nShake, shake, shake your right arm.\\nShake, shake, shake your left leg.\\nShake, shake, shake your right leg.\\n\\n(Outro)\\nChildren, please remember\\nalways stay on the right path and keep on learning.` },
    { id: 8, title: t('media.tracks.8.title'), domain: t('media.tracks.8.domain'), domainIcon: '🔢', desc: t('media.tracks.8.desc'), src: assetPath('/audio/08. Numbers.mp3'), color: '#FF6F00', cover: assetPath('/assets/characters/KWAME.jpg'), lyrics: `(Intro)\\nI like the numbers.\\nIt is so much fun to count.\\n\\n(Call and Response)\\nNow let's count to 10 while we clap.\\nOne clap. Follow me. One.\\nTwo claps. Follow me. One. Two.\\nThree claps. Follow me. One. Two. Three.\\n...\\nTen claps. Follow me.\\n1 2 3 4 5 6 7 8 9 10.\\n\\n(Outro)\\nHooray. You did it.\\nGive yourself a great big hand clap.` },
    { id: 9, title: t('media.tracks.9.title'), domain: t('media.tracks.9.domain'), domainIcon: '🔬', desc: t('media.tracks.9.desc'), src: assetPath('/audio/09. My Body.mp3'), color: '#9C27B0', cover: assetPath('/assets/characters/ATHENA.jpg'), lyrics: `(Verse 1: Face)\\nWhat's on your face?\\nEyes, nose, mouth, chin.\\nDon't forget about your forehead, cheeks, and two ears.\\n\\n(Verse 2: Upper Body)\\nMy body is strong.\\nNeck, shoulders, back, arms.\\nDon't forget about your hands and tip fingers.\\n\\n(Verse 3: Lower Body)\\nMy body is strong.\\nHip, thighs, knees, legs.\\nDon't forget about your ankles, feet, and ten toes.\\n\\n(Bridge)\\nWe are going to keep our body strong\\nby eating right and staying healthy.\\nConsuming living foods, stretching,\\nand keeping our hearts right.` },
    { id: 10, title: t('media.tracks.10.title'), domain: t('media.tracks.10.domain'), domainIcon: '🤝', desc: t('media.tracks.10.desc'), src: assetPath('/audio/10. Manners.mp3'), color: '#1E88E5', cover: assetPath('/assets/characters/AIKO.png'), lyrics: `(Verse)\\nWhen you receive, say Thank You.\\nThen I'll say You're Welcome.\\nYes, Please.\\nExcuse Me.\\nNo, Thank You.\\nI'm Sorry.` },
    { id: 11, title: t('media.tracks.11.title'), domain: t('media.tracks.11.domain'), domainIcon: '⏰', desc: t('media.tracks.11.desc'), src: assetPath('/audio/11. Time.mp3'), color: '#FF6F00', cover: assetPath('/assets/characters/SELENE.jpg'), lyrics: `Do you know? Do you know? Do you know what time it is?\\nIs it 1:00, 2:00, 3:00, 4:00, 5:00, 6:00, 7:00, 8:00, 9:00, 10:00, 11:00, 12:00?\\nDo you know? Do you know? Do you know what time it is?\\nIs it 1:30, 2:30, 3:30, 4:30, 5:30, 6:30, 7:30, 8:30, 9:30, 10:30, 11:30, 12:30?\\nDo you know? Do you know? Do you know what time it is?\\nIs it in the morning when you just wake up?\\nIs it in the afternoon and you're eating some lunch?\\nIs it in the evening and you're getting ready for bed?\\nDo you know what time it is?\\nIs it 1:00? Is it 1:30?\\nIs it in the morning when you just wake up?\\nIs it in the afternoon and you're eating some lunch?\\nIs it in the evening and you're getting ready for bed?\\nDo you know? Do you know? Do you know what time it is?` },
    { id: 12, title: t('media.tracks.12.title'), domain: t('media.tracks.12.domain'), domainIcon: '🦋', desc: t('media.tracks.12.desc'), src: assetPath('/audio/12. Changes.mp3'), color: '#4CAF50', cover: assetPath('/assets/characters/NERISSA.jpg'), lyrics: `(Verse)\\nIt's sunny outside. Yesterday it rained.\\nOh! Somewhere it might snow tomorrow.\\nThat's the weather, it changes.\\nBut not love from above.\\nTrue love is unchanging, always the same.\\nYesteray, today, and forever.` },
    { id: 13, title: t('media.tracks.13.title'), domain: t('media.tracks.13.domain'), domainIcon: '💯', desc: t('media.tracks.13.desc'), src: assetPath('/audio/13. One hundred.mp3'), color: '#9C27B0', cover: assetPath('/assets/characters/OCTAVIA.jpg'), lyrics: null },
    { id: 14, title: t('media.tracks.14.title'), domain: t('media.tracks.14.domain'), domainIcon: '🌊', desc: t('media.tracks.14.desc'), src: assetPath('/audio/14. The Ocean.mp3'), color: '#1E88E5', cover: assetPath('/assets/characters/EZRA.jpg'), lyrics: null },
    { id: 15, title: t('media.tracks.15.title'), domain: t('media.tracks.15.domain'), domainIcon: '📖', desc: t('media.tracks.15.desc'), src: assetPath('/audio/15. Hard Words.mp3'), color: '#FF6F00', cover: assetPath('/assets/characters/RONAN.jpg'), lyrics: `(Intro)\\nSometimes you may hear a word that's hard to say,\\nbut don't worry. Slow down and say...\\n\\n(Word Drill)\\nBalloon. Hawaii. Oklahoma.\\nLouisiana. Octopus. Vegetables.\\nSpaghetti. Macaroni.\\nAlaska. Nevada. Colorado.` },
    { id: 16, title: t('media.tracks.16.title'), domain: t('media.tracks.16.domain'), domainIcon: '🔷', desc: t('media.tracks.16.desc'), src: assetPath('/audio/16. Shapes.mp3'), color: '#4CAF50', cover: assetPath('/assets/characters/SILAS.jpg'), lyrics: `(Chorus)\\nI see shapes all around me.\\nDo you see shapes all around you?\\n\\n(Verse)\\nThere goes a Circle.\\nThat's a Square. (Yes, four equal sides).\\nTriangle. Stars. Rectangle.\\nTrapezoids. Pentagons. Hexagon.\\nHeptagon. Octagon. Cube. Spheres.` },
    { id: 17, title: t('media.tracks.17.title'), domain: t('media.tracks.17.domain'), domainIcon: '🗓️', desc: t('media.tracks.17.desc'), src: assetPath('/audio/17. Months of the Year.mp3'), color: '#9C27B0', cover: assetPath('/assets/characters/ELIAS.jpg'), lyrics: `(Intro)\\nTime. Seconds, minutes, hours, days, weeks, months.\\nIt's time for the months of the year song.\\n\\n(Chorus)\\nJanuary, February, March,\\nApril, May, June,\\nJuly, August, September,\\nOctober, November, December.` },
    { id: 18, title: t('media.tracks.18.title'), domain: t('media.tracks.18.domain'), domainIcon: '🌧️', desc: t('media.tracks.18.desc'), src: assetPath('/audio/18. Rain.mp3'), color: '#1E88E5', cover: assetPath('/assets/characters/ATHENA.jpg'), lyrics: `(Chant)\\nWatching raindrops falling down,\\ncleaning the atmosphere.\\nWatching raindrops falling down,\\ncleaning the atmosphere.` },
    { id: 19, title: t('media.tracks.19.title'), domain: t('media.tracks.19.domain'), domainIcon: '🌈', desc: t('media.tracks.19.desc'), src: assetPath('/audio/20. After the Storm (outro).mp3'), color: '#4CAF50', cover: assetPath('/assets/soe-logo.png'), lyrics: null },
  ];

  return (
    <div className="media-page">
      {/* ── Hero ── */}
      <header className="media-hero">
        <div className="container text-center">
          <div className="animate-fade-up">
            <div className="section-label">{t('media.hero_label')}</div>
            <h1>{t('media.hero_title_1')} <span className="text-gold">{t('media.hero_title_2')}</span></h1>
            <p className="section-subtitle" style={{ margin: '1rem auto' }}>
              {t('media.hero_subtitle')}
            </p>
          </div>
        </div>
      </header>


      {/* ── Audio Section ── */}
      <section className="section glow-sage">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('media.audio_label')}</div>
            <h2 className="section-title">
              {t('media.audio_title_1')} <span className="text-sage">{t('media.audio_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
              {t('media.audio_subtitle')}
            </p>
          </RevealSection>

          <RevealSection>
            <AudioPlayer tracks={tracks} />
          </RevealSection>
        </div>
      </section>

      {/* ── Coloring Book Section ── */}
      <section className="section glow-plum">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('media.coloring_label')}</div>
            <h2 className="section-title">
              {t('media.coloring_title_1')} <span className="text-plum">{t('media.coloring_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
              {t('media.coloring_subtitle')}
            </p>
          </RevealSection>

          <RevealSection>
            <div className="book-viewer glass-card">
              <div className="book-viewer__display">
                <img
                  src={bookPages[bookIndex]}
                  alt={`Coloring book page ${bookIndex + 1}`}
                  className="book-viewer__page"
                />
              </div>
              <div className="book-viewer__controls">
                <button
                  className="btn btn-outline"
                  onClick={() => setBookIndex(Math.max(0, bookIndex - 1))}
                  disabled={bookIndex === 0}
                  aria-label="Previous page"
                >
                  {t('media.prev')}
                </button>
                <span className="book-viewer__counter">
                  {bookIndex + 1} / {bookPages.length}
                </span>
                <button
                  className="btn btn-outline"
                  onClick={() => setBookIndex(Math.min(bookPages.length - 1, bookIndex + 1))}
                  disabled={bookIndex === bookPages.length - 1}
                  aria-label="Next page"
                >
                  {t('media.next')}
                </button>
              </div>
              <div className="text-center" style={{ marginTop: '1.5rem' }}>
                <Link to="/join" className="btn btn-gold">{t('media.pre_order_coloring')}</Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── SOE Book Section ── */}
      <section className="section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('media.read_label')}</div>
            <h2 className="section-title">
              {t('media.read_title_1')} <span className="text-gold">{t('media.read_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
              {t('media.read_subtitle')}
            </p>
          </RevealSection>

          <RevealSection>
            <div className="book-viewer glass-card">
              <div className="book-viewer__display">
                <img
                  src={soeBookPages[soeBookIndex]}
                  alt={`SOE Storybook page ${soeBookIndex + 1}`}
                  className="book-viewer__page"
                />
              </div>
              <div className="book-viewer__controls">
                <button
                  className="btn btn-outline"
                  onClick={() => setSoeBookIndex(Math.max(0, soeBookIndex - 1))}
                  disabled={soeBookIndex === 0}
                  aria-label="Previous page"
                >
                  {t('media.prev')}
                </button>
                <span className="book-viewer__counter">
                  {soeBookIndex + 1} / {soeBookPages.length}
                </span>
                <button
                  className="btn btn-outline"
                  onClick={() => setSoeBookIndex(Math.min(soeBookPages.length - 1, soeBookIndex + 1))}
                  disabled={soeBookIndex === soeBookPages.length - 1}
                  aria-label="Next page"
                >
                  {t('media.next')}
                </button>
              </div>
              <div className="text-center" style={{ marginTop: '1.5rem' }}>
                <Link to="/join" className="btn btn-gold">{t('media.pre_order_book')}</Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .media-page .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }
        .media-page .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .media-hero {
          padding: 10rem 0 4rem;
        }

        /* ── Video ── */
        .video-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .video-embed {
          padding: 0;
          overflow: hidden;
        }

        .video-embed__title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-text-primary);
          padding: 1rem 1.25rem 0.75rem;
          margin: 0;
        }

        .music-videos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .video-embed__badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          margin: 0 1.25rem 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .video-embed__player {
          width: 100%;
          display: block;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .video-overlay-text {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          z-index: 10;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .music-videos-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Audio Player ── */
        .audio-player {
          max-width: 700px;
          margin: 0 auto;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── Album Carousel ── */
        .album-carousel {
          position: relative;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 0.5rem;
          background: rgba(0,0,0,0.03);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .album-carousel__track {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .album-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          border: 2px solid rgba(255,255,255,0.1);
          background: #eee;
        }

        .album-slide.active {
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          border-color: rgba(255,255,255,0.5);
        }

        .album-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .album-label {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.4rem 1.2rem;
          border-radius: 999px;
          color: white;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.15);
          pointer-events: none;
          z-index: 20;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        @media (max-width: 480px) {
          .audio-player {
            padding: 1.25rem;
          }
        }

        .audio-player__now {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .audio-player__icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .audio-player__domain-icon {
          font-size: 1.5rem;
        }

        .audio-player__title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .audio-player__domain {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .audio-player__controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .audio-player__controls {
            gap: 0.75rem;
          }
        }

        .audio-player__play-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--color-sage);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition-med);
        }

        .audio-player__play-btn:hover {
          background: var(--color-sage-light);
          transform: scale(1.05);
        }

        .audio-player__progress-wrap {
          flex: 1;
          cursor: pointer;
          padding: 0.5rem 0;
        }

        .audio-player__progress-bar {
          height: 4px;
          background: var(--color-border-light);
          border-radius: 2px;
          overflow: hidden;
        }

        .audio-player__progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.1s linear;
        }

        @media (max-width: 480px) {
          .audio-player__progress-wrap {
             padding: 1rem 0; /* Larger touch area */
          }
        }

        .audio-player__time {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          white-space: nowrap;
        }

        .audio-player__lyrics-btn {
          font-size: 0.7rem;
          color: var(--color-sage);
          background: var(--color-sage-soft);
          border: 1px solid var(--color-sage);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-med);
          margin-left: auto;
          font-family: var(--font-body);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .audio-player__lyrics-btn:hover {
          background: var(--color-sage);
          color: #fff;
        }

        .audio-player__lyrics-btn.active {
          background: var(--color-sage);
          color: #fff;
          box-shadow: 0 0 10px var(--color-sage-glow);
        }

        .audio-player__lyrics {
          margin-top: 0;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          max-height: 250px;
          overflow-y: auto;
          border: 1px solid var(--color-border-light);
          scrollbar-width: thin;
          scrollbar-color: var(--color-sage) transparent;
        }

        .audio-player__lyrics::-webkit-scrollbar {
          width: 6px;
        }

        .audio-player__lyrics::-webkit-scrollbar-thumb {
          background-color: var(--color-sage);
          border-radius: 3px;
        }

        .audio-player__lyrics-content {
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-primary);
          text-align: center;
        }

        .audio-player__lyrics-content p {
          margin-bottom: 0.6rem;
        }

        .audio-player__lyrics-content .lyrics-label {
          font-weight: 600;
          color: var(--color-gold);
          margin-top: 1rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .audio-player__tracks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px solid var(--color-border);
          padding-top: 1rem;
        }

        .audio-player__track {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 1rem;
          border: none;
          background: transparent;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background var(--transition-med);
          text-align: left;
          color: var(--color-text-primary);
        }

        .audio-player__track:hover {
          background: var(--color-bg-card-hover);
        }

        .audio-player__track--active {
          background: var(--color-bg-card-hover);
        }

        .audio-player__track-icon {
          font-size: 1.2rem;
        }

        .audio-player__track-info {
          flex: 1;
        }

        .audio-player__track-title {
          display: block;
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .audio-player__track-domain {
          display: block;
          font-size: 0.7rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }



        /* ── Book Viewer ── */
        .book-viewer {
          max-width: 750px;
          margin: 0 auto;
          padding: 2rem;
        }

        @media (max-width: 480px) {
          .book-viewer {
            padding: 1rem;
          }
          .book-viewer__controls {
            gap: 1rem;
          }
          .book-viewer__controls button {
            padding: 0.8rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
        }

        .book-viewer__display {
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: var(--color-bg-navy);
        }

        .book-viewer__page {
          width: 100%;
          display: block;
        }

        .book-viewer__controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .book-viewer__counter {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .book-viewer__controls button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MediaRoom;
