import React from 'react';
import './ProofInThePause.css';

/**
 * ProofInThePause — High-trust psychology layer for moments of decision.
 * Places educator authority and parent validation directly in the decision viewport.
 */
export const ProofInThePause = ({
  variant = 'compact', // 'compact' | 'full' | 'quote'
  className = '',
}) => {
  if (variant === 'quote') {
    return (
      <div className={`proof-in-pause proof-in-pause--quote ${className}`.trim()}>
        <div className="proof-quote-bubble">
          <span className="proof-quote-icon">💬</span>
          <p className="proof-quote-text">
            “The sound-before-symbol method is the single fastest way I've seen kids connect phonics to reading without tears or screen fatigue.”
          </p>
          <div className="proof-author">
            <span className="proof-author-name">Sarah M., M.Ed.</span>
            <span className="proof-author-role">Early Childhood Literacy Specialist &amp; Mom of 2</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`proof-in-pause proof-in-pause--${variant} ${className}`.trim()}>
      <div className="proof-strip">
        <div className="proof-item">
          <span className="proof-badge-icon">🧠</span>
          <div className="proof-item-text">
            <strong>Sound-Before-Symbol</strong>
            <span>Neuro-affirming phonological flow</span>
          </div>
        </div>

        <div className="proof-divider" />

        <div className="proof-item">
          <span className="proof-badge-icon">🎵</span>
          <div className="proof-item-text">
            <strong>19 Mastered Tracks</strong>
            <span>Language, Math, Science &amp; Movement</span>
          </div>
        </div>

        <div className="proof-divider" />

        <div className="proof-item">
          <span className="proof-badge-icon">🛡️</span>
          <div className="proof-item-text">
            <strong>100% Screen-Free Audio</strong>
            <span>Built for early learners ages 2–7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofInThePause;
