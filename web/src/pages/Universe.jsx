import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParallaxHero from '../components/ParallaxHero';
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

const Universe = () => {
  const { t } = useTranslation();

  /* ── Character Data ── */
  const heroDuos = [
    {
      land: 'Harmonia',
      landIcon: '🎵',
      landColor: '#d4a843',
      duo: ['Kenji', 'Aiko'],
      focus: t('universe.lands.Harmonia.focus'),
      desc: t('universe.lands.Harmonia.desc'),
      duoImage: assetPath('/assets/duos/1_Kenji Aiko.jpg'),
    },
    {
      land: 'Numeria',
      landIcon: '🔢',
      landColor: '#7fb685',
      duo: ['Kwame', 'Octavia'],
      focus: t('universe.lands.Numeria.focus'),
      desc: t('universe.lands.Numeria.desc'),
      duoImage: assetPath('/assets/duos/5_Kwame Octavia.jpg'),
    },
    {
      land: 'Vitalis',
      landIcon: '🤸',
      landColor: '#c4785a',
      duo: ['Felix', 'Amara'],
      focus: t('universe.lands.Vitalis.focus'),
      desc: t('universe.lands.Vitalis.desc'),
      duoImage: assetPath('/assets/duos/3_Felix Amara.jpg'),
    },
    {
      land: 'Chronia',
      landIcon: '⏰',
      landColor: '#9678c4',
      duo: ['Elias', 'Selene'],
      focus: t('universe.lands.Chronia.focus'),
      desc: t('universe.lands.Chronia.desc'),
      duoImage: assetPath('/assets/duos/6_Elias Selene.jpg'),
    },
    {
      land: 'Lexiconia',
      landIcon: '📖',
      landColor: '#d4a843',
      duo: ['Ronan', 'Nerissa'],
      focus: t('universe.lands.Lexiconia.focus'),
      desc: t('universe.lands.Lexiconia.desc'),
      duoImage: assetPath('/assets/duos/7_Ronan Nerissa.jpg'),
    },
    {
      land: 'Geometria',
      landIcon: '📐',
      landColor: '#7fb685',
      duo: ['Silas', 'Vesta'],
      focus: t('universe.lands.Geometria.focus'),
      desc: t('universe.lands.Geometria.desc'),
      duoImage: assetPath('/assets/duos/2_Silas Vesta.jpg'),
    },
    {
      land: 'Natura',
      landIcon: '🌊',
      landColor: '#5ba4c9',
      duo: ['Ezra', 'Athena'],
      focus: t('universe.lands.Natura.focus'),
      desc: t('universe.lands.Natura.desc'),
      duoImage: assetPath('/assets/duos/4_Ezra Athena.jpg'),
    },
  ];

  const pedagogyMethods = [
    {
      name: t('universe.pedagogy.Dalcroze.name'),
      desc: t('universe.pedagogy.Dalcroze.desc'),
      icon: '💃',
    },
    {
      name: t('universe.pedagogy.Orff.name'),
      desc: t('universe.pedagogy.Orff.desc'),
      icon: '🥁',
    },
    {
      name: t('universe.pedagogy.Kodaly.name'),
      desc: t('universe.pedagogy.Kodaly.desc'),
      icon: '🎶',
    },
  ];

  const [activeDuo, setActiveDuo] = useState(null);
  const duosGridRef = useRef(null);

  const scrollToLand = (landName) => {
    const index = heroDuos.findIndex(d => d.land === landName);
    if (index !== -1) {
      setActiveDuo(index);
      setTimeout(() => {
        duosGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="universe-page">
      {/* ── Hero ── */}
      <header className="universe-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <ParallaxHero variant="universe" />
        <div className="container">
          <div className="universe-hero__content animate-fade-up text-center">
            <div className="section-label">{t('universe.hero_label')}</div>
            <h1>
              {t('universe.hero_title_1')}{' '}
              <span className="text-gold">{t('universe.hero_title_2')}</span>
            </h1>
            <p className="section-subtitle" style={{ margin: '1rem auto' }}>
              {t('universe.hero_subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* ── Seriphia ── */}
      <section className="section glow-plum">
        <div className="container">
          <RevealSection>
            <div className="seriphia-block">
              <div className="seriphia-block__image">
                <img
                  src={assetPath('/assets/characters/ETERNAL LEARNING MOTHER.png')}
                  alt="Seriphia — An Eternal Learning Mother"
                />
              </div>
              <div className="seriphia-block__text">
                <span className="section-label">{t('universe.seriphia_label')}</span>
                <h2>{t('universe.seriphia_title')}</h2>
                <p className="accent-text" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {t('universe.seriphia_subtitle')}
                </p>
                <p>
                  {t('universe.seriphia_desc_1')}
                </p>
                <p style={{ marginTop: '1rem' }}>
                  {t('universe.seriphia_desc_2')}
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Global Sound Map ── */}
      <section className="section">
        <div className="container text-center">
          <RevealSection>
            <div className="section-label">{t('universe.map_label')}</div>
            <h2 className="section-title">{t('universe.map_title')}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
              {t('universe.map_subtitle')}
            </p>
            <div className="map-container">
              <div className="map-glow-ring" />
              <div className="map-float-wrapper">
                <img
                  src={assetPath('/assets/Quest map.gif')}
                  alt="The Global Sound Map — Seven lands of learning"
                  className="map-image"
                />
                {/* Animated land pins */}
                {[
                  { land: 'Harmonia', color: '#d4a843', top: '28%', left: '18%', delay: '0s' },
                  { land: 'Numeria', color: '#7fb685', top: '22%', left: '42%', delay: '0.3s' },
                  { land: 'Vitalis', color: '#c4785a', top: '35%', left: '65%', delay: '0.6s' },
                  { land: 'Chronia', color: '#9678c4', top: '55%', left: '78%', delay: '0.9s' },
                  { land: 'Lexiconia', color: '#d4a843', top: '65%', left: '55%', delay: '1.2s' },
                  { land: 'Geometria', color: '#7fb685', top: '58%', left: '30%', delay: '1.5s' },
                  { land: 'Natura', color: '#5ba4c9', top: '45%', left: '12%', delay: '1.8s' },
                ].map((pin) => (
                  <div
                    key={pin.land}
                    className="map-pin"
                    style={{
                      top: pin.top,
                      left: pin.left,
                      '--pin-color': pin.color,
                      animationDelay: pin.delay,
                      cursor: 'pointer'
                    }}
                    title={t('universe.map_pin_title', { land: pin.land })}
                    onClick={() => scrollToLand(pin.land)}
                  >
                    <span className="map-pin__dot" />
                    <span className="map-pin__pulse" />
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 7 Lands & Hero Duos ── */}
      <section className="section glow-sage">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('universe.lands_label')}</div>
            <h2 className="section-title">
              {t('universe.lands_title_1')} <span className="text-sage">{t('universe.lands_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
              {t('universe.lands_subtitle')}
            </p>
          </RevealSection>

          <div className="duos-grid" ref={duosGridRef}>
            {heroDuos.map((duo, i) => (
              <RevealSection key={duo.land} delay={i * 0.1}>
                <div
                  className={`duo-card glass-card ${activeDuo === i ? 'duo-card--active' : ''}`}
                  onClick={() => setActiveDuo(activeDuo === i ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeDuo === i}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveDuo(activeDuo === i ? null : i)}
                >
                  <div className="duo-card__header">
                    <span className="duo-card__land-icon">{duo.landIcon}</span>
                    <div>
                      <h3 style={{ color: duo.landColor }}>{duo.land}</h3>
                      <span className="duo-card__focus">{duo.focus}</span>
                    </div>
                  </div>

                  <div className="duo-card__image-wrap">
                    <img
                      src={duo.duoImage}
                      alt={`${duo.duo[0]} & ${duo.duo[1]}`}
                      className="duo-card__duo-image"
                      style={{ borderColor: duo.landColor }}
                    />
                  </div>
                  <p className="duo-card__names">{duo.duo.join(' & ')}</p>

                  {activeDuo === i && (
                    <p className="duo-card__desc animate-fade-in">{duo.desc}</p>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pedagogy ── */}
      <section className="section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('universe.science_label')}</div>
            <h2 className="section-title">
              {t('universe.science_title_1')} <span className="text-plum">{t('universe.science_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
              {t('universe.science_subtitle')}
            </p>
          </RevealSection>

          <div className="pedagogy-grid">
            {pedagogyMethods.map((m, i) => (
              <RevealSection key={m.name} delay={i * 0.15}>
                <div className="glass-card pedagogy-card">
                  <span className="pedagogy-card__icon">{m.icon}</span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center" delay={0.4}>
            <div style={{ marginTop: '3rem' }}>
              <Link to="/media" className="page-bottom-link">
                {t('home.explore_media')}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .universe-page .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }
        .universe-page .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .universe-hero {
          padding: 10rem 0 4rem;
          position: relative;
        }

        /* ── Seriphia ── */
        .seriphia-block {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }

        .seriphia-block__image img {
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border: 2px solid var(--color-border);
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        }

        .seriphia-block__text h2 {
          font-size: 2.2rem;
          margin-bottom: 0.3rem;
        }

        .seriphia-block__text p {
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        /* ── Map ── */
        .map-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .map-glow-ring {
          position: absolute;
          inset: -20px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(76,175,80,0.15), rgba(30,136,229,0.15), rgba(156,39,176,0.15));
          filter: blur(30px);
          z-index: 0;
          animation: map-glow-breathe 4s ease-in-out infinite;
        }

        @keyframes map-glow-breathe {
          0%, 100% { opacity: 0.4; transform: scale(0.97); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }

        .map-float-wrapper {
          position: relative;
          z-index: 1;
          animation: map-float 6s ease-in-out infinite;
        }

        @keyframes map-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .map-image {
          width: 100%;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border-light);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 60px var(--color-sage-glow);
          transition: transform 0.5s var(--ease-gentle), box-shadow 0.5s var(--ease-gentle);
        }

        .map-float-wrapper:hover .map-image {
          transform: scale(1.03) rotateX(2deg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 80px var(--color-sage-glow);
        }

        /* ── Map Pins ── */
        .map-pin {
          position: absolute;
          z-index: 2;
          transform: translate(-50%, -50%);
          animation: map-pin-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 10px; /* Expand hit area */
        }
        .map-pin:hover {
          transform: translate(-50%, -50%) scale(1.4);
        }

        @media (max-width: 480px) {
          .map-pin {
            padding: 15px; /* Even larger for tiny screens */
          }
        }

        @keyframes map-pin-appear {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .map-pin__dot {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--pin-color);
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          position: relative;
          z-index: 1;
        }

        .map-pin__pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--pin-color);
          opacity: 0;
          animation: map-pin-radar 2.5s ease-out infinite;
          animation-delay: inherit;
        }

        @keyframes map-pin-radar {
          0% { width: 12px; height: 12px; opacity: 0.6; }
          100% { width: 50px; height: 50px; opacity: 0; }
        }

        /* ── Duos Grid ── */
        .duos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .duo-card {
          cursor: pointer;
          text-align: center;
          padding: 2rem;
          transition: all var(--transition-med);
        }

        @media (max-width: 480px) {
          .duo-card {
            padding: 1.5rem 1rem;
          }
        }

        .duo-card__header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .duo-card__land-icon {
          font-size: 2rem;
        }

        .duo-card__header h3 {
          font-size: 1.2rem;
          margin-bottom: 0.1rem;
        }

        .duo-card__focus {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .duo-card__image-wrap {
          margin-bottom: 1rem;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .duo-card__duo-image {
          width: 100%;
          height: auto;
          display: block;
          border-bottom: 4px solid;
          transition: transform 0.4s var(--ease-gentle);
        }

        .duo-card:hover .duo-card__duo-image {
          transform: scale(1.05);
        }

        .duo-card__names {
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: 1rem;
        }

        .duo-card__desc {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 100%;
        }

        /* ── Pedagogy ── */
        .pedagogy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .pedagogy-card {
          text-align: center;
          padding: 2.5rem 2rem;
        }

        .pedagogy-card__icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .pedagogy-card h3 {
          font-size: 1.15rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .pedagogy-card p {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 100%;
        }

        @media (max-width: 968px) {
          .seriphia-block {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .seriphia-block__image img {
            max-height: 350px;
            margin: 0 auto;
          }
          .pedagogy-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Universe;
