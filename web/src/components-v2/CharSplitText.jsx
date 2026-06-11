import React, { useMemo } from 'react';
import { useCharReveal } from '../hooks/useScrollReveal';

/**
 * CharSplitText — Renders text with each character in its own <span>,
 * enabling per-character scroll-triggered reveal animations.
 *
 * Kaikaku.ai-inspired character-by-character staggered reveal.
 *
 * @param {string} tag — HTML tag to render (h1, h2, p, span)
 * @param {string} children — The text content
 * @param {string} className — Additional class names
 * @param {number} stagger — Delay between characters in ms
 */
const CharSplitText = ({
  tag = 'h1',
  children,
  className = '',
  stagger = 30,
  ...props
}) => {
  const Tag = tag; // capitalize for dynamic JSX element
  const { ref } = useCharReveal({ staggerMs: stagger });

  const chars = useMemo(() => {
    if (typeof children !== 'string') return null;
    return children.split('').map((char, i) => {
      if (char === ' ') {
        return <span key={i} className="v2-char-space">{' '}</span>;
      }
      return (
        <span key={i} className="v2-char">
          {char}
        </span>
      );
    });
  }, [children]);

  return (
    <Tag ref={ref} className={`v2-char-split ${className}`} {...props}>
      {chars}
    </Tag>
  );
};

export default CharSplitText;
