import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — Unified scroll reveal hook for v2 pages.
 *
 * Returns a ref to attach to the element and an `isVisible` boolean.
 * Adds the `.is-visible` CSS class when the element enters the viewport.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] — IntersectionObserver threshold
 * @param {string} [options.rootMargin='0px'] — IntersectionObserver rootMargin
 * @param {boolean} [options.once=true] — If true, only triggers once
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          el.classList.add('is-visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
          el.classList.remove('is-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useCharReveal — Scroll-triggered character-by-character reveal.
 *
 * Returns a ref. When the element enters the viewport, it adds
 * `.is-revealed` which triggers per-character CSS transitions.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.3]
 * @param {number} [options.staggerMs=30] — delay between each character (applied via inline style)
 */
export function useCharReveal({
  threshold = 0.3,
  staggerMs = 30,
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply stagger delays to each .v2-char child
    const chars = el.querySelectorAll('.v2-char');
    chars.forEach((char, i) => {
      char.style.transitionDelay = `${i * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, staggerMs]);

  return { ref, isRevealed };
}

/**
 * RevealV2 — Simple wrapper component for scroll-reveal sections.
 */
export function RevealV2({ children, className = '', delay = 0, ...props }) {
  const { ref } = useScrollReveal();
  const delayClass = delay ? `v2-reveal--delay-${Math.round(delay * 10)}` : '';

  return (
    <div ref={ref} className={`v2-reveal ${delayClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default useScrollReveal;
