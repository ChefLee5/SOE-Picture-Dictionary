import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">♪</span>
              <span>Sound of Essentials: <span className="logo-accent-cursive">Rhythm Quest</span></span>
            </div>
            <p className="footer__tagline">
              {t('footer.tagline')}
            </p>
            <div className="footer__social">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.explore')}</h4>
            <Link to="/" className="footer__link">{t('navbar.home')}</Link>
            <Link to="/universe" className="footer__link">{t('navbar.universe')}</Link>
            <Link to="/characters" className="footer__link">{t('navbar.heroes')}</Link>
            <Link to="/science" className="footer__link">{t('footer.sci_sound')}</Link>
            <Link to="/media" className="footer__link">{t('navbar.media')}</Link>
            <Link to="/mission" className="footer__link">{t('navbar.mission')}</Link>
          </div>

          {/* Get Involved */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.get_involved')}</h4>
            <Link to="/join" className="footer__link">{t('hero.join_button')}</Link>
            <Link to="/join" className="footer__link">{t('footer.partner')}</Link>
            <Link to="/join" className="footer__link">{t('footer.newsletter')}</Link>
          </div>

          {/* Newsletter mini */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.stay_connected')}</h4>
            <p className="footer__newsletter-text">
              {t('footer.weekly_activities')}
            </p>
            <Link to="/join" className="btn footer__subscribe-btn" style={{ marginTop: '0.5rem', fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              {t('footer.subscribe')}
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} The Sound of Essentials: <span className="logo-accent-cursive">Rhythm Quest</span>. {t('footer.all_rights_reserved')}</p>
          <p>{t('home.hero_subtitle').split('.')[1]}. {t('home.hero_subtitle').split('.')[2]}. {t('home.hero_subtitle').split('.')[3]}</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: linear-gradient(135deg, #7B1FA2, #1E88E5);
          padding: 4rem 0 2rem 0;
          position: relative;
          z-index: 1;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer__brand {
          max-width: 300px;
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 1rem;
        }

        .footer__logo-icon {
          font-size: 1.3rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
        }

        .footer__tagline {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.75);
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .footer__social {
          display: flex;
          gap: 0.8rem;
        }

        .footer__social a {
          color: #fff;
          transition: all var(--transition-med);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.15);
          border: none;
        }

        .footer__social a:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer__heading {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .footer__link {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          transition: color var(--transition-med);
        }

        .footer__link:hover {
          color: #fff;
        }

        .footer__newsletter-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .footer__subscribe-btn {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-xl);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .footer__subscribe-btn:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer__bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer__bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
