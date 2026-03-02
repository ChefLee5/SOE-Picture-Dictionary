import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ onFinished }) => {
    const { t } = useTranslation();
    const [phase, setPhase] = useState('enter'); // enter → show → exit → done

    useEffect(() => {
        // Phase 1: entrance animation plays via CSS (0–800ms)
        const showTimer = setTimeout(() => setPhase('show'), 800);
        // Phase 2: hold for reading (800–2200ms)
        const exitTimer = setTimeout(() => setPhase('exit'), 2200);
        // Phase 3: fade out (2200–2800ms), then remove
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onFinished?.();
        }, 2800);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onFinished]);

    if (phase === 'done') return null;

    return (
        <div className={`splash-screen splash-screen--${phase}`} aria-hidden="true">
            {/* Animated background rings */}
            <div className="splash-screen__rings">
                <div className="splash-screen__ring splash-screen__ring--1" />
                <div className="splash-screen__ring splash-screen__ring--2" />
                <div className="splash-screen__ring splash-screen__ring--3" />
            </div>

            {/* Main content */}
            <div className="splash-screen__content">
                <div className="splash-screen__icon">♪</div>
                <h1 className="splash-screen__title">
                    <span className="splash-screen__title-line1">{t('splash.line1')}</span>
                    <span className="splash-screen__title-line2">{t('splash.line2')}</span>
                </h1>
                <div className="splash-screen__subtitle">{t('splash.subtitle')}</div>
                <div className="splash-screen__tagline">{t('splash.tagline')}</div>
            </div>

            {/* Loading bar */}
            <div className="splash-screen__loader">
                <div className="splash-screen__loader-bar" />
            </div>

            <style>{`
                .splash-screen {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #7B1FA2 0%, #1E88E5 50%, #4CAF50 100%);
                    overflow: hidden;
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }

                .splash-screen--exit {
                    opacity: 0;
                    transform: scale(1.05);
                    pointer-events: none;
                }

                /* ── Rings ── */
                .splash-screen__rings {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .splash-screen__ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.08);
                    animation: splash-ring-pulse 3s ease-in-out infinite;
                }

                .splash-screen__ring--1 {
                    width: 300px;
                    height: 300px;
                    animation-delay: 0s;
                }
                .splash-screen__ring--2 {
                    width: 500px;
                    height: 500px;
                    animation-delay: 0.5s;
                }
                .splash-screen__ring--3 {
                    width: 700px;
                    height: 700px;
                    animation-delay: 1s;
                }

                @keyframes splash-ring-pulse {
                    0%, 100% { transform: scale(0.95); opacity: 0.3; }
                    50% { transform: scale(1.05); opacity: 0.6; }
                }

                /* ── Content ── */
                .splash-screen__content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .splash-screen__icon {
                    font-size: 4rem;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    width: 100px;
                    height: 100px;
                    border-radius: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    color: #fff;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    animation: splash-icon-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes splash-icon-enter {
                    from { transform: scale(0) rotate(-180deg); opacity: 0; }
                    to { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                .splash-screen__title {
                    margin: 0;
                    line-height: 1.1;
                }

                .splash-screen__title-line1 {
                    display: block;
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.7);
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.6s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .splash-screen__title-line2 {
                    display: block;
                    font-family: 'Fredoka', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 700;
                    color: #fff;
                    animation: splash-text-up 0.6s 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .splash-screen__subtitle {
                    font-family: 'Fredoka', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    margin-top: 0.25rem;
                    animation: splash-text-up 0.6s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .splash-screen__tagline {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.5);
                    margin-top: 1rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.6s 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes splash-text-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                /* ── Loader Bar ── */
                .splash-screen__loader {
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 999px;
                    overflow: hidden;
                    animation: splash-text-up 0.6s 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .splash-screen__loader-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #FF6F00, #FFD54F, #4CAF50);
                    border-radius: 999px;
                    animation: splash-loader-fill 2.2s 0.6s ease-out both;
                }

                @keyframes splash-loader-fill {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                /* ── Mobile ── */
                @media (max-width: 600px) {
                    .splash-screen__title-line2 {
                        font-size: 2.5rem;
                    }
                    .splash-screen__subtitle {
                        font-size: 1.1rem;
                    }
                    .splash-screen__icon {
                        width: 80px;
                        height: 80px;
                        font-size: 3rem;
                        border-radius: 22px;
                    }
                    .splash-screen__ring--3 {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
