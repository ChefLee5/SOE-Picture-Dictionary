import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParallaxHero from '../components/ParallaxHero';
import { assetPath } from '../utils/assetPath';

/* ── Intersection Observer Hook ── */
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

const Home = () => {
  const { t } = useTranslation();

  /* ── Domain Data ── */
  const domains = [
    { icon: '🗣️', title: t('home.domains.language.title'), desc: t('home.domains.language.desc') },
    { icon: '🧠', title: t('home.domains.cognitive.title'), desc: t('home.domains.cognitive.desc') },
    { icon: '🤸', title: t('home.domains.physical.title'), desc: t('home.domains.physical.desc') },
    { icon: '🔬', title: t('home.domains.science.title'), desc: t('home.domains.science.desc') },
    { icon: '💛', title: t('home.domains.social_emotional.title'), desc: t('home.domains.social_emotional.desc') },
  ];

  const features = [
    {
      icon: '🎯',
      title: t('home.features.active.title'),
      subtitle: t('home.features.active.subtitle'),
      desc: t('home.features.active.desc'),
    },
    {
      icon: '🧘',
      title: t('home.features.neuro.title'),
      subtitle: t('home.features.neuro.subtitle'),
      desc: t('home.features.neuro.desc'),
    },
    {
      icon: '🌍',
      title: t('home.features.scalable.title'),
      subtitle: t('home.features.scalable.subtitle'),
      desc: t('home.features.scalable.desc'),
    },
  ];
  return (
    <div className="home-page">
      {/* ═══ HERO ═══ */}
      <header className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <ParallaxHero variant="home" />
        <div className="container hero__inner">
          <div className="hero__content animate-fade-up">
            <div className="section-label">{t('home.hero_label')}</div>
            <h1 className="hero__title">
              {t('home.hero_title_1')}{' '}
              <span className="text-gold">{t('home.hero_title_2')}</span>
            </h1>
            <p className="hero__subtitle">
              {t('home.hero_subtitle')}
            </p>

            <div className="hero__actions">
              <Link to="/join" className="btn btn-gold">{t('hero.join_button')}</Link>
            </div>

            <p className="hero__note">
              {t('home.hero_note')}
            </p>
          </div>
          <div className="hero__visual animate-fade-in animate-delay-3">
            <div className="hero__image-wrapper animate-float">
              <img
                src={assetPath('/assets/soe-cover.png')}
                alt="Kenji and Aiko looking at the Global Sound Map — The Sound of Essentials: Rhythm Quest cover art"
                className="hero__image"
              />
              <div className="hero__image-glow" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span>↓</span>
        </div>
      </header>

      <section className="section why-section glow-plum">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.why_label')}</div>
            <h2 className="section-title">
              {t('home.why_title_1')}<br />
              <span className="accent-text">{t('home.why_title_2')}</span>
            </h2>
            <div className="divider divider-center"></div>
            <p className="section-subtitle">
              {t('home.why_subtitle')}
            </p>
          </RevealSection>

          <RevealSection>
            <div className="why-stats">
              <div className="why-stat glass-card">
                <span className="why-stat__number text-gold">{t('home.stat_1_val')}</span>
                <span className="why-stat__label">{t('home.stat_1_lab')}</span>
              </div>
              <div className="why-stat glass-card">
                <span className="why-stat__number text-sage">{t('home.stat_2_val')}</span>
                <span className="why-stat__label">{t('home.stat_2_lab')}</span>
              </div>
              <div className="why-stat glass-card">
                <span className="why-stat__number text-plum">{t('home.stat_3_val')}</span>
                <span className="why-stat__label">{t('home.stat_3_lab')}</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="section features-section glow-sage">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.approach_label')}</div>
            <h2 className="section-title">
              {t('home.approach_title_1')} <span className="text-sage">{t('home.approach_title_2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('home.approach_subtitle')}
            </p>
          </RevealSection>

          <div className="features-grid">
            {features.map((f, i) => (
              <RevealSection key={f.title} delay={i * 0.15}>
                <div className="glass-card feature-card">
                  <span className="feature-card__icon">{f.icon}</span>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <span className="feature-card__subtitle">{f.subtitle}</span>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section domains-section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.curriculum_label')}</div>
            <h2 className="section-title">
              {t('home.curriculum_title_1')} <span className="text-gold">{t('home.curriculum_title_2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('home.curriculum_subtitle')}
            </p>
          </RevealSection>

          <div className="domains-grid">
            {domains.map((d, i) => (
              <RevealSection key={d.title} delay={i * 0.1}>
                <div className="glass-card domain-card">
                  <span className="domain-card__icon">{d.icon}</span>
                  <h4 className="domain-card__title">{d.title}</h4>
                  <p className="domain-card__desc">{d.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="section cta-section text-center">
        <div className="container">
          <RevealSection>
            <h2>Biology doesn't wait for systems to fix themselves.</h2>
            <p className="section-subtitle" style={{ marginTop: '1rem' }}>
              Join the ecosystem of support. Be part of the solution.
            </p>
            <div style={{ marginTop: '3rem' }}>
              <Link to="/media" className="page-bottom-link">
                Explore the Media Room →
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero__title {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .hero__subtitle {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
          line-height: 1.8;
        }

        .hero__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero__note {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }

        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero__image-wrapper {
          position: relative;
          max-width: 460px;
        }

        .hero__image {
          width: 100%;
          border-radius: var(--radius-lg);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.08),
            0 0 80px var(--color-plum-glow);
          border: 2px solid var(--color-border);
        }

        .hero__image-glow {
          position: absolute;
          inset: -40px;
          border-radius: var(--radius-lg);
          background: radial-gradient(circle at center, var(--color-sage-glow) 0%, transparent 60%);
          z-index: -1;
          filter: blur(40px);
        }

        .hero__scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.2rem;
          color: var(--color-text-muted);
          animation: gentleFloat 3s ease-in-out infinite;
        }

        /* ── Why Stats ── */
        .why-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .why-stat {
          text-align: center;
          padding: 2rem 1.5rem;
        }

        .why-stat__number {
          display: block;
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .why-stat__label {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* ── Features ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem 2rem;
        }

        .feature-card__icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card__title {
          font-size: 1.3rem;
          margin-bottom: 0.3rem;
          color: var(--color-text-primary);
        }

        .feature-card__subtitle {
          display: block;
          font-size: 0.8rem;
          color: var(--color-sage);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .feature-card__desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 100%;
        }

        /* ── 5 Domains ── */
        .domains-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .domain-card {
          text-align: center;
          padding: 2rem 1rem;
        }

        .domain-card__icon {
          font-size: 2.2rem;
          display: block;
          margin-bottom: 0.8rem;
        }

        .domain-card__title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .domain-card__desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          max-width: 100%;
        }

        /* ── Reveal Animation ── */
        .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }

        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── CTA Section ── */
        .cta-section {
          background: linear-gradient(to bottom, transparent, rgba(123, 31, 162, 0.04));
        }

        /* ── Responsive ── */
        @media (max-width: 968px) {
          .hero__inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero__subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero__actions {
            justify-content: center;
          }

          .hero__image-wrapper {
            max-width: 340px;
          }

          .why-stats {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .domains-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .domains-grid {
            grid-template-columns: 1fr;
          }

          .hero__actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
