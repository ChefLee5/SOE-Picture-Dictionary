import React, { useEffect, useState } from 'react';
import { assetPath } from '../utils/assetPath';
import FullSection from '../components-v2/FullSection';
import CharSplitText from '../components-v2/CharSplitText';
import { RevealV2 } from '../hooks/useScrollReveal';
import { submitSoeInterest } from '../services/soeSubmissions';

const JoinQuestV2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Join the Quest — SOE Rhythm Quest';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await submitSoeInterest({
        kind: 'interest',
        name,
        email,
        sourcePath: window.location.pathname,
      });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-v2">
      <FullSection
        bg={assetPath('/assets/lands/luminosity-panorama.webp')}
        overlay="heavy"
      >
        <div className="v2-container--narrow v2-container v2-text-center">
          <RevealV2>
            <span className="v2-label">Begin the adventure</span>
          </RevealV2>
          <CharSplitText tag="h1" className="v2-display v2-display--section" stagger={26}>
            Join the Quest
          </CharSplitText>

          {submitted ? (
            <RevealV2>
              <div className="v2-card" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', display: 'block' }}>✨</span>
                <h2 className="v2-heading v2-heading--md" style={{ marginTop: '0.5rem' }}>
                  Welcome, explorer!
                </h2>
                <p className="v2-body v2-body--lg" style={{ marginTop: '0.5rem' }}>
                  You’re on the list. We’ll be in touch with the next steps of the journey.
                </p>
              </div>
            </RevealV2>
          ) : (
            <RevealV2 className="v2-reveal--delay-2">
              <p className="v2-body v2-body--lg" style={{ maxWidth: '480px', margin: '1.25rem auto 2rem' }}>
                Sign up for new tracks, lands, and learning resources — delivered with care,
                never spam.
              </p>
              <form onSubmit={handleSubmit} style={{ maxWidth: '440px', margin: '0 auto' }}>
                <input
                  type="text"
                  className="v2-email-capture__input"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="First name"
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                />
                <input
                  type="email"
                  className="v2-email-capture__input"
                  placeholder="Your best email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                {error && (
                  <p style={{ color: '#e53935', fontWeight: 500, marginBottom: '1rem' }}>{error}</p>
                )}
                <button
                  type="submit"
                  className="v2-btn v2-btn--gold"
                  disabled={loading}
                  style={{ width: '100%' }}
                >
                  {loading ? 'Joining…' : 'Join the Quest →'}
                </button>
              </form>
              <p className="v2-email-meta">No spam, ever. We respect your family’s inbox.</p>
            </RevealV2>
          )}
        </div>
      </FullSection>
    </div>
  );
};

export default JoinQuestV2;
