import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assetPath } from '../utils/assetPath';
import FullSection from '../components-v2/FullSection';
import CharSplitText from '../components-v2/CharSplitText';
import { RevealV2 } from '../hooks/useScrollReveal';
import lands from '../data/lands.json';
import heroes from '../data/heroes.json';

/** Short editorial blurb per land (keyed by land id). */
const LAND_BLURBS = {
  harmonia: 'Where words carry melody. Kenji and Aiko turn phonics, vocabulary, and good manners into songs the ear can’t forget.',
  numeria: 'A land that counts in beats. Kwame and Octavia reveal the rhythm hidden inside numbers, patterns, and early math.',
  vitalis: 'The body as the first instrument. Felix and Amara build coordination, balance, and confidence through joyful movement.',
  celestia: 'The rhythm of time itself. Elias and Selene sing the days, months, and seasons into something children can feel.',
  luminosity: 'Where language deepens into discovery. Athena and Ezra turn advanced words and the wonders of the world into song.',
  aquaria: 'Where hard words become conquerable melodies. Nerissa and Ronan sculpt difficult sounds and deep feelings into beautiful language.',
  terrasol: 'Shapes, science, and the natural world, set to song. Vesta and Silas trace the patterns woven through everything.',
};

const heroById = Object.fromEntries(heroes.map((h) => [h.id, h]));

const UniverseV2 = () => {
  useEffect(() => {
    document.title = 'The Universe — SOE Rhythm Quest';
  }, []);

  return (
    <div className="universe-v2">
      {/* ── Hero ── */}
      <FullSection
        bg={assetPath('/assets/lands/terrasol.webp')}
        overlay="light"
        kenBurns
      >
        <div className="v2-container v2-text-center">
          <RevealV2>
            <span className="v2-label">One world, seven realms</span>
          </RevealV2>
          <CharSplitText tag="h1" className="v2-display" style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', color: 'var(--v2-accent-orange)', marginTop: '0.5rem' }} stagger={30}>
            THE 7 LANDS
          </CharSplitText>
        </div>
        <div className="v2-scroll-hint">↓</div>
      </FullSection>

      {/* ── Each land as a cinematic section ── */}
      {lands.map((land, i) => {
        const landHeroes = (land.heroes || []).map((id) => heroById[id]).filter(Boolean);
        return (
          <FullSection
            key={land.id}
            bg={assetPath(`/assets/lands/${land.panorama}`)}
            overlay={i % 2 === 0 ? 'light' : 'dark'}
          >
            <div className="v2-container">
              <RevealV2>
                <div style={{ maxWidth: '640px' }}>
                  <span className="v2-label" style={{ color: land.color }}>
                    Land {String(i + 1).padStart(2, '0')} · {land.focus}
                  </span>
                  <h2 className="v2-display v2-display--section" style={{ marginTop: '0.75rem' }}>
                    <span style={{ marginRight: '0.5rem' }}>{land.icon}</span>{land.name}
                  </h2>
                  <p className="v2-body v2-body--lg" style={{ marginTop: '1rem' }}>
                    {LAND_BLURBS[land.id]}
                  </p>

                  {landHeroes.length > 0 && (
                    <div style={{ display: 'flex', gap: '1.25rem', marginTop: '2rem', alignItems: 'center' }}>
                      {landHeroes.map((h) => (
                        <div key={h.id} style={{ textAlign: 'center' }}>
                          <img
                            src={assetPath(h.selfie)}
                            alt={h.name}
                            loading="lazy"
                            style={{
                              width: 72, height: 72, borderRadius: '50%',
                              objectFit: 'cover', border: `2px solid ${land.color}`,
                              boxShadow: 'var(--v2-shadow-sm)',
                            }}
                          />
                          <span className="v2-domain-name" style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.78rem' }}>
                            {h.name}
                          </span>
                        </div>
                      ))}
                      <span className="v2-serif-italic" style={{ fontSize: '1rem', color: 'var(--v2-text-secondary)' }}>
                        {land.duoLabel}
                      </span>
                    </div>
                  )}
                </div>
              </RevealV2>
            </div>
          </FullSection>
        );
      })}

      {/* ── Outro CTA ── */}
      <section className="v2-section v2-section--alt v2-text-center">
        <div className="v2-container--narrow v2-container">
          <RevealV2>
            <h2 className="v2-heading v2-heading--lg">Ready to begin the quest?</h2>
            <p className="v2-body v2-body--lg" style={{ margin: '1rem auto 2rem' }}>
              Meet the heroes guiding children through every land.
            </p>
            <Link to="/v2/heroes" className="v2-btn v2-btn--gold">Meet the Heroes →</Link>
          </RevealV2>
        </div>
      </section>
    </div>
  );
};

export default UniverseV2;
