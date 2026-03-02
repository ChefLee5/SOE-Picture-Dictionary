import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const langs = ['en', 'fr', 'es'];
    const currentIndex = langs.indexOf(i18n.language.split('-')[0]);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/universe', label: t('navbar.universe') },
    { to: '/characters', label: t('navbar.heroes') },
    { to: '/science', label: t('navbar.science') },
    { to: '/media', label: t('navbar.media') },
    { to: '/dictionary', label: '📖 Dictionary' },
    { to: '/mission', label: t('navbar.mission') },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label={t('app_title')}>
          <span className="navbar__logo-icon">♪</span>
          <span className="navbar__logo-text">
            The Sound of Essentials: <span className="logo-accent-cursive">Rhythm Quest</span>
          </span>
        </Link>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('navbar.toggle_menu')}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <button onClick={toggleLanguage} className="navbar__lang-toggle" aria-label={t('navbar.toggle_lang')}>
            {i18n.language.split('-')[0].toUpperCase()}
          </button>
          <Link to="/join" className="btn btn-gold navbar__cta">
            {t('navbar.join')}
          </Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.4s var(--ease-gentle);
          background: transparent;
        }

        .navbar--scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 2px solid var(--color-border);
          padding: 0.7rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(0.9rem, 4vw, 1.2rem);
          color: var(--color-orange);
          z-index: 10;
        }

        .navbar__logo-icon {
          font-size: clamp(1rem, 4vw, 1.5rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(30px, 10vw, 40px);
          height: clamp(30px, 10vw, 40px);
          background: linear-gradient(135deg, var(--color-orange), var(--color-yellow));
          color: #fff;
          border-radius: var(--radius-full);
        }

        .navbar__logo-text {
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }

        .navbar__menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__link {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding: 0.3rem 0;
          position: relative;
          transition: color var(--transition-med);
        }

        .navbar__link:hover,
        .navbar__link--active {
          color: var(--color-green);
        }

        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, var(--color-green), var(--color-blue));
          border-radius: 2px;
          transition: width var(--transition-med);
        }

        .navbar__link:hover::after,
        .navbar__link--active::after {
          width: 100%;
        }

        .navbar__cta {
          padding: 0.6rem 1.5rem !important;
          font-size: 0.85rem !important;
        }

        .navbar__lang-toggle {
          background: rgba(212, 168, 67, 0.1);
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-med);
        }

        .navbar__lang-toggle:hover {
          background: var(--color-gold);
          color: #fff;
        }

        .navbar__toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 10;
        }

        .navbar__toggle span {
          width: 24px;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .navbar__toggle--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__toggle--open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__toggle--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 768px) {
          .navbar__toggle {
            display: flex;
          }

          .navbar__menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 3rem;
            gap: 1.5rem;
            transition: right 0.4s var(--ease-gentle);
            border-left: 2px solid var(--color-border);
            box-shadow: -8px 0 30px rgba(0, 0, 0, 0.08);
          }

          .navbar__menu--open {
            right: 0;
          }

          .navbar__link {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
