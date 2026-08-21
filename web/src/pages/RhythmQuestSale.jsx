import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RevealSection } from '../hooks/useReveal';
import heroesData from '../data/heroes.json';
import landsData from '../data/lands.json';
import { assetPath } from '../utils/assetPath';
import './RhythmQuestSale.css';

/**
 * Single source of truth for every buy CTA on this page.
 * Shopify cart permalink for The Summer Stretch Workbook ($21 Digital / $35 Print).
 */
const CHECKOUT_URL = 'https://the-sound-of-essentials.myshopify.com/cart/53204514799932:1';
const CHECKOUT_IS_ABSOLUTE = /^https?:\/\//i.test(CHECKOUT_URL);

/** The page's only buy control. Every CTA goes through it. */
const RqBuyLink = ({ className = '', children }) =>
  CHECKOUT_IS_ABSOLUTE ? (
    <a href={CHECKOUT_URL} rel="noopener" className={className}>{children}</a>
  ) : (
    <Link to={CHECKOUT_URL} className={className}>{children}</Link>
  );

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Fires once when the element first enters the viewport. */
const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ══════════════════════════════════════════════════════════════════════
   SUMMER STRETCH 8-WEEK ROADMAP CANON
   ══════════════════════════════════════════════════════════════════════ */
const SUMMER_STRETCH_WEEKS = [
  {
    week: 1,
    id: 'harmonia',
    theme: 'Hello, 7 Lands!',
    landName: 'Harmonia',
    color: '#d4a843',
    focus: 'Phonological Awareness, Alphabet & Sound Foundations',
    heroes: ['Amara', 'Kwame'],
    heroIds: ['amara', 'kwame'],
    art: 'pond-aiko-kenji.webp',
    blocksCovered: 'Word Detectives · Number Hunt · Garden Secrets · Wake-Up Move · Map Adventure',
    dailyHighlight: 'Sound-before-symbol greetings, counting beads, and somatic stretches to kick off the quest.',
  },
  {
    week: 2,
    id: 'harmonia-sel',
    theme: 'Feelings & Families',
    landName: 'Harmonia',
    color: '#d4a843',
    focus: 'Social-Emotional Learning, Relationships & Regulation',
    heroes: ['Kenji', 'Aiko'],
    heroIds: ['kenji', 'aiko'],
    art: 'dance-harmonia-vitalis.webp',
    blocksCovered: 'Emotions Vocabulary · Shape Logic · Habitat Science · Full-Body Balance · Community Roles',
    dailyHighlight: 'Connecting emotion words to physical sensations and building relational empathy through song.',
  },
  {
    week: 3,
    id: 'luminosity',
    theme: 'Community & Cooperation',
    landName: 'Luminosity',
    color: '#5ba4c9',
    focus: 'Civics, Community Helpers, Problem-Solving & French Phonics',
    heroes: ['Athena', 'Felix'],
    heroIds: ['athena', 'felix'],
    art: 'march-luminosity.webp',
    blocksCovered: 'Community Helpers · Money & Budgeting · Weather Systems · Somatic Posture · Civic Rights',
    dailyHighlight: "Exploring teamwork, emergency helpers, and bilingual vocabulary through 'Le Cheval'.",
  },
  {
    week: 4,
    id: 'aquaria',
    theme: 'Wonders of the World',
    landName: 'Aquaria',
    color: '#2563EB',
    focus: 'Geography, Ocean Science, Tricky Words & Syllable Flow',
    heroes: ['Ronan', 'Selene'],
    heroIds: ['ronan', 'selene'],
    art: 'cubes-ronan-nerissa.webp',
    blocksCovered: 'Tricky English Words · Estimation & Fractions · Marine Habitats · Water Cycle · Map Navigation',
    dailyHighlight: 'Midpoint Quest milestone! Breaking down multi-syllabic hard words with nautical rhythm.',
  },
  {
    week: 5,
    id: 'vitalis',
    theme: 'Body, Mind & Balance',
    landName: 'Vitalis',
    color: '#c4785a',
    focus: 'Somatic Breathwork, Physical Fitness, Nutrition & Hygiene',
    heroes: ['Nerissa', 'Octavia'],
    heroIds: ['nerissa', 'octavia'],
    art: 'touch-your-toes.webp',
    blocksCovered: 'Body Vocabulary · Measurement at Home · Food Groups & Nutrition · Yoga Stretches · Daily Reflection',
    dailyHighlight: 'Active motor circuits, diaphragmatic breathing routines, and mindful wellness journaling.',
  },
  {
    week: 6,
    id: 'celestia',
    theme: 'Inventions & Discoveries',
    landName: 'Celestia',
    color: '#9678c4',
    focus: 'STEM, Astronomy, Timekeeping, Seasons & Energy',
    heroes: ['Elias', 'Ezra'],
    heroIds: ['elias', 'ezra'],
    art: 'time-celestia.webp',
    blocksCovered: 'Scientific Method · Clocks & Calendar Math · Solar System · Vestibular Balance · Historical Time',
    dailyHighlight: 'Exploring constellations, day/night cycles, sundials, and early engineering logic.',
  },
  {
    week: 7,
    id: 'harmonia-adv',
    theme: 'Sound & Story',
    landName: 'Harmonia & Terrasol',
    color: '#d4a843',
    focus: 'Advanced Phonics, Creative Writing, Storytelling & Nature',
    heroes: ['Silas', 'Vesta'],
    heroIds: ['silas', 'vesta'],
    art: 'path-to-terrasol.webp',
    blocksCovered: 'Story Sentence Writing · Data & Graphing · Plant Life Cycles · Rhythmic Percussion · Reflection',
    dailyHighlight: 'Children author their own mini-tales, decode advanced rhymes, and reflect on living nature.',
  },
  {
    week: 8,
    id: 'celestia-finale',
    theme: 'Grand Celebration & Launch',
    landName: 'Celestia & Terrasol',
    color: '#9678c4',
    focus: 'Cumulative Review, Capstone Portfolio & Champions Badge',
    heroes: ['Seriphia', 'All 15 Heroes'],
    heroIds: ['seriphia', 'kenji'],
    art: 'quest-complete.webp',
    blocksCovered: 'Mastery Phonics · Math Games · Eco-Sustainability · Celebration Dance · Future Me Letter',
    dailyHighlight: 'The final Quest Star! Children complete their portfolio review and receive the Quest Champion award.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   HERO — THE SUMMER STRETCH WORKBOOK
   ═══════════════════════════════════════════════════════════════ */
const SummerStretchHero = () => {
  const [week, setWeek] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [calm, setCalm] = useState(false);
  const innerRef = useRef(null);
  const tiltOk = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setCalm(mq.matches);
      tiltOk.current = !mq.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (calm || chosen || paused) return undefined;
    const id = setInterval(() => setWeek((w) => (w + 1) % SUMMER_STRETCH_WEEKS.length), 3400);
    return () => clearInterval(id);
  }, [calm, chosen, paused]);

  const tilt = useCallback((e) => {
    const el = innerRef.current;
    if (!el || !tiltOk.current) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rq-tilt-y', `${(-12 + x * 11).toFixed(2)}deg`);
    el.style.setProperty('--rq-tilt-x', `${(3 - y * 9).toFixed(2)}deg`);
  }, []);

  const untilt = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.removeProperty('--rq-tilt-y');
    el.style.removeProperty('--rq-tilt-x');
  }, []);

  const currentWeek = SUMMER_STRETCH_WEEKS[week];

  return (
    <header className="rq-hero">
      <div className="rq-hero__bg" aria-hidden="true" />
      <div className="rq-hero__overlay" aria-hidden="true" />

      <div className="rq-hero__inner">
        <div className="rq-hero__grid">
          <div className="rq-hero__copy">
            <span className="rq-hero__badge">☀️ The Summer Stretch · 8 Weeks · 40 Days · K–3</span>

            <h1 className="rq-hero__title">
              The Summer Stretch
              <span className="rq-hero__title-accent">8 Weeks. 40 Days. 240+ Activities.</span>
            </h1>

            <p className="section-subtitle rq-hero__hook">
              Prevent the summer learning slide with music-powered daily micro-quests.
            </p>

            <p className="rq-hero__lede">
              An 8-week cross-curricular learning journey for grades K–3 (ages 4–8). Six bite-sized
              daily blocks (~16 minutes total) spanning phonics, math, science, somatic movement,
              geography/civics, and reflection. Sound before symbol. Handcrafted for the developing brain.
            </p>

            <div className="rq-hero__offer">
              <div className="rq-hero__price-tag">
                <span className="rq-hero__price">$21</span>
                <span className="rq-hero__price-note">complete 8-week digital workbook</span>
              </div>

              <p className="rq-hero__price-math">
                40 structured days of learning — about <strong>52¢ a day</strong>. Paid once, yours forever.
              </p>

              <div className="rq-hero__actions">
                <RqBuyLink className="btn btn-gold">Get The Summer Stretch · $21</RqBuyLink>
                <a href="#whats-inside" className="btn btn-outline">Explore the 8 Weeks ↓</a>
              </div>

              <ul className="rq-hero__assure">
                <li>30-day 100% money back guarantee</li>
                <li>Instant printable PDF & tablet-ready</li>
                <li>Built for Grades K–3 (Ages 4 to 8)</li>
              </ul>

              <p className="rq-hero__free-note">
                Pairs seamlessly with the free 19-track album. Every day features hero coaching tips
                and phonetic pronunciation guides.
              </p>
            </div>
          </div>

          <div className="rq-hero__book">
            <div
              className="rq-hero__stage"
              style={{ '--rq-land': currentWeek.color }}
              onMouseMove={tilt}
              onMouseLeave={untilt}
            >
              <div className="rq-book-3d">
                <div className="rq-book-3d__inner" ref={innerRef}>
                  <img
                    src={assetPath('/assets/workbook/soe-summer-stretch-cover.webp')}
                    alt="The Sound of Essentials: The Summer Stretch Workbook Official Cover"
                    className="rq-book-3d__cover"
                  />
                </div>
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
              </div>

              <div className="rq-hero__week" key={currentWeek.week} aria-hidden="true">
                <span className="rq-hero__week-text">
                  <span className="rq-hero__week-num">Week {currentWeek.week} of 8</span>
                  <strong className="rq-hero__week-name">{currentWeek.theme}</strong>
                  <span className="rq-hero__week-focus">{currentWeek.focus}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 8-Week Interactive Rail ── */}
        <div
          className="rq-hero__path"
          style={{ '--rq-land': currentWeek.color }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="rq-hero__path-head">
            <span className="rq-hero__path-title">The 8-Week Summer Journey</span>
            <span className="rq-hero__path-sub">5 days a week, 6 daily blocks (~16 min/day). A clear path from Day 1 to Day 40.</span>
          </div>

          <div className="rq-hero__track" aria-hidden="true">
            <span style={{ width: `${((week + 1) / SUMMER_STRETCH_WEEKS.length) * 100}%` }} />
          </div>

          <ol className="rq-hero__weeks" aria-label="The eight week summer stretch roadmap">
            {SUMMER_STRETCH_WEEKS.map((w, i) => (
              <li key={w.week}>
                <button
                  type="button"
                  className="rq-hero__node"
                  style={{ '--rq-node': w.color }}
                  aria-current={i === week ? 'step' : undefined}
                  onClick={() => { setWeek(i); setChosen(true); }}
                >
                  <span className="rq-hero__node-dot" aria-hidden="true" />
                  <span className="rq-hero__node-txt">
                    <span className="rq-hero__node-wk">Week {w.week}</span>
                    <span className="rq-hero__node-name">{w.theme}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROOF & EVIDENCE
   ═══════════════════════════════════════════════════════════════ */
const proofEvidence = [
  {
    id: 'summer-slide',
    idx: '01',
    pull: '2.5 mo',
    pullNote: 'learning loss avoided',
    claim: '15 minutes of daily structured practice prevents the summer slide.',
    detail: 'Studies indicate that students lose up to 2.5 months of reading and math skills over the summer months without regular reinforcement. Micro-dosed daily practice halts regression completely.',
    soWhat: 'So we designed 6 daily blocks totaling just 16 minutes: bite-sized, engaging, and impossible to burn out on.',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3121007/',
    cite: 'Harvard Graduate School of Education & Frontiers in Psychology',
    tint: 'var(--color-orange)',
    soft: 'var(--color-orange-soft)',
  },
  {
    id: 'sound-symbol',
    idx: '02',
    pull: 'Sound',
    pullNote: 'before symbol',
    claim: 'Phonological rhythm accelerates early word decoding.',
    detail: 'Brain imaging reveals that rhythm perception directly activates the neural pathways responsible for syllable segmentation, phonics, and rapid word recognition.',
    soWhat: 'Every single activity includes phonetic pronunciation keys (e.g. heh-LOW | GUD-mor-ning) so children sound it out aloud before writing.',
    href: 'https://www.nature.com/articles/s41598-022-15596-7',
    cite: 'Nature Scientific Reports, 2022',
    tint: 'var(--color-green)',
    soft: 'var(--color-green-soft)',
  },
  {
    id: 'somatic',
    idx: '03',
    pull: 'Somatic',
    pullNote: 'movement breaks',
    claim: 'Physical movement unlocks cognitive memory retention.',
    detail: 'Vestibular balancing and deep diaphragmatic breathing regulate the central nervous system, shifting early learners into optimal memory consolidation state.',
    soWhat: 'Block D in every lesson is a dedicated physical reset: stretching, jumping, breathwork, and motor circuits.',
    href: 'https://neurosciencenews.com/genetics-music-language-28151/',
    cite: 'Neuroscience & Early Childhood Development Research',
    tint: 'var(--color-purple)',
    soft: 'var(--color-purple-soft)',
  },
];

const makerChips = [
  '8 Weeks · 40 Day-by-Day Lessons',
  '240+ Core Activity Blocks',
  'Grades K–3 (Ages 4 to 8)',
  'Sound Before Symbol Phonetics',
  'Full-Color & Printable',
];

const RqCount = ({ value, active, duration = 900 }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) { setN(value); return undefined; }
    if (!active) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, active, duration]);
  return <>{n}</>;
};

const SummerStretchProof = () => {
  const [railRef, railInView] = useInView(0.25);

  const proofRail = useMemo(() => ([
    { value: 8,   label: 'Weeks of Curriculum', sub: '40 guided daily lessons', tint: 'var(--color-orange)' },
    { value: 6,   label: 'Daily Subject Blocks', sub: '~16 minutes total per day', tint: 'var(--color-green)' },
    { value: 240, label: 'Activity Blocks',      sub: 'Reading, Math, Science & Movement', tint: 'var(--color-purple)' },
    { value: 15,  label: 'Hero Guides',         sub: 'Coaching tips on every page', tint: 'var(--color-blue)' },
  ]), []);

  return (
    <section className="rq-proof" aria-label="Why you can trust this curriculum">
      <div className="rq-proof__rail" ref={railRef}>
        <RevealSection>
          <div className="rq-proof__rail-inner">
            {proofRail.map((s) => (
              <div key={s.label} className="rq-proof-stat" style={{ '--stat-tint': s.tint }}>
                <span className="rq-proof-stat__value" aria-hidden="true">
                  <RqCount value={s.value} active={railInView} />{s.value === 240 ? '+' : ''}
                </span>
                <span className="sr-only">{`${s.value} ${s.label}. ${s.sub}.`}</span>
                <span className="rq-proof-stat__label" aria-hidden="true">{s.label}</span>
                <span className="rq-proof-stat__sub" aria-hidden="true">{s.sub}</span>
              </div>
            ))}
            <span className="rq-proof__stave" aria-hidden="true" />
          </div>
        </RevealSection>
      </div>

      <div className="rq-proof__body">
        <div className="container">
          <RevealSection className="text-center rq-proof__head">
            <div className="section-label">Pedagogical Framework</div>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Built for Real Retentive Power. <span className="text-gold">Backed by Science.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Every activity is structured to foster joy, physical movement, and deep cognitive retention.
            </p>
          </RevealSection>

          <div className="rq-proof__grid">
            {proofEvidence.map((e, i) => (
              <RevealSection key={e.id} delay={i * 0.12}>
                <article className="rq-ev-card" style={{ '--ev-tint': e.tint, '--ev-soft': e.soft }}>
                  <span className="rq-ev-card__idx">{e.idx}</span>

                  <div className="rq-ev-card__pull">
                    <span className="rq-ev-card__pull-value">{e.pull}</span>
                    <span className="rq-ev-card__pull-note">{e.pullNote}</span>
                  </div>

                  <h3 className="rq-ev-card__claim">{e.claim}</h3>
                  <p className="rq-ev-card__detail">{e.detail}</p>
                  <p className="rq-ev-card__so">{e.soWhat}</p>

                  <a
                    className="rq-ev-card__cite"
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.cite} <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.1}>
            <div className="rq-maker">
              <div className="rq-maker__bg" aria-hidden="true">
                <img src={assetPath('/assets/marketing/harmonia-call.webp')} alt="" loading="lazy" />
                <span className="rq-maker__scrim" />
              </div>

              <div className="rq-maker__copy">
                <span className="rq-maker__eyebrow">The Method</span>
                <h3 className="rq-maker__title">Designed for Homeschools, Classrooms & Summer Days</h3>
                <p className="rq-maker__text">
                  We built The Summer Stretch to give parents and educators a friction-free, turnkey
                  learning routine. No lesson planning, no special materials, and zero guesswork.
                </p>
                <p className="rq-maker__text">
                  Open the day's page, follow the 6 quick blocks with your child, and celebrate their
                  daily progress with Quest Stars.
                </p>
                <p className="rq-maker__sign">Sound Before Symbol · Multi-Sensory · Complete</p>
              </div>

              <ul className="rq-maker__chips">
                {makerChips.map((c) => (
                  <li key={c} className="rq-maker__chip">
                    <span className="rq-maker__chip-mark" aria-hidden="true">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WHAT'S INSIDE — THE 6 DAILY BLOCKS
   ═══════════════════════════════════════════════════════════════ */
const DAILY_BLOCKS = [
  {
    block: 'Block A',
    time: '3 min',
    subject: 'Language & Phonics',
    land: 'Harmonia (Language)',
    color: '#d4a843',
    desc: 'Sight words, ASL fingerspelling, sound-before-symbol phonetic keys, and vocabulary decoding.',
  },
  {
    block: 'Block B',
    time: '3 min',
    subject: 'Math & Logic',
    land: 'Numeria (Math)',
    color: '#d4a843',
    desc: 'Counting, geometric shapes, measurement, estimation, fractions, money, and data patterns.',
  },
  {
    block: 'Block C',
    time: '3 min',
    subject: 'Science & Nature',
    land: 'Terrasol & Celestia',
    color: '#4CAF50',
    desc: 'Plant growth, animal habitats, weather systems, solar astronomy, and the scientific method.',
  },
  {
    block: 'Block D',
    time: '2 min',
    subject: 'Movement & Health',
    land: 'Vitalis (Physical)',
    color: '#c4785a',
    desc: 'Diaphragmatic breathing, posture resets, balance drills, fitness circuits, and hygiene.',
  },
  {
    block: 'Block E',
    time: '2 min',
    subject: 'Geography or Civics',
    land: 'Aquaria & Luminosity',
    color: '#2563EB',
    desc: 'Map reading, community helpers, governance, civic responsibility, and world cultures.',
  },
  {
    block: 'Block F',
    time: '3 min',
    subject: 'Daily Reflection',
    land: 'All 7 Lands',
    color: '#9678c4',
    desc: 'Mindful journaling, gratitude prompts, goal tracking, and weekly Friday Quest Star rewards.',
  },
];

const SummerStretchWhatsInside = () => {
  return (
    <section className="rq-inside section" id="whats-inside">
      <div className="container">
        <RevealSection className="text-center">
          <div className="section-label">The Daily 6-Block Routine</div>
          <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
            Six Daily Blocks. <span className="text-gold">16 Minutes a Day.</span>
          </h2>
          <p className="section-subtitle">
            Every single day follows a predictable, neuro-affirming sequence that children look forward to.
          </p>
          <ul className="rq-inside__facts">
            <li className="rq-inside__fact rq-inside__fact--price">$21 Digital Complete</li>
            <li className="rq-inside__fact">40 Day-by-Day Lessons</li>
            <li className="rq-inside__fact">240+ Activity Blocks</li>
            <li className="rq-inside__fact">Grades K–3</li>
          </ul>
        </RevealSection>

        {/* ── 6 Daily Blocks Grid ── */}
        <div className="rq-inside__deliver" style={{ marginTop: '2.5rem' }}>
          <div className="rq-inside__grid">
            {DAILY_BLOCKS.map((d, i) => (
              <RevealSection key={d.block} delay={i * 0.07}>
                <div className="rq-inside-card" style={{ '--feat-color': d.color }}>
                  <span className="rq-inside-card__mark" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    {d.block} · {d.time}
                  </span>
                  <h3 className="rq-inside-card__title">{d.subject}</h3>
                  <p className="rq-inside-card__desc">{d.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {/* ── Ledger Summary ── */}
        <RevealSection delay={0.1}>
          <div className="rq-inside__ledger">
            <div className="rq-inside__ledger-rows">
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">Curriculum Format</span>
                <span className="rq-ledger-row__v">
                  Complete 8-week / 40-day printable PDF workbook. Print individual days or bind as a full summer workbook.
                </span>
              </div>
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">Grade Range</span>
                <span className="rq-ledger-row__v">
                  Designed for Kindergarten through 3rd Grade (Ages 4 to 8). Progressive difficulty that grows with your child.
                </span>
              </div>
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">Friday Celebrations</span>
                <span className="rq-ledger-row__v">
                  Every Friday features cumulative weekly reviews, Quest Map milestone coloring, and Quest Star badges.
                </span>
              </div>
            </div>

            <RqBuyLink className="btn btn-gold">Get The Summer Stretch · $21</RqBuyLink>
            <p className="rq-inside__cta-note">
              Instant PDF Download · 30-Day Money Back Guarantee · Ready to Print Today
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   THE 8-WEEK DETAILED CURRICULUM MAP
   ═══════════════════════════════════════════════════════════════ */
const SummerStretchRoadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const weekRefs = useRef([]);

  const goToWeek = (i) => {
    const el = weekRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section className="rq-qmap section" id="curriculum-map" aria-labelledby="ss-qmap-title">
      <div className="container">
        <RevealSection className="text-center">
          <div className="section-label">8-Week Scope & Sequence</div>
          <h2 className="section-title" id="ss-qmap-title" style={{ color: 'var(--color-text-dark)' }}>
            The 8-Week Scope: <span className="text-plum">40 Days of Learning</span>
          </h2>
          <p className="section-subtitle">
            Explore what your child will discover across all seven lands during their 8-week journey.
          </p>
        </RevealSection>

        {/* Jump Rail */}
        <nav className="rq-qmap__rail" aria-label="Jump to a week">
          {SUMMER_STRETCH_WEEKS.map((w, i) => (
            <button
              key={w.week}
              type="button"
              className={`rq-qmap__rail-btn${i === activeWeek ? ' is-on' : ''}`}
              style={{ '--land-color': w.color }}
              aria-label={`Week ${w.week}, ${w.theme}`}
              aria-current={i === activeWeek ? 'true' : undefined}
              onClick={() => { setActiveWeek(i); goToWeek(i); }}
            >
              <span className="rq-qmap__rail-num">{w.week}</span>
              <span className="rq-qmap__rail-name">{w.theme}</span>
            </button>
          ))}
        </nav>

        <div className="rq-qmap__track">
          <ol className="rq-qmap__weeks">
            {SUMMER_STRETCH_WEEKS.map((w, i) => (
              <li
                key={w.week}
                ref={(el) => { weekRefs.current[i] = el; }}
                className={`rq-qmap__week${i === activeWeek ? ' is-active' : ''}`}
                style={{ '--land-color': w.color }}
              >
                <div className="rq-qmap__node" aria-hidden="true">
                  <span className="rq-qmap__node-dot" />
                </div>

                <RevealSection delay={0.06 * i}>
                  <article className="rq-qmap__card">
                    <div className="rq-qmap__art">
                      <img
                        src={assetPath(`/assets/scenes/${w.art}`)}
                        alt={`Art from ${w.theme}`}
                        loading="lazy"
                      />
                      <span className="rq-qmap__badge">
                        Week {w.week} · {w.landName}
                      </span>
                    </div>

                    <div className="rq-qmap__body">
                      <div className="rq-qmap__head">
                        <span className="rq-qmap__week-num">Week {w.week} of 8</span>
                        <span className="rq-qmap__page">5 Day-by-Day Lessons</span>
                      </div>

                      <h3 className="rq-qmap__land">{w.theme}</h3>
                      <p className="rq-qmap__focus">{w.focus}</p>

                      <div className="rq-qmap__row">
                        <span className="rq-qmap__row-label">Hero Guides</span>
                        <span className="rq-qmap__chips">
                          {w.heroes.map((h) => (
                            <span key={h} className="rq-qmap__chip">{h}</span>
                          ))}
                        </span>
                      </div>

                      <div className="rq-qmap__row">
                        <span className="rq-qmap__row-label">Core Blocks</span>
                        <div className="rq-qmap__do">
                          <p className="rq-qmap__task">{w.blocksCovered}</p>
                          <p className="rq-qmap__note">{w.dailyHighlight}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealSection>
              </li>
            ))}
          </ol>

          <div className="rq-qmap__finish">
            <div className="rq-qmap__node rq-qmap__node--end" aria-hidden="true">
              <span className="rq-qmap__node-dot" />
            </div>

            <RevealSection delay={0.1}>
              <article className="rq-qmap__card rq-qmap__card--finish">
                <div className="rq-qmap__art">
                  <img
                    src={assetPath('/assets/marketing/quest-complete.webp')}
                    alt="Artwork marking the end of the Summer Stretch"
                    loading="lazy"
                  />
                </div>
                <div className="rq-qmap__body">
                  <span className="rq-qmap__eyebrow">The Finish Line</span>
                  <h3 className="rq-qmap__land">Week 8 Completed. 40 Days of Mastery.</h3>
                  <p className="rq-qmap__focus rq-qmap__focus--wide">
                    Your child finishes the summer ahead of the curve — energized with confidence in reading,
                    math, science, somatic regulation, and creative expression.
                  </p>
                  <div className="rq-qmap__cta">
                    <RqBuyLink className="btn btn-gold">Get The Summer Stretch · $21</RqBuyLink>
                    <span className="rq-qmap__guarantee">
                      Instant digital delivery · 30-day money-back guarantee
                    </span>
                  </div>
                </div>
              </article>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   THE OFFER
   ═══════════════════════════════════════════════════════════════ */
const SummerStretchOffer = () => (
  <section className="rq-offer-section section" id="offer">
    <div className="container">
      <RevealSection className="text-center">
        <div className="section-label">The Complete Curriculum</div>
        <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
          8 Weeks of Structured Learning.
          <span className="rq-offer__title-accent">One Payment of $21.</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Everything you need for an unforgettable, low-stress summer of learning.
        </p>
      </RevealSection>

      <RevealSection delay={0.15}>
        <div className="rq-offer">
          <div className="rq-offer__includes">
            <h3 className="rq-offer__includes-title">What The Summer Stretch Includes</h3>
            <ul className="rq-offer__list">
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>8 Full Weeks / 40 Day-by-Day Lessons.</strong> Structured across all 7 lands.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>240+ Daily Activity Blocks.</strong> Six 3-minute subject blocks per day.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Sound-Before-Symbol Phonetic Guides.</strong> Pronunciation keys on every page.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>15 Hero Guides & Coaching Tips.</strong> Character mentorship for daily motivation.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Friday Milestone Celebrations & Quest Stars.</strong> Gamified rewards & progress mapping.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Instant High-Resolution PDF Download.</strong> Print at home or complete on a tablet.
                </span>
              </li>
            </ul>

            <p className="rq-offer__free">
              Pairs perfectly with the free 19-track album on /listen. No expensive curriculum boxes or
              monthly subscription fees.
            </p>
          </div>

          <aside className="rq-offer__price">
            <div className="rq-offer__stave" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>

            <span className="rq-offer__amount">$21</span>
            <span className="rq-offer__terms">complete digital workbook · no subscription</span>
            <p className="rq-offer__math">
              40 days of guided learning = <strong>~52¢ a day</strong>.
            </p>

            <RqBuyLink className="btn btn-gold rq-offer__buy">
              <span>Get The Summer Stretch</span>
              <span className="rq-offer__buy-price">$21</span>
            </RqBuyLink>

            <p className="rq-offer__nudge">Instant digital delivery · Ready to start today.</p>

            <div className="rq-offer__guarantee">
              <span className="rq-offer__seal" aria-hidden="true">🛡</span>
              <span>
                <strong className="rq-offer__seal-title">30-Day Money Back Guarantee</strong>
                Try the curriculum with your child. If it does not fit your family, email us within
                30 days for a full, prompt refund.
              </span>
            </div>
          </aside>
        </div>
      </RevealSection>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    id: 'grades',
    color: 'var(--color-orange)',
    q: 'What age and grade levels is The Summer Stretch designed for?',
    a: [
      'The Summer Stretch is engineered for Kindergarten through 3rd Grade (ages 4 to 8).',
      'For younger learners (Pre-K / K), parents guide the 6 short blocks together. For older learners (1st–3rd Grade), children can complete the blocks independently with parent check-ins.',
    ],
    chips: ['Grades K–3', 'Ages 4 to 8', 'Guided or Independent'],
  },
  {
    id: 'time',
    color: 'var(--color-blue)',
    q: 'How much time does it take each day?',
    a: [
      'About 16 minutes total per day.',
      'The day is divided into six quick 2-to-3 minute blocks (Phonics, Math, Science, Physical Movement, Geography/Civics, and Reflection). It is designed to fit smoothly into morning breakfast routines or afternoon quiet time.',
    ],
    chips: ['~16 minutes/day', '6 short blocks', 'Zero burnout'],
  },
  {
    id: 'supplies',
    color: 'var(--color-purple)',
    q: 'Do I need special supplies or materials?',
    a: [
      'No special supplies required!',
      'All you need is a pencil, a few crayons or colored markers, and everyday household items (like a spoon or a leaf for nature observations).',
    ],
    chips: ['No prep needed', 'Household items', 'Open-and-go'],
  },
  {
    id: 'print',
    color: 'var(--color-yellow)',
    q: 'Can I print it at home or use it on a tablet?',
    a: [
      'Yes! The digital download is a high-resolution, print-ready PDF.',
      'You can print the entire 8-week workbook at once, print day-by-day sheets, or load the PDF into tablet annotation apps like GoodNotes or Notability.',
    ],
    chips: ['Printable PDF', 'Tablet compatible', 'Unlimited home prints'],
  },
  {
    id: 'music',
    color: 'var(--color-red)',
    q: 'How does the music integrate with the workbook?',
    a: [
      'Every week corresponds with themes and characters from the 19-track Sound of Essentials album (available 100% free on /listen).',
      'The songs reinforce the phonics, numbers, and somatic movement exercises children practice on the page.',
    ],
    chips: ['Free companion album', 'Phonics songs', 'Multi-sensory'],
  },
  {
    id: 'refund',
    color: 'var(--color-green)',
    q: 'What is your refund policy?',
    a: [
      'We offer a 30-day 100% money-back guarantee.',
      'If The Summer Stretch is not a great fit for your child, simply send us an email within 30 days and we will refund your purchase completely.',
    ],
    chips: ['30-day guarantee', 'One email refund', 'Zero risk'],
  },
];

const RqFaqRow = ({ item, index, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const btnId = `ss-faq-btn-${item.id}`;
  const panelId = `ss-faq-panel-${item.id}`;

  return (
    <div
      className={`rq-faq-row${open ? ' is-open' : ''}`}
      style={{ '--faq-color': item.color, '--i': index }}
    >
      <h3 className="rq-faq-row__q">
        <button
          type="button"
          id={btnId}
          className="rq-faq-row__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="rq-faq-row__q-text">{item.q}</span>
          <span className="rq-faq-row__toggle" aria-hidden="true" />
        </button>
      </h3>

      <div className="rq-faq-row__panel" id={panelId} role="region" aria-labelledby={btnId}>
        <div className="rq-faq-row__panel-inner">
          {item.a.map((para) => (
            <p key={para.slice(0, 32)} className="rq-faq-row__a">{para}</p>
          ))}
          <ul className="rq-faq-row__chips">
            {item.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SummerStretchFaq = () => (
  <section className="rq-faq section" id="faq">
    <div className="container">
      <div className="rq-faq__grid">
        <RevealSection className="rq-faq__intro">
          <div className="section-label">Straight Answers</div>
          <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
            Frequently Asked <span className="text-sage">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about The Summer Stretch curriculum.
          </p>
        </RevealSection>

        <RevealSection className="rq-faq__list" threshold={0.08}>
          {faqs.map((item, i) => (
            <RqFaqRow key={item.id} item={item} index={i} defaultOpen={i === 0} />
          ))}
        </RevealSection>

        <RevealSection className="rq-faq__aside" delay={0.15}>
          <div className="rq-faq__cta">
            <span className="rq-faq__cta-eyebrow">Ready for Summer</span>
            <p className="rq-faq__cta-price">
              <strong>$21</strong> complete 8-week workbook
            </p>
            <RqBuyLink className="btn btn-gold rq-faq__cta-btn">
              Get The Summer Stretch · $21
            </RqBuyLink>
            <p className="rq-faq__cta-fine">
              30-day money-back guarantee · Instant PDF download
            </p>
          </div>
        </RevealSection>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const RhythmQuestSale = () => {
  useEffect(() => {
    document.title = 'The Sound of Essentials: The Summer Stretch — 8-Week Learning Quest (Grades K–3)';
  }, []);

  const carouselOrder = [
    'Seriphia', 'Kenji', 'Elias', 'Ezra', 'Ronan', 'Kwame', 'Silas', 'Aiko',
    'Felix', 'Selene', 'Nerissa', 'Octavia', 'Amara', 'Vesta', 'Athena'
  ];

  const allChars = carouselOrder.map(name => {
    const h = heroesData.find(char => char.name === name);
    return { id: h.id, name: h.name, img: h.img, color: h.carouselColor };
  });
  const paradeChars = [...allChars, ...allChars];

  return (
    <div className="rq-sale" style={{ '--rq-hero-bg': `url('${assetPath('/assets/scenes/seriphia-seven-lands-path.webp')}')` }}>
      {/* ═══ HERO ═══ */}
      <SummerStretchHero />

      {/* ═══ PROOF & RESEARCH ═══ */}
      <SummerStretchProof />

      {/* ═══ WHAT'S INSIDE (THE 6 DAILY BLOCKS) ═══ */}
      <SummerStretchWhatsInside />

      {/* ═══ 8-WEEK ROADMAP ═══ */}
      <SummerStretchRoadmap />

      {/* ═══ 15 HEROES PARADE ═══ */}
      <section className="rq-characters">
        <div className="rq-char-parade" aria-label="Character parade">
          {paradeChars.map((c, i) => (
            <div key={`${c.id}-${i}`} className="rq-char-item">
              <img
                src={assetPath(`/assets/characters/${c.name.toUpperCase()}.webp`)}
                alt={c.name}
                className="rq-char-item__img"
                loading="lazy"
              />
              <span className="rq-char-item__name">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE OFFER ═══ */}
      <SummerStretchOffer />

      {/* ═══ FAQ ═══ */}
      <SummerStretchFaq />

      {/* ═══ FINAL CTA ═══ */}
      <section className="rq-final-cta section">
        <div className="container">
          <RevealSection>
            <div className="rq-cta-card">
              <div className="scene-backdrop" aria-hidden="true">
                <img
                  src={assetPath('/assets/marketing/quest-collage.webp')}
                  alt=""
                  className="scene-backdrop__img"
                />
                <div className="scene-backdrop__scrim" />
              </div>
              <div className="rq-cta-card__icon" aria-hidden="true">☀️</div>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                Start The Summer Stretch Today
              </h2>
              <p className="section-subtitle" style={{ marginTop: '1rem' }}>
                8 Weeks. 40 Days. 240+ Daily Activities. Grades K–3.
                <br />
                <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>
                  Prevent the summer slide with music-powered joy.
                </span>
              </p>
              <div className="rq-cta-actions">
                <RqBuyLink className="btn btn-gold">Get The Summer Stretch — $21</RqBuyLink>
                <Link to="/listen" className="btn btn-sage">Get the Free Album First</Link>
              </div>
              <div className="rq-guarantee">
                <span>🔒</span> Instant digital PDF delivery · Print or use on tablet · 30-day guarantee
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default RhythmQuestSale;
