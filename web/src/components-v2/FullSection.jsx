import React from 'react';

/**
 * FullSection — Cinematic full-viewport section primitive.
 *
 * Renders a 100vh section with optional background image,
 * overlay scrim, and content slot. Kaikaku-style immersive layout.
 *
 * @param {string} bg — Background image URL
 * @param {'light'|'dark'|'heavy'|'none'} overlay — Scrim type
 * @param {boolean} kenBurns — Enable Ken Burns animation on bg
 * @param {boolean} auto — Use auto height instead of 100vh
 * @param {string} className — Additional class names
 */
const FullSection = ({
  bg,
  overlay = 'light',
  kenBurns = false,
  auto = false,
  className = '',
  id,
  children,
  ...props
}) => {
  const sectionClasses = [
    'v2-full-section',
    auto ? 'v2-full-section--auto' : '',
    className,
  ].filter(Boolean).join(' ');

  const bgClasses = [
    'v2-full-section__bg',
    kenBurns ? 'v2-full-section__bg--ken-burns' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses} id={id} {...props}>
      {bg && (
        <div className={bgClasses}>
          <img src={bg} alt="" aria-hidden="true" loading="lazy" />
        </div>
      )}
      {overlay !== 'none' && (
        <div className={`v2-full-section__scrim v2-full-section__scrim--${overlay}`} />
      )}
      <div className="v2-full-section__content">
        {children}
      </div>
    </section>
  );
};

export default FullSection;
