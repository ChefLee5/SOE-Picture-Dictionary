import React, { useState, useEffect } from 'react';

/**
 * SplashV2 — Cinematic brand reveal splash screen.
 *
 * Cream background → SOE tree logo fades in center → brand name types out → fade to reveal.
 * ~2 seconds total. Premium, minimal, no loading bars.
 */
const SplashV2 = ({ onFinished }) => {
  const [phase, setPhase] = useState('logo'); // 'logo' | 'title' | 'exit' | 'done'
  const BASE = import.meta.env.BASE_URL;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('title'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(() => {
      setPhase('done');
      onFinished?.();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinished]);

  if (phase === 'done') return null;

  return (
    <div className={`v2-splash ${phase === 'exit' ? 'v2-splash--exit' : ''}`}>
      <img
        src={`${BASE}assets/soe-logo.webp`}
        alt="The Sound of Essentials"
        className="v2-splash__logo"
      />
      <div className="v2-splash__title">
        THE SOUND OF ESSENTIALS
      </div>
    </div>
  );
};

export default SplashV2;
