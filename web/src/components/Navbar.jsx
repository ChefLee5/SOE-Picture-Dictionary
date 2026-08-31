import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { assetPath } from '../utils/assetPath';

// All SOE target languages — codes with locale files are fully active;
// others fall back to English until translated.
const LANGUAGES = [
  { code: 'en', label: 'English',    native: 'English',    flag: '🇺🇸', active: true  },
  { code: 'es', label: 'Spanish',    native: 'Español',    flag: '🇪🇸', active: true  },
  { code: 'fr', label: 'French',     native: 'Français',   flag: '🇫🇷', active: true  },
  { code: 'pt', label: 'Portuguese', native: 'Português',  flag: '🇧🇷', active: false },
  { code: 'ar', label: 'Arabic',     native: 'العربية',   flag: '🇸🇦', active: false },
  { code: 'yo', label: 'Yoruba',     native: 'Yorùbá',    flag: '🇳🇬', active: false },
  { code: 'ha', label: 'Hausa',      native: 'Hausa',      flag: '🇳🇬', active: false },
  { code: 'sw', label: 'Swahili',    native: 'Kiswahili',  flag: '🇰🇪', active: false },
  { code: 'zh', label: 'Mandarin',   native: '普通话',      flag: '🇨🇳', active: false },
  { code: 'hi', label: 'Hindi',      native: 'हिन्दी',     flag: '🇮🇳', active: false },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const location = useLocation();

  // Dark-background pages (none currently, player is now bright & playful)
  const isDark = false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectLanguage = (lang) => {
    // Only switch if locale file exists; others fall back to English
    i18n.changeLanguage(lang.active ? lang.code : 'en');
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language.split('-')[0]) || LANGUAGES[0];

  const navLinks = [
    { to: '/',           label: t('navbar.home') },
    { to: '/heroes',     label: t('navbar.heroes') },
    { to: '/science',    label: t('navbar.science') },
    { to: '/mission',    label: t('navbar.mission') },
    { to: '/listen',    label: t('navbar.media') },
    { to: '/gallery',    label: '📖 Gallery' },
    { to: '/allies',     label: '🤝 Ally Annex' },
  ];

  const isActive = (to) =>
    to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(to);

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDark ? 'navbar--dark' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── Logo ── */}
      <Link to="/" className="navbar__logo" aria-label={t('app_title')}>
        <div className="navbar__logo-icon-wrap">
          <img
            src={assetPath('/assets/soe-official-logo.webp')}
            alt="The Sound of Essentials Official Logo"
            className="navbar__logo-img"
          />
          <div className="navbar__logo-sparkle" aria-hidden="true">✨</div>
        </div>
        <span className="navbar__logo-wordmark">
          <span className="navbar__logo-soe">The Sound of Essentials</span>
          <span className="navbar__logo-sub">Rhythm Quest</span>
          <span className="navbar__logo-shine" aria-hidden="true" />
        </span>
      </Link>

      {/* ── Desktop center links ── */}
      <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {/* Mobile-only header inside the drawer */}
        <div className="navbar__drawer-header">
          <span className="navbar__drawer-title">Menu</span>
          <button
            className="navbar__drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar__link ${isActive(to) ? 'navbar__link--active' : ''}`}
            aria-current={isActive(to) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}

        {/* Language selector inside mobile drawer */}
        <div className="navbar__drawer-lang">
          <span className="navbar__drawer-lang-title">🌍 Language</span>
          <div className="navbar__drawer-lang-grid">
            {LANGUAGES.filter(l => l.active).map(lang => (
              <button
                key={lang.code}
                type="button"
                className={`navbar__drawer-lang-chip ${lang.code === currentLang.code ? 'navbar__drawer-lang-chip--active' : ''}`}
                onClick={() => selectLanguage(lang)}
              >
                <span>{lang.flag}</span>
                <span>{lang.native}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA inside mobile drawer */}
        <Link to="/listen" className="navbar__cta-btn navbar__cta-btn--mobile">
          🎧 Listen Free
        </Link>
      </div>

      {/* ── Right controls ── */}
      <div className="navbar__right">
        {/* Language Dropdown */}
        <div className="navbar__lang-wrap" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`navbar__lang ${langOpen ? 'navbar__lang--open' : ''}`}
            aria-label="Select language"
            aria-expanded={langOpen}
          >
            <span className="navbar__lang-flag">{currentLang.flag}</span>
            <span className="navbar__lang-code">{currentLang.code.toUpperCase()}</span>
            <svg className="navbar__lang-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {langOpen && (
            <div className="navbar__lang-dropdown" role="listbox" aria-label="Choose language">
              <div className="navbar__lang-dropdown-header">🌍 Choose Language</div>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`navbar__lang-option ${
                    lang.code === currentLang.code ? 'navbar__lang-option--active' : ''
                  } ${!lang.active ? 'navbar__lang-option--soon' : ''}`}
                  onClick={() => selectLanguage(lang)}
                  role="option"
                  aria-selected={lang.code === currentLang.code}
                >
                  <span className="navbar__lang-option-flag">{lang.flag}</span>
                  <span className="navbar__lang-option-text">
                    <span className="navbar__lang-option-native">{lang.native}</span>
                    {!lang.active && <span className="navbar__lang-option-soon">Coming soon</span>}
                  </span>
                  {lang.code === currentLang.code && <span className="navbar__lang-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/listen" className="navbar__cta-btn">
          🎧 Listen Free
        </Link>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('navbar.toggle_menu')}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <style>{`
        /* ─────────────────────────────────────────
           Navbar — Bricolage Grotesque / Learnify-style
        ───────────────────────────────────────── */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 3rem);
          height: 68px;
          transition: background 0.35s ease, box-shadow 0.35s ease, height 0.35s ease;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navbar--scrolled {
          height: 60px;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.09), 0 4px 24px rgba(0,0,0,0.07);
        }

        /* ── Logo ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar__logo-icon-wrap {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .navbar__logo-img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          flex-shrink: 0;
          border-radius: 8px;
          transition: transform 0.25s ease;
        }

        .navbar__logo:hover .navbar__logo-img {
          transform: rotate(-4deg) scale(1.08);
        }

        /* ── Sparkle on icon ── */
        .navbar__logo-sparkle {
          position: absolute;
          top: -4px;
          right: -4px;
          font-size: 0.7rem;
          opacity: 0;
          transform: scale(0.3);
          pointer-events: none;
          animation: logoSparkle 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes logoSparkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          15% { opacity: 1; transform: scale(1.2) rotate(15deg); }
          30% { opacity: 0; transform: scale(0.3) rotate(30deg); }
        }

        .navbar__logo-wordmark {
          display: flex;
          flex-direction: column;
          line-height: 1;
          gap: 1px;
          position: relative;
          overflow: hidden;
        }

        .navbar__logo-soe {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          background: linear-gradient(90deg, var(--color-orange), var(--color-green), var(--color-blue), var(--color-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
        }

        .navbar__logo-sub {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          background: linear-gradient(90deg, var(--color-green), var(--color-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
        }

        /* ── Shimmer sweep across wordmark ── */
        .navbar__logo-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 255, 255, 0.8) 45%,
            rgba(255, 255, 255, 0.95) 50%,
            rgba(255, 255, 255, 0.8) 55%,
            transparent 65%,
            transparent 100%
          );
          background-size: 250% 100%;
          background-position: 200% center;
          animation: logoShine 4s ease-in-out infinite;
          animation-delay: 2s;
          mix-blend-mode: overlay;
        }

        @keyframes logoShine {
          0%   { background-position: 200% center; }
          20%  { background-position: -50% center; }
          100% { background-position: -50% center; }
        }

        /* ── Center nav links ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        /* Drawer header — mobile only */
        .navbar__drawer-header {
          display: none;
        }

        .navbar__link {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--color-orange);
          padding: 0.45rem 0.7rem;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
          white-space: nowrap;
        }

        .navbar__link:hover {
          color: var(--color-green);
          background: var(--color-green-soft);
        }

        .navbar__link--active {
          color: var(--color-blue);
          font-weight: 700;
        }

        .navbar__link--active::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 0.7rem;
          right: 0.7rem;
          height: 2.5px;
          background: linear-gradient(90deg, var(--color-green), var(--color-blue));
          border-radius: 99px;
        }

        /* Hide mobile-only CTA on desktop */
        .navbar__cta-btn--mobile {
          display: none;
        }

        /* ── Right controls ── */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        /* ── Language Dropdown ── */
        .navbar__lang-wrap {
          position: relative;
        }

        .navbar__lang {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-text-dark, #2B2016);
          background: none;
          border: 1.5px solid rgba(0,0,0,0.18);
          border-radius: 8px;
          padding: 0.38rem 0.55rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .navbar__lang:hover,
        .navbar__lang--open {
          border-color: var(--color-green);
          color: var(--color-green);
          background: var(--color-green-soft);
        }

        .navbar__lang-flag { font-size: 1rem; line-height: 1; }
        .navbar__lang-code { font-size: 0.75rem; font-weight: 700; }

        .navbar__lang-chevron {
          opacity: 0.5;
          transition: transform 0.2s ease;
        }
        .navbar__lang--open .navbar__lang-chevron {
          transform: rotate(180deg);
        }

        /* Dropdown panel */
        .navbar__lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          min-width: 200px;
          overflow: hidden;
          z-index: 2000;
          animation: langDropIn 0.18s cubic-bezier(0.4,0,0.2,1);
        }

        @keyframes langDropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .navbar__lang-dropdown-header {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a8aaa;
          padding: 0.75rem 1rem 0.4rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .navbar__lang-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.6rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
          font-family: var(--font-display);
        }

        .navbar__lang-option:hover {
          background: rgba(76,175,80,0.07);
        }

        .navbar__lang-option--active {
          background: rgba(76,175,80,0.1);
        }

        .navbar__lang-option--soon {
          opacity: 0.65;
          cursor: default;
        }
        .navbar__lang-option--soon:hover {
          background: none;
        }

        .navbar__lang-option-flag { font-size: 1.1rem; line-height: 1; }

        .navbar__lang-option-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .navbar__lang-option-native {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-dark, #2B2016);
        }

        .navbar__lang-option-soon {
          font-size: 0.68rem;
          color: #aaa;
          font-weight: 500;
        }

        .navbar__lang-check {
          font-size: 0.8rem;
          color: var(--color-green);
          font-weight: 700;
        }


        .navbar__cta-btn {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: -0.01em;
          color: #fff;
          background: linear-gradient(135deg, var(--color-green), var(--color-blue));
          padding: 0.5rem 1.3rem;
          border-radius: 99px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(76,175,80,0.3);
        }

        .navbar__cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(76,175,80,0.35);
        }

        /* ── Hamburger ── */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-width: 44px;
          min-height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          transition: background 0.2s;
          z-index: 1001;
          position: relative;
        }

        .navbar__hamburger:hover {
          background: rgba(0,0,0,0.06);
        }

        .navbar__hamburger span {
          width: 22px;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
          display: block;
          transition: all 0.3s ease;
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ── Backdrop (mobile overlay) ── */
        .navbar__backdrop {
          display: none;
        }

        /* ── Mobile ── */
        @media (max-width: 840px) {
          .navbar {
            padding: max(0.5rem, env(safe-area-inset-top, 0px)) 1rem 0.5rem 1rem;
          }

          .navbar__links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 320px;
            height: 100vh;
            height: 100dvh;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 0.25rem;
            padding: max(1.25rem, env(safe-area-inset-top, 0px)) 1.5rem max(2rem, env(safe-area-inset-bottom, 0px));
            background: #fff;
            box-shadow: -8px 0 40px rgba(0,0,0,0.15);
            transition: right 0.38s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .navbar__links--open {
            right: 0;
          }

          /* Drawer header */
          .navbar__drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0.5rem 0 1rem;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid var(--color-border);
          }

          .navbar__drawer-title {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--color-text-muted);
          }

          .navbar__drawer-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--color-text-secondary);
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: background 0.2s;
          }

          .navbar__drawer-close:hover {
            background: rgba(0,0,0,0.06);
          }

          .navbar__link {
            font-size: 1.05rem;
            width: 100%;
            min-height: 44px;
            display: flex;
            align-items: center;
            padding: 0.65rem 0.75rem;
            border-radius: 10px;
          }

          /* Language selector inside mobile drawer */
          .navbar__drawer-lang {
            width: 100%;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--color-border);
          }

          .navbar__drawer-lang-title {
            display: block;
            font-family: var(--font-display);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--color-text-muted);
            margin-bottom: 0.6rem;
          }

          .navbar__drawer-lang-grid {
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
          }

          .navbar__drawer-lang-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.45rem 0.8rem;
            min-height: 40px;
            font-size: 0.82rem;
            font-weight: 600;
            border-radius: var(--radius-xl);
            background: var(--color-bg-light);
            color: var(--color-text-dark);
            border: 1.5px solid transparent;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .navbar__drawer-lang-chip--active {
            background: var(--color-orange-soft);
            border-color: var(--color-orange);
            color: var(--color-orange);
          }

          /* Mobile CTA inside drawer */
          .navbar__cta-btn--mobile {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: 1.25rem;
            min-height: 48px;
            padding: 0.85rem;
            font-size: 1rem;
          }

          .navbar__hamburger {
            display: flex;
          }

          /* Hide desktop CTA + lang on mobile */
          .navbar__cta-btn:not(.navbar__cta-btn--mobile) {
            display: none;
          }

          .navbar__lang {
            display: none;
          }

          /* Backdrop */
          .navbar__backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.3);
            z-index: 999;
            animation: backdropFade 0.2s ease;
          }

          @keyframes backdropFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }

        @media (max-width: 1024px) and (min-width: 841px) {
          .navbar__link {
            font-size: 0.82rem;
            padding: 0.4rem 0.55rem;
          }
        }

        /* ═══════════════════════════════════════
           Dark Variant — Player page
           ═══════════════════════════════════════ */
        .navbar--dark {
          background: rgba(10, 6, 4, 0.6);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .navbar--dark.navbar--scrolled {
          background: rgba(10, 6, 4, 0.92);
          box-shadow: 0 1px 0 rgba(255,200,120,0.08), 0 4px 24px rgba(0,0,0,0.4);
        }

        /* Logo text */
        .navbar--dark .navbar__logo-soe {
          background: linear-gradient(90deg, #FFB74D, #FFD54F, #FFF8E1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar--dark .navbar__logo-sub {
          background: linear-gradient(90deg, rgba(255,200,120,0.7), rgba(255,213,79,0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Nav links */
        .navbar--dark .navbar__link {
          color: rgba(255,200,120,0.75);
        }

        .navbar--dark .navbar__link:hover {
          color: #FFD54F;
          background: rgba(255,200,120,0.1);
        }

        .navbar--dark .navbar__link--active {
          color: #FFB74D;
        }

        .navbar--dark .navbar__link--active::after {
          background: linear-gradient(90deg, #FF8F00, #FFD54F);
        }

        /* Language button */
        .navbar--dark .navbar__lang {
          color: rgba(255,200,120,0.7);
          border-color: rgba(255,200,120,0.2);
        }

        .navbar--dark .navbar__lang:hover,
        .navbar--dark .navbar__lang--open {
          color: #FFD54F;
          border-color: #FFB74D;
          background: rgba(255,200,120,0.1);
        }

        /* CTA button */
        .navbar--dark .navbar__cta-btn {
          background: linear-gradient(135deg, #FF8F00, #FFB74D);
          color: #1a0f00;
          box-shadow: 0 2px 10px rgba(255,143,0,0.3);
        }

        .navbar--dark .navbar__cta-btn:hover {
          box-shadow: 0 6px 20px rgba(255,143,0,0.4);
        }

        /* Hamburger bars */
        .navbar--dark .navbar__hamburger span {
          background: #FFB74D;
        }

        .navbar--dark .navbar__hamburger:hover {
          background: rgba(255,200,120,0.1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
