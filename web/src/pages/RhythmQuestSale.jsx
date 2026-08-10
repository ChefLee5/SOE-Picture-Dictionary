import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RevealSection } from '../hooks/useReveal';
import heroesData from '../data/heroes.json';
import landsData from '../data/lands.json';
import { assetPath } from '../utils/assetPath';
import './RhythmQuestSale.css';

/**
 * Single source of truth for every buy CTA on this page.
 *
 * TODO: replace with the live checkout permalink for the $19 "Rhythm Quest"
 * EPUB — the Shopify cart permalink of the form
 * https://<shop>.myshopify.com/cart/<variantId>:1, or its custom-domain
 * equivalent. Until that variant exists, every buy CTA falls back to /join,
 * the newsletter page.
 *
 * RqBuyLink below reads this constant and picks the right element, so the
 * swap is a one-line change: an internal path renders a react-router <Link>,
 * an absolute https:// URL renders a plain <a>. Rendering an absolute URL
 * through <Link> would make react-router treat it as a relative path and 404.
 */
const CHECKOUT_URL = '/join';
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
   WEEK ORDER — one canon for the whole page.

   Every week-numbered element on this page (hero rail, What's Inside,
   the quest map, the offer rail, the FAQ) reads the SAME order straight
   out of lands.json, so "Week 3" means Vitalis everywhere. A second
   ordering was considered for the quest map (the book's page order) and
   dropped: two sections cannot both define Week 2 and stay honest.

   Lands are paired to their SUBJECT here, never blanket-paired to a
   track — the catalogue assigns zero tracks to Aquaria, so a per-Land
   track claim would be a lie.
   ══════════════════════════════════════════════════════════════════════ */
const WEEKS = landsData;

/* ═══════════════════════════════════════════════════════════════
   HERO — the offer frame
   ═══════════════════════════════════════════════════════════════ */
const RhythmQuestHero = () => {
  const [week, setWeek] = useState(0);
  const [chosen, setChosen] = useState(false); // parent picked a week: stop cycling for good
  const [paused, setPaused] = useState(false); // parent is hovering/reading the path
  const [calm, setCalm] = useState(false);     // prefers-reduced-motion
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
    const id = setInterval(() => setWeek((w) => (w + 1) % WEEKS.length), 3200);
    return () => clearInterval(id);
  }, [calm, chosen, paused]);

  /* Pointer parallax on the book. Writes CSS vars straight to the node so the
     tilt never triggers a React render. Fine pointers only, calm mode opts out. */
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

  const land = WEEKS[week];

  return (
    <header className="rq-hero">
      <div className="rq-hero__bg" aria-hidden="true" />
      <div className="rq-hero__overlay" aria-hidden="true" />

      <div className="rq-hero__inner">
        <div className="rq-hero__grid">
          <div className="rq-hero__copy">
            <span className="rq-hero__badge">🎶 The Seven Land Quest · one Land a week</span>

            <h1 className="rq-hero__title">
              Seven Weeks. Seven Lands.
              <span className="rq-hero__title-accent">One Quest, Together.</span>
            </h1>

            <p className="section-subtitle rq-hero__hook">Your child already knows the tunes.</p>

            <p className="rq-hero__lede">
              Rhythm Quest turns those songs into a path you can follow. One Land a week, for seven
              weeks, across 66 illustrated pages. Seriphia calls the heroes. Your child walks the
              whole way with them.
            </p>

            <div className="rq-hero__offer">
              <div className="rq-hero__price-tag">
                <span className="rq-hero__price">$19</span>
                <span className="rq-hero__price-note">one time, yours to keep</span>
              </div>

              <p className="rq-hero__price-math">
                That is about $2.70 for each week of the quest. Paid once, never again.
              </p>

              <div className="rq-hero__actions">
                <RqBuyLink className="btn btn-gold">Start Week One · $19</RqBuyLink>
                <a href="#preview" className="btn btn-outline">Look Inside the Book ↓</a>
              </div>

              <ul className="rq-hero__assure">
                <li>30-day money back</li>
                <li>Instant EPUB, read tonight</li>
                <li>Built for ages 2 to 7</li>
              </ul>

              <p className="rq-hero__free-note">
                Already have the free album and coloring book? This is the seven week path they were
                made for.
              </p>
            </div>
          </div>

          <div className="rq-hero__book">
            <div
              className="rq-hero__stage"
              style={{ '--rq-land': land.color }}
              onMouseMove={tilt}
              onMouseLeave={untilt}
            >
              <div className="rq-book-3d">
                <div className="rq-book-3d__inner" ref={innerRef}>
                  <img
                    src={assetPath('/assets/book/soe-rhythm-quest-cover.webp')}
                    alt="The Sound of Essentials: Rhythm Quest Storybook — Official Cover, Seriphia guiding the world of the Seven Lands"
                    className="rq-book-3d__cover"
                  />
                </div>
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
                <span className="sparkle" aria-hidden="true" />
              </div>

              {/* Visual echo of the path. The rail below carries the same text
                  for assistive tech, so this stays hidden from it. */}
              <div className="rq-hero__week" key={land.id} aria-hidden="true">
                <img
                  className="rq-hero__week-thumb"
                  src={assetPath(`/assets/lands/${land.id}.webp`)}
                  alt=""
                  loading="lazy"
                />
                <span className="rq-hero__week-text">
                  <span className="rq-hero__week-num">Week {week + 1} of 7</span>
                  <strong className="rq-hero__week-name">{land.name}</strong>
                  <span className="rq-hero__week-focus">{land.focus}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── The path: the offer, laid out as seven finishable weeks ── */}
        <div
          className="rq-hero__path"
          style={{ '--rq-land': land.color }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="rq-hero__path-head">
            <span className="rq-hero__path-title">Your seven weeks</span>
            <span className="rq-hero__path-sub">One Land a week. You always know where you are.</span>
          </div>

          <div className="rq-hero__track" aria-hidden="true">
            <span style={{ width: `${((week + 1) / WEEKS.length) * 100}%` }} />
          </div>

          <ol className="rq-hero__weeks" aria-label="The seven week quest path">
            {WEEKS.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  className="rq-hero__node"
                  style={{ '--rq-node': l.color }}
                  aria-current={i === week ? 'step' : undefined}
                  onClick={() => { setWeek(i); setChosen(true); }}
                >
                  <span className="rq-hero__node-dot" aria-hidden="true" />
                  <span className="rq-hero__node-txt">
                    <span className="rq-hero__node-wk">Week {i + 1}</span>
                    <span className="rq-hero__node-name">{l.name}</span>
                  </span>
                  <span className="sr-only">, {l.focus}</span>
                </button>
              </li>
            ))}
          </ol>

          <p className="rq-hero__next">
            Weeks 8 through 15 continue later, in the Summer Stretch workbook, when you are ready.
          </p>
        </div>
      </div>
    </header>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROOF
   Four jobs in order: scope (the rail), evidence (cited research),
   provenance (the maker), then risk reversal + the one CTA.
   Nothing here is invented. Rail counts derive from lands.json /
   heroes.json so they can never drift, and every study links to the
   same peer-reviewed source already cited on /science.
   "19 Companion Tracks" was removed from the rail on purpose: the
   album is the FREE gift at the previous gate, and listing it in a
   paid-product stat row reads as a paid inclusion.
   ═══════════════════════════════════════════════════════════════ */
const proofEvidence = [
  {
    id: 'rhythm',
    idx: '01',
    pull: '2022',
    pullNote: 'Nature Sci. Reports',
    claim: 'Rhythm predicts reading. Melody does not.',
    detail: 'Researchers traced the link from musical ability to reading and found it runs through rhythm, by way of phonological awareness. Melody perception did not carry it.',
    soWhat: 'So we built it that way: every Land starts on a beat, and the words ride on top.',
    href: 'https://www.nature.com/articles/s41598-022-15596-7',
    cite: 'Nature Scientific Reports, 2022',
    tint: 'var(--color-orange)',
    soft: 'var(--color-orange-soft)',
  },
  {
    id: 'minutes',
    idx: '02',
    pull: '10 min',
    pullNote: 'a day, 20 weeks',
    claim: 'Ten minutes a day matched a phonics program.',
    detail: 'Preschoolers did ten minutes of daily music activity for twenty weeks. Their phonological awareness rose as much as the group given a dedicated phonics program.',
    soWhat: 'So we built it that way: one Land a week, in bedtime-sized pieces, paired to songs your child already has for free.',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3121007/',
    cite: 'Frontiers in Psychology, 2011',
    tint: 'var(--color-green)',
    soft: 'var(--color-green-soft)',
  },
  {
    id: 'genes',
    idx: '03',
    pull: '16',
    pullNote: 'genome regions',
    claim: 'Rhythm and language share the same roots.',
    detail: 'A study of more than one million people found sixteen regions of the genome shared between rhythm ability and language and reading skill.',
    soWhat: 'So we built it that way: music is not a treat we add to the learning. It is the road the learning travels.',
    href: 'https://neurosciencenews.com/genetics-music-language-28151/',
    cite: 'Genome-wide study, 2024',
    tint: 'var(--color-purple)',
    soft: 'var(--color-purple-soft)',
  },
];

const makerChips = [
  'Drawn by hand, not generated',
  'Ages 2 to 7, by design',
  'For the developing brain, not the algorithm',
];

/* Eased count-up. Snaps straight to the value under reduced motion. */
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

const RqProof = () => {
  const [railRef, railInView] = useInView(0.25);

  const proofRail = useMemo(() => ([
    { value: 66,                label: 'Illustrated Pages', sub: 'One story, cover to cover', tint: 'var(--color-orange)' },
    { value: landsData.length,  label: 'Lands, One a Week', sub: 'The Seven Land Quest',      tint: 'var(--color-green)'  },
    { value: heroesData.length, label: 'Heroes to Meet',    sub: 'Seriphia calls them all',   tint: 'var(--color-purple)' },
    { value: 30,                label: 'Day Money Back',    sub: 'No questions asked',        tint: 'var(--color-blue)'   },
  ]), []);

  return (
    <section className="rq-proof" aria-label="Why you can trust this">

      {/* RAIL: the four-second scan. Counted, derived, never hardcoded. */}
      <div className="rq-proof__rail" ref={railRef}>
        <RevealSection>
          <div className="rq-proof__rail-inner">
            {proofRail.map((s) => (
              <div key={s.label} className="rq-proof-stat" style={{ '--stat-tint': s.tint }}>
                <span className="rq-proof-stat__value" aria-hidden="true">
                  <RqCount value={s.value} active={railInView} />
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
        <div className="rq-proof__watermark" aria-hidden="true">
          <img src={assetPath('/assets/marketing/busy-brain.webp')} alt="" loading="lazy" />
        </div>

        <div className="container">
          <RevealSection className="text-center rq-proof__head">
            <div className="section-label">Why Trust It</div>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              No Reviews Yet. <span className="text-gold">Here Is What We Do Have.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We are new. So we will show our work.
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

                  <div className="rq-ev-card__meter" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
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
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="rq-proof__note">
              This research is about music and reading in general. It is not a promise about
              your child. We follow it because the direction keeps holding.
            </p>
          </RevealSection>

          {/* PROVENANCE: the person, not a persona. Every line is on /mission already. */}
          <RevealSection delay={0.1}>
            <div className="rq-maker">
              <div className="rq-maker__bg" aria-hidden="true">
                <img src={assetPath('/assets/marketing/harmonia-call.webp')} alt="" loading="lazy" />
                <span className="rq-maker__scrim" />
              </div>

              <div className="rq-maker__copy">
                <span className="rq-maker__eyebrow">The Maker</span>
                <h3 className="rq-maker__title">Built by a father who lived the problem.</h3>
                <p className="rq-maker__text">
                  When schools shut, a father was told music was non-essential. He looked at his
                  own kids and knew that was wrong.
                </p>
                <p className="rq-maker__text">
                  So he wrote the nineteen songs himself. Then he drew the Seven Lands around
                  them, page by page, so the story could keep going after the last track ends.
                  Rhythm Quest is that world on paper.
                </p>
                <p className="rq-maker__sign">Handcrafted. Not generated.</p>
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

          {/* RISK REVERSAL + the one thing to do next. */}
          <RevealSection delay={0.15}>
            <div className="rq-assure">
              <div className="rq-assure__copy">
                <p className="rq-assure__title">Seven weeks. Nineteen dollars. One decision.</p>
                <p className="rq-assure__text">
                  That works out to about $2.71 a week. Read the first Land tonight. If it does
                  not land with your child, ask inside 30 days and we refund it.
                </p>
              </div>
              <div className="rq-assure__action">
                <RqBuyLink className="btn btn-gold">
                  Start the Seven Land Quest · $19
                </RqBuyLink>
                <span className="rq-assure__micro">
                  Instant EPUB · Read on any device · No subscription
                </span>
                <span className="rq-assure__micro">
                  Weeks 8 to 15 continue in the Summer Stretch workbook.
                </span>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WHAT'S INSIDE — the Seven Land Quest, week by week
   Track pairings come straight from web/src/data/tracks.json.
   Aquaria carries zero tracks (it replaced the retired Geometria),
   so it is presented as the quiet week rather than given a song it
   does not have. No track title on this page is invented.
   ═══════════════════════════════════════════════════════════════ */
const QUEST_WEEKS = [
  {
    id: 'harmonia',
    name: 'Harmonia',
    focus: 'Language & Manners',
    color: '#d4a843',
    scene: 'pond-aiko-kenji.webp',
    alt: 'Kenji and Aiko singing by the pond in Harmonia',
    heroes: ['Kenji', 'Aiko'],
    tracks: ['Alphabet Song Remix', 'Manners'],
    line: 'The quest opens where the singing starts. Letters turn into words, and "please" turns into a habit.',
  },
  {
    id: 'numeria',
    name: 'Numeria',
    focus: 'Numbers & Mathematics',
    color: '#7fb685',
    scene: 'kwame-counting.webp',
    alt: 'Kwame counting his way up the towers of Numeria',
    heroes: ['Kwame', 'Octavia'],
    tracks: ['Numbers', 'One Hundred'],
    line: 'Counting becomes a climb. Kwame and Octavia take it one step at a time, all the way to one hundred.',
  },
  {
    id: 'vitalis',
    name: 'Vitalis',
    focus: 'Physical & Motor Skills',
    color: '#c4785a',
    scene: 'dance-harmonia-vitalis.webp',
    alt: 'Felix, Amara and the heroes dancing on the way into Vitalis',
    heroes: ['Felix', 'Amara'],
    tracks: ["Let's Stretch", 'Drill Time'],
    line: 'The loud week, on purpose. These two songs exist to get your child off the couch.',
    more: 'Read this Land after the wiggles, not at bedtime.',
  },
  {
    id: 'celestia',
    name: 'Celestia',
    focus: 'Time & Seasons',
    color: '#9678c4',
    scene: 'seriphia-in-celestia.webp',
    alt: 'Seriphia among the clocks and stars of Celestia',
    heroes: ['Elias', 'Selene'],
    tracks: ['Days of the Week', 'Time', 'Months of the Year'],
    line: 'Three songs, one idea. This is the week that "tomorrow" finally gets a name.',
  },
  {
    id: 'luminosity',
    name: 'Luminosity',
    focus: 'Advanced Language',
    color: '#d4897a',
    scene: 'wildflower-path.webp',
    alt: 'The wildflower path leading into Luminosity',
    heroes: ['Athena', 'Ezra'],
    tracks: ['Le Cheval', 'Hard Words'],
    line: 'Bigger words, and a whole song in French. Athena and Ezra treat hard words like treasure, not homework.',
  },
  {
    id: 'aquaria',
    name: 'Aquaria',
    focus: 'Water & Emotion',
    color: '#5ba4c9',
    scene: 'b-roll-boats.webp',
    alt: 'Little boats drifting on the open water of Aquaria',
    heroes: ['Nerissa', 'Ronan'],
    tracks: [],
    line: 'The one Land with no song of its own. Aquaria is the quiet week, where Nerissa and Ronan give big feelings their names.',
    more: 'Some weeks should be slower. This is the one.',
  },
  {
    id: 'terrasol',
    name: 'Terrasol',
    focus: 'Science & Nature',
    color: '#5fb685',
    scene: 'path-to-terrasol.webp',
    alt: 'The long green path opening into Terrasol',
    heroes: ['Vesta', 'Silas'],
    tracks: ['Sunny Day (Intro)', 'My Body', 'The Ocean', 'After the Storm (Outro)'],
    line: 'The longest week, and the finish line. Vesta and Silas walk your child through the living world.',
    more: 'Seven songs sit in this Land, more than any other. The biggest week is the last one.',
  },
];

const DELIVERABLES = [
  {
    mark: '66',
    color: 'var(--color-orange)',
    title: 'Illustrated pages, one file',
    desc: 'The whole storybook, painted scene by scene. It downloads in seconds and opens on the phone, tablet, or e-reader you already own.',
  },
  {
    mark: 'A-Z',
    color: 'var(--color-blue)',
    title: 'My Word Quest Glossary',
    desc: 'Backmatter built from the story itself. Words from the realms, and words for growing, so the reading keeps going after the last page.',
  },
  {
    mark: '15',
    color: 'var(--color-purple)',
    title: 'The heroes who carry it',
    desc: 'Seriphia calls Kenji and Aiko from the heavens. Twelve more heroes join them, two for every Land still ahead.',
  },
  {
    mark: '30',
    color: 'var(--color-green)',
    title: 'Days to change your mind',
    desc: 'It is digital, so there is nothing to post back. Read it with your child. If it is not right for your family, ask and we refund it.',
  },
];

const RqWhatsInside = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [railLocked, setRailLocked] = useState(false);
  const [questInView, setQuestInView] = useState(false);
  const questRef = useRef(null);
  const tabRefs = useRef([]);

  /* Auto-advance the quest while it is on screen, until the parent takes over. */
  useEffect(() => {
    if (railLocked || !questInView) return undefined;
    if (prefersReducedMotion()) return undefined;
    const id = window.setInterval(
      () => setActiveWeek((i) => (i + 1) % QUEST_WEEKS.length),
      5200
    );
    return () => window.clearInterval(id);
  }, [railLocked, questInView]);

  useEffect(() => {
    const el = questRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setQuestInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pickWeek = (i) => {
    setRailLocked(true);
    setActiveWeek(i);
  };

  const onRailKeyDown = (e) => {
    const last = QUEST_WEEKS.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = activeWeek === last ? 0 : activeWeek + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = activeWeek === 0 ? last : activeWeek - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    pickWeek(next);
    tabRefs.current[next]?.focus();
  };

  const week = QUEST_WEEKS[activeWeek];

  return (
    <section className="rq-inside section" id="whats-inside">
      <div className="container">

        <RevealSection className="text-center">
          <div className="section-label">What&apos;s Inside</div>
          <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
            One Land a Week. Seven Weeks. <span className="text-gold">A Finished Quest.</span>
          </h2>
          <p className="section-subtitle">
            Your child already knows the songs. This is the map that goes with them.
          </p>
          <ul className="rq-inside__facts">
            <li className="rq-inside__fact rq-inside__fact--price">$19 once</li>
            <li className="rq-inside__fact">66 illustrated pages</li>
            <li className="rq-inside__fact">7 weekly Lands</li>
            <li className="rq-inside__fact">Yours to keep</li>
          </ul>
        </RevealSection>

        {/* ── The plan: the rail drives the stage ── */}
        <RevealSection delay={0.1}>
          <div className="rq-quest" ref={questRef} style={{ '--land-color': week.color }}>

            <div
              className="rq-quest__rail"
              role="tablist"
              aria-orientation="vertical"
              aria-label="The Seven Land Quest, week by week"
              onKeyDown={onRailKeyDown}
            >
              <span className="rq-quest__spine" aria-hidden="true" />
              <span
                className="rq-quest__spine rq-quest__spine--lit"
                style={{ '--rq-progress': (activeWeek + 1) / QUEST_WEEKS.length }}
                aria-hidden="true"
              />
              {QUEST_WEEKS.map((w, i) => (
                <button
                  key={w.id}
                  type="button"
                  role="tab"
                  id={`rq-tab-${w.id}`}
                  aria-controls={`rq-panel-${w.id}`}
                  aria-selected={i === activeWeek}
                  tabIndex={i === activeWeek ? 0 : -1}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  className="rq-week"
                  style={{ '--land-color': w.color, '--i': i }}
                  onClick={() => pickWeek(i)}
                >
                  <span className="rq-week__num" aria-hidden="true">{i + 1}</span>
                  <span className="rq-week__text">
                    <span className="rq-week__name">
                      <span className="sr-only">Week {i + 1}, </span>{w.name}
                    </span>
                    <span className="rq-week__focus">{w.focus}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rq-stage">
              <div className="rq-stage__art" key={`art-${week.id}`}>
                <img
                  className="rq-stage__img"
                  src={assetPath(`/assets/scenes/${week.scene}`)}
                  alt={week.alt}
                  loading="lazy"
                />
                <span className="rq-stage__scrim" aria-hidden="true" />
                <span className="rq-stage__tag">Week {activeWeek + 1} of 7</span>
                <div className="rq-stage__heroes">
                  {week.heroes.map((h) => (
                    <img
                      key={h}
                      className="rq-stage__hero"
                      src={assetPath(`/assets/characters/${h.toUpperCase()}.webp`)}
                      alt={h}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <div
                className="rq-stage__body"
                key={`body-${week.id}`}
                id={`rq-panel-${week.id}`}
                role="tabpanel"
                aria-labelledby={`rq-tab-${week.id}`}
                tabIndex={0}
              >
                <h3 className="rq-stage__name">{week.name}</h3>
                <p className="rq-stage__focus">{week.focus}</p>
                <p className="rq-stage__line">{week.line}</p>

                <div className="rq-stage__tracks">
                  <span className="rq-stage__tracks-label">
                    {week.tracks.length ? 'Play alongside' : 'No song this week'}
                  </span>
                  {week.tracks.length ? (
                    week.tracks.map((t, i) => (
                      <span key={t} className="rq-chip" style={{ '--i': i }}>♪ {t}</span>
                    ))
                  ) : (
                    <span className="rq-chip rq-chip--quiet">Read the water instead</span>
                  )}
                </div>

                {week.more && <p className="rq-stage__more">{week.more}</p>}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── What actually downloads ── */}
        <div className="rq-inside__deliver">
          <RevealSection className="text-center">
            <p className="rq-inside__deliver-head">And all of it arrives tonight, at once.</p>
          </RevealSection>

          <div className="rq-inside__grid">
            {DELIVERABLES.map((d, i) => (
              <RevealSection key={d.title} delay={i * 0.08}>
                <div className="rq-inside-card" style={{ '--feat-color': d.color }}>
                  <span className="rq-inside-card__mark" aria-hidden="true">{d.mark}</span>
                  <h3 className="rq-inside-card__title">{d.title}</h3>
                  <p className="rq-inside-card__desc">{d.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {/* ── The offer in plain words ── */}
        <RevealSection delay={0.1}>
          <div className="rq-inside__ledger">
            <div className="rq-inside__ledger-rows">
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">What it costs</span>
                <span className="rq-ledger-row__v">
                  $19 once, for seven weeks of bedtimes. Under $3 a week, and it never expires.
                </span>
              </div>
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">What stays free</span>
                <span className="rq-ledger-row__v">
                  The album and the coloring book are free and stay free. The quest is simply built
                  on top of them.
                </span>
              </div>
              <div className="rq-ledger-row">
                <span className="rq-ledger-row__k">What comes after</span>
                <span className="rq-ledger-row__v">
                  Finish all seven Lands and weeks 8 through 15 are already written, waiting in the
                  Summer Stretch workbook.
                </span>
              </div>
            </div>

            <RqBuyLink className="btn btn-gold">Start the Quest · $19</RqBuyLink>
            <p className="rq-inside__cta-note">
              Instant EPUB download · Ages 2 to 7 · 30 days to change your mind
            </p>
          </div>
        </RevealSection>

      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   THE SEVEN LAND QUEST MAP

   Week order is the page-wide canon above (lands.json order), so Week 3
   is Vitalis here exactly as it is in the hero, in What's Inside and in
   the offer rail.

   `page` is each Land's FIRST APPEARANCE in the 66 page storybook, verified
   page by page against the PDF on 2026-08-10. The book has no labelled
   chapters, so no page ranges and no per week activity counts are claimed,
   and because reading order differs from week order these numbers do not
   run in sequence.

   TRACK PAIRING: every title below is a real row in web/src/data/tracks.json.
   Aquaria carries zero tracks — it replaced the retired Geometria — so it is
   presented as the quiet week instead of being handed "The Ocean" or "Rain",
   which are filed under Terrasol. "Shapes" belonged to Geometria and stays
   unassigned. Nothing here is invented.
   ══════════════════════════════════════════════════════════════════════ */
const landById = Object.fromEntries(landsData.map((l) => [l.id, l]));

const questWeeks = [
  {
    landId: 'harmonia',
    page: 6,
    art: 'pond-aiko-kenji.webp',
    tracks: ['Alphabet Song Remix', 'Manners'],
    task: 'Sing the alphabet once a day. On day seven, let your child lead it.',
    note: null,
  },
  {
    landId: 'numeria',
    page: 21,
    art: 'math-numeria.webp',
    tracks: ['Numbers', 'One Hundred'],
    task: 'Count something real every day. Stairs, socks, spoons. Ten of anything.',
    note: null,
  },
  {
    landId: 'vitalis',
    page: 14,
    art: 'touch-your-toes.webp',
    tracks: ["Let's Stretch", 'Drill Time'],
    task: 'Move before you read. Five minutes of stretching, then open the book.',
    note: 'Calm by design does not mean quiet all week. These two are loud on purpose.',
  },
  {
    landId: 'celestia',
    page: 32,
    art: 'time-celestia.webp',
    tracks: ['Days of the Week', 'Time', 'Months of the Year'],
    task: 'Say the day out loud each morning. By Sunday, let your child say it first.',
    note: null,
  },
  {
    landId: 'luminosity',
    page: 17,
    art: 'march-luminosity.webp',
    tracks: ['Le Cheval', 'Hard Words'],
    task: 'Pick one hard word a day. Say it, spell it, use it at dinner.',
    note: 'Le Cheval is sung in French. Saying one line back is the whole exercise.',
  },
  {
    landId: 'aquaria',
    page: 35,
    art: 'b-roll-boats.webp',
    tracks: [],
    task: 'Name one feeling a day. Then say where it sits in the body.',
    note: 'Some weeks should be slower. This is the one.',
  },
  {
    landId: 'terrasol',
    page: 10,
    art: 'path-to-terrasol.webp',
    tracks: ['Sunny Day', 'My Body', 'Changes'],
    task: 'Take one walk outside. Name three living things you both see.',
    note: null,
  },
];

/* The spine paints itself in each Land's canon color, built from lands.json
   so it can never drift out of sync with the data. */
const spineGradient = `linear-gradient(180deg, ${questWeeks
  .map((w, i) => `${landById[w.landId].color} ${Math.round((i / (questWeeks.length - 1)) * 100)}%`)
  .join(', ')})`;

const RqQuestMap = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef(null);
  const weekRefs = useRef([]);

  /* Paint the spine as the reader descends. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / (r.height || 1))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Whichever week sits nearest the middle of the screen is the live one. */
  useEffect(() => {
    const nodes = weekRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number(entry.target.dataset.week);
          if (!Number.isNaN(i)) setActiveWeek(i);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const goToWeek = (i) => {
    const el = weekRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section className="rq-qmap section" id="quest-map" aria-labelledby="rq-qmap-title">
      <div className="container">

        <RevealSection className="text-center">
          <div className="section-label">The Seven Land Quest</div>
          <h2 className="section-title" id="rq-qmap-title" style={{ color: 'var(--color-text-dark)' }}>
            Your Next Seven Weeks, <span className="text-plum">Already Planned</span>
          </h2>
          <p className="section-subtitle">
            One Land a week. The songs you already own, the pages that go with them, and one thing to do.
          </p>

          <ul className="rq-qmap__facts">
            <li>About 10 minutes a day</li>
            <li>Reads on any device</li>
            <li>The songs stay free</li>
          </ul>

          <p className="rq-qmap__science">
            In one 20-week trial, ten minutes of daily music training lifted phonological awareness
            as much as a phonics program did. Ten minutes is all a day here asks for.
            <span className="rq-qmap__science-caveat"> Grounded in research, not a promise about your child.</span>
          </p>
        </RevealSection>

        <nav className="rq-qmap__rail" aria-label="Jump to a week">
          {questWeeks.map((w, i) => {
            const land = landById[w.landId];
            return (
              <button
                key={w.landId}
                type="button"
                className={`rq-qmap__rail-btn${i === activeWeek ? ' is-on' : ''}`}
                style={{ '--land-color': land.color }}
                aria-label={`Week ${i + 1}, ${land.name}`}
                aria-current={i === activeWeek ? 'true' : undefined}
                onClick={() => goToWeek(i)}
              >
                <span className="rq-qmap__rail-num">{i + 1}</span>
                <span className="rq-qmap__rail-name">{land.name}</span>
              </button>
            );
          })}
        </nav>

        <div
          className="rq-qmap__track"
          ref={trackRef}
          style={{ '--rq-progress': progress, '--rq-spine': spineGradient }}
        >
          <div className="rq-qmap__spine" aria-hidden="true">
            <span className="rq-qmap__spine-fill" />
          </div>

          <ol className="rq-qmap__weeks">
            {questWeeks.map((w, i) => {
              const land = landById[w.landId];
              const heroes = land.heroes.map((id) => heroesData.find((h) => h.id === id)).filter(Boolean);
              return (
                <li
                  key={w.landId}
                  ref={(el) => { weekRefs.current[i] = el; }}
                  data-week={i}
                  className={`rq-qmap__week${i === activeWeek ? ' is-active' : ''}`}
                  style={{ '--land-color': land.color }}
                >
                  <div className="rq-qmap__node" aria-hidden="true">
                    <span className="rq-qmap__node-dot" />
                  </div>

                  <RevealSection delay={0.06 * i}>
                    <article className="rq-qmap__card">
                      <div className="rq-qmap__art">
                        <img
                          src={assetPath(`/assets/scenes/${w.art}`)}
                          alt={`Scene art from ${land.name}`}
                          loading="lazy"
                        />
                        <span className="rq-qmap__badge">
                          <span aria-hidden="true">{land.icon}</span> {land.name}
                        </span>
                      </div>

                      <div className="rq-qmap__body">
                        <div className="rq-qmap__head">
                          <span className="rq-qmap__week-num">Week {i + 1}</span>
                          <span className="rq-qmap__page">Opens on page {w.page}</span>
                        </div>

                        <h3 className="rq-qmap__land">{land.name}</h3>
                        <p className="rq-qmap__focus">{land.focus}</p>

                        <div className="rq-qmap__heroes">
                          <span className="rq-qmap__avatars" aria-hidden="true">
                            {heroes.map((h) => (
                              <img
                                key={h.id}
                                src={assetPath(`/assets/characters/${h.name.toUpperCase()}.webp`)}
                                alt=""
                                className="rq-qmap__avatar"
                                loading="lazy"
                              />
                            ))}
                          </span>
                          <span className="rq-qmap__duo">{land.duoLabel}</span>
                        </div>

                        <div className="rq-qmap__row">
                          <span className="rq-qmap__row-label">
                            <span className="rq-qmap__eq" aria-hidden="true"><span /><span /><span /></span>
                            {w.tracks.length ? 'Play this week' : 'No song this week'}
                          </span>
                          <span className="rq-qmap__chips">
                            {w.tracks.length ? (
                              w.tracks.map((t) => (
                                <span key={t} className="rq-qmap__chip">{t}</span>
                              ))
                            ) : (
                              <span className="rq-qmap__chip rq-qmap__chip--quiet">
                                Read the water instead
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="rq-qmap__row">
                          <span className="rq-qmap__row-label">Do this once</span>
                          <div className="rq-qmap__do">
                            <p className="rq-qmap__task">{w.task}</p>
                            {w.note && <p className="rq-qmap__note">{w.note}</p>}
                          </div>
                        </div>
                      </div>
                    </article>
                  </RevealSection>
                </li>
              );
            })}
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
                    alt="Artwork marking the end of the Rhythm Quest"
                    loading="lazy"
                  />
                </div>
                <div className="rq-qmap__body">
                  <span className="rq-qmap__eyebrow">The finish line</span>
                  <h3 className="rq-qmap__land">Week 7 ends. The quest is finished.</h3>
                  <p className="rq-qmap__focus rq-qmap__focus--wide">
                    Seven Lands read. Sixty six pages behind you. Every new word your child collected
                    is waiting at the back of the book in My Word Quest Glossary.
                  </p>
                  <p className="rq-qmap__sequel">
                    Weeks 8 through 15 continue in the Summer Stretch workbook, when you are ready for them.
                  </p>
                  <div className="rq-qmap__cta">
                    <RqBuyLink className="btn btn-gold">Start Week 1 for $19</RqBuyLink>
                    <span className="rq-qmap__guarantee">
                      30 days to change your mind. Digital, so there is nothing to send back.
                    </span>
                  </div>
                  <p className="rq-qmap__fineprint">
                    $19 once for all seven weeks. Under $3 a week. The album and the coloring book stay free.
                  </p>
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
   THE OFFER — the money section.
   Three moves, in this order: show the plan, then the price, then
   the objections. Nothing here invents a discount, a deadline, or
   a review.
   ═══════════════════════════════════════════════════════════════ */
const RqOffer = () => (
  <section className="rq-offer-section section" id="offer">
    <div className="container">

      <RevealSection className="text-center">
        <div className="section-label">The Seven Land Quest</div>
        <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
          Seven Weeks of Story.
          <span className="rq-offer__title-accent">One Payment of $19.</span>
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          One Land a week. Seriphia calls Kenji and Aiko in Harmonia, and the road ends in
          Terrasol. You are not buying a file. You are starting a plan that finishes.
        </p>
      </RevealSection>

      {/* ── The plan, drawn as a seven week rail ── */}
      <RevealSection delay={0.1}>
        <p className="rq-weeks__caption">The plan, week by week. Play the free album alongside it.</p>

        <div className="rq-weeks">
          <span className="rq-weeks__track" aria-hidden="true" />
          <ol className="rq-weeks__list">
            {WEEKS.map((land, i) => (
              <li
                key={land.id}
                className="rq-weeks__step"
                style={{ '--land-color': land.color, '--i': i }}
              >
                <span className="rq-weeks__num">Week {i + 1}</span>
                <span className="rq-weeks__dot">
                  <img src={assetPath(`/assets/scenes/${land.sceneBg}`)} alt="" loading="lazy" />
                </span>
                <span className="rq-weeks__land">{land.name}</span>
                <span className="rq-weeks__focus">{land.focus}</span>
                <span className="rq-weeks__duo">{land.duoLabel}</span>
              </li>
            ))}

            <li className="rq-weeks__step rq-weeks__step--finish" style={{ '--i': 7 }}>
              <span className="rq-weeks__num">Day 49</span>
              <span className="rq-weeks__dot">
                <img src={assetPath('/assets/marketing/quest-complete.webp')} alt="" loading="lazy" />
              </span>
              <span className="rq-weeks__land">Quest Complete</span>
              <span className="rq-weeks__focus">The whole book, read</span>
              <span className="rq-weeks__duo">All 15 heroes</span>
            </li>
          </ol>
        </div>
      </RevealSection>

      {/* ── The offer itself ── */}
      <RevealSection delay={0.15}>
        <div className="rq-offer">

          <div className="rq-offer__includes">
            <h3 className="rq-offer__includes-title">What the $19 opens</h3>
            <ul className="rq-offer__list">
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>66 illustrated pages.</strong> The full Rhythm Quest storybook, painted
                  scene by scene.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Seven Lands, seven weeks.</strong> A reading plan with a real finish line,
                  not an endless feed.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>15 heroes, one guide.</strong> Seriphia calls Kenji and Aiko. Thirteen more
                  heroes join the road.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>&quot;My Word Quest Glossary.&quot;</strong> Backmatter vocabulary pulled
                  straight from the story your child just read.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Instant EPUB.</strong> Read it tonight on a phone, tablet, laptop, or
                  e-reader.
                </span>
              </li>
              <li className="rq-offer__item">
                <span className="rq-offer__tick" aria-hidden="true">✓</span>
                <span>
                  <strong>Yours to keep.</strong> Built for ages 2 to 7. Read it at three, then read
                  it again at six.
                </span>
              </li>
            </ul>

            <p className="rq-offer__free">
              The 19-track album and the 40-sheet coloring book are free at the gate before this one.
              They are not add-ons here. The album is simply the soundtrack this seven-week plan is
              built around.
            </p>
          </div>

          <aside className="rq-offer__price">
            <div className="rq-offer__stave" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>

            <span className="rq-offer__amount">$19</span>
            <span className="rq-offer__terms">one time, no subscription</span>
            <p className="rq-offer__math">
              Seven weeks of bedtime reading. That is about <strong>$2.71 a week</strong>.
            </p>

            <RqBuyLink className="btn btn-gold rq-offer__buy">
              <span>Start the Seven Land Quest</span>
              <span className="rq-offer__buy-price">$19</span>
            </RqBuyLink>

            <p className="rq-offer__nudge">No sale price. No countdown. The number is the number.</p>

            <div className="rq-offer__guarantee">
              <span className="rq-offer__seal" aria-hidden="true">🛡</span>
              <span>
                <strong className="rq-offer__seal-title">30-Day Money Back Guarantee</strong>
                Read the whole quest. If it does not fit your family, email us inside 30 days and we
                refund the full $19. It is a digital book, so there is nothing to post back.
              </span>
            </div>

            <p className="rq-offer__science">
              Grounded in research: rhythm, more than melody, predicts how children pick up reading.{' '}
              <Link to="/science" className="rq-offer__science-link">See the studies →</Link>
            </p>
          </aside>
        </div>
      </RevealSection>

      {/* ── Objections, answered before they are asked ── */}
      <RevealSection delay={0.2}>
        <div className="rq-objections">
          <div className="rq-objection">
            <p className="rq-objection__q">Will it open on my device?</p>
            <p className="rq-objection__a">
              EPUB is the standard ebook format. Apple Books, Google Play Books, the Kindle app, and
              every free reader open it.
            </p>
          </div>
          <div className="rq-objection">
            <p className="rq-objection__q">My child is only two.</p>
            <p className="rq-objection__a">
              Built for ages 2 to 7. At two they ride the pictures and the songs. At six they read the
              glossary on their own.
            </p>
          </div>
          <div className="rq-objection">
            <p className="rq-objection__q">Do we need the album first?</p>
            <p className="rq-objection__a">
              No. The album is free and it helps, but the book stands on its own.
            </p>
          </div>
          <div className="rq-objection">
            <p className="rq-objection__q">What comes after week seven?</p>
            <p className="rq-objection__a">
              The Summer Stretch workbook picks up at week eight and runs to week fifteen. That is a
              separate thing, for when you are ready.
            </p>
          </div>
        </div>
      </RevealSection>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   FAQ — "Six Fair Questions. Six Straight Answers."
   ═══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    id: 'price',
    color: 'var(--color-orange)',
    q: 'The album is free. Why does the book cost $19?',
    a: [
      'The songs stay free. Always. You are paying for the world they came from.',
      'The album gives your child 19 tracks to sing. Rhythm Quest gives them 66 illustrated pages, 7 Lands, 15 heroes, and a seven week plan that turns all that listening into a story you finish together.',
      'It is $19 once. Across seven weeks that is under $3 a week. Nothing renews, and there is no upsell waiting inside the book.',
    ],
    chips: ['$19 once', 'Under $3 a week', 'Nothing renews'],
  },
  {
    id: 'age',
    color: 'var(--color-blue)',
    q: 'What age is this for?',
    a: [
      'Ages 2 to 7.',
      'From 2 to 4, you read it out loud. Your child points at the pictures, sings the parts they already know, and names what they see.',
      'From 5 to 7, they start reading lines on their own and using the My Word Quest Glossary at the back to look up the big words.',
      'Same book. It grows with them.',
    ],
    chips: ['Ages 2 to 7', 'Read aloud or read alone', 'Glossary at the back'],
  },
  {
    id: 'week',
    color: 'var(--color-purple)',
    q: 'What do we actually do each week?',
    a: [
      'One Land a week, for seven weeks. That is the whole quest.',
      "Each week you play that Land's songs, read that Land's pages together, then talk through the glossary words your child just met.",
      'Ten to fifteen minutes a sitting, three or four nights. You set the pace, and nothing expires if you fall behind.',
      'Six of the Lands have songs your child already knows from the album. Aquaria runs on the artwork instead, so that week is a look and talk week.',
    ],
    weeks: true,
    note: 'Week 7 ends the quest. It finishes. There is a sequel that picks up at week 8, and it can wait until you want it.',
    chips: ['7 weeks', '1 Land a week', 'Finishes on week 7'],
  },
  {
    id: 'print',
    color: 'var(--color-yellow)',
    q: 'Can I print it?',
    a: [
      'Not as a print pack, and here is the honest reason. Rhythm Quest is an EPUB. The text reflows to fit whatever screen you open it on, so there is no fixed page to send to a printer.',
      'Read it on a phone, a tablet, an e-reader, or a computer. Apple Books and Google Play Books open it with a tap.',
      'If you want paper on the kitchen table, the 40 sheet coloring book that comes free with the album is the printable one.',
    ],
    chips: ['EPUB file', 'Any device', 'Instant download'],
  },
  {
    id: 'screens',
    color: 'var(--color-red)',
    q: 'Is this just more screen time?',
    a: [
      'It is a book, and you are the one holding it. No autoplay. No feed. No next episode queued up. The page waits for your child.',
      'We built it for the developing brain, not the algorithm. Most of the quest is calm on purpose. Two tracks in Vitalis are built to get them up and moving, and that is on purpose too.',
      'The research behind it is real, so we will say it carefully. Rhythm, more than melody, tracks with early reading. In one 20 week trial, ten minutes of daily music training lifted phonological awareness about as much as a phonics program did. Researchers have found 16 regions of the genome that overlap between rhythm ability and reading.',
      'Grounded in research. Not a promise about your child.',
    ],
    chips: ['No autoplay', 'No feed', 'Grounded in research'],
  },
  {
    id: 'refund',
    color: 'var(--color-green)',
    q: 'What if it does not suit us?',
    a: [
      'Then you get your money back. You have 30 days.',
      'Send one email and we refund the $19. There is nothing to ship back and no form to fill in.',
      'We would rather you have a book your family actually reads.',
    ],
    chips: ['30 day guarantee', 'One email', 'Nothing to return'],
  },
];

/* One row of the stave. Local state, so more than one can stay open. */
const RqFaqRow = ({ item, index, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const btnId = `rq-faq-btn-${item.id}`;
  const panelId = `rq-faq-panel-${item.id}`;

  return (
    <div
      className={`rq-faq-row${open ? ' is-open' : ''}`}
      style={{ '--faq-color': item.color, '--i': index }}
    >
      <span className="rq-faq-row__note" aria-hidden="true" />

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

          {item.weeks && (
            <ol className="rq-faq-row__weeks">
              {WEEKS.map((land, w) => (
                <li key={land.id} style={{ '--land-color': land.color }}>
                  <span className="rq-faq-row__week-n">Week {w + 1}</span>
                  <span className="rq-faq-row__week-land">
                    <span aria-hidden="true">{land.icon}</span> {land.name}
                  </span>
                </li>
              ))}
              <li className="rq-faq-row__weeks-next">
                <span className="rq-faq-row__week-n">Week 8 and on</span>
                <span className="rq-faq-row__week-land">The sequel, for later</span>
              </li>
            </ol>
          )}

          {item.note && <p className="rq-faq-row__a rq-faq-row__a--note">{item.note}</p>}

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

const RqFaq = () => (
  <section className="rq-faq section" id="faq">
    <div className="container">
      <div className="rq-faq__grid">

        <RevealSection className="rq-faq__intro">
          <div className="section-label">Straight Answers</div>
          <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
            Six Fair Questions. <span className="text-sage">Six Straight Answers.</span>
          </h2>
          <p className="section-subtitle">
            We would rather answer these now than after you buy.
          </p>
        </RevealSection>

        <RevealSection className="rq-faq__list" threshold={0.08}>
          {faqs.map((item, i) => (
            <RqFaqRow key={item.id} item={item} index={i} defaultOpen={i === 0} />
          ))}
        </RevealSection>

        <RevealSection className="rq-faq__aside" delay={0.15}>
          <div className="rq-faq__cta">
            <span className="rq-faq__cta-eyebrow">Ready when you are</span>
            <p className="rq-faq__cta-price">
              <strong>$19</strong> once. Seven weeks. Yours to keep.
            </p>
            <RqBuyLink className="btn btn-gold rq-faq__cta-btn">
              Start the Seven Land Quest · $19
            </RqBuyLink>
            <p className="rq-faq__cta-fine">
              30 day money back guarantee. Instant EPUB download.
            </p>
            <a href="#preview" className="rq-faq__cta-link">
              Or look inside a few pages first
            </a>
          </div>
        </RevealSection>

      </div>
    </div>
  </section>
);

/* ── Real spreads from the Rhythm Quest storybook (web/public/assets/book/) ── */
const bookPreviews = [
  { file: '1.png',  label: "Seriphia's Call From the Heavens" },
  { file: '3.png',  label: 'Kenji & Aiko — Singing Their Way Through the Alphabet' },
  { file: '5.png',  label: 'The Word Warriors Lead the Way' },
  { file: '7.png',  label: 'The Whole Quest, Together in the Sunflower Fields' },
  { file: '9.png',  label: 'Riding the Waves of Aquaria' },
  { file: '12.png', label: 'Through the Music Gate, the Quest Begins' },
];

const RhythmQuestSale = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.title = 'The Sound of Essentials: Rhythm Quest — Seven Weeks, Seven Lands, One Quest';
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
    <div className="rq-sale" style={{ '--rq-hero-bg': `url('${assetPath('/assets/scenes/aquaria-shore.webp')}')` }}>

      {/* ═══ HERO ═══ */}
      <RhythmQuestHero />

      {/* ═══ PROOF: counted scope, cited research, the maker, risk reversal ═══ */}
      <RqProof />

      {/* ═══ SIGNATURE: SONG-STAVE BRIDGE ═══ */}
      <section className="rq-bridge">
        <div className="rq-bridge__inner">
          <RevealSection>
            <p className="rq-bridge__line">&quot;The songs become a universe.&quot;</p>
            <div className="rq-staff" aria-hidden="true">
              <div className="rq-staff__lines">
                <span /><span /><span /><span /><span />
              </div>
              <div className="rq-staff__glyphs">
                <span className="rq-staff__note">♪</span>
                <span className="rq-staff__note">♫</span>
                <span className="rq-staff__note">♪</span>
                <span className="rq-staff__letter">A</span>
                <span className="rq-staff__letter">B</span>
                <span className="rq-staff__letter">C</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══ WHAT'S INSIDE ═══ */}
      <RqWhatsInside />

      {/* ═══ PAGE PREVIEW CAROUSEL ═══ */}
      <section className="rq-preview section" id="preview">
        <div className="container text-center">
          <RevealSection>
            <div className="section-label">Look Inside</div>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Preview <span className="text-sage">the Storybook</span>
            </h2>
            <p className="section-subtitle">
              Real spreads from the Rhythm Quest journey
            </p>
          </RevealSection>
        </div>

        <div className="rq-preview__scroll" ref={scrollRef}>
          {bookPreviews.map((pg) => (
            <div key={pg.file} className="rq-preview__card">
              <img
                src={assetPath(`/assets/book/${pg.file}`)}
                alt={pg.label}
                loading="lazy"
              />
              <div className="rq-preview__card-label">{pg.label}</div>
            </div>
          ))}
        </div>
        <p className="rq-preview__hint">← Scroll to explore more pages →</p>
      </section>

      {/* ═══ THE SEVEN LAND QUEST MAP ═══ */}
      <RqQuestMap />

      {/* ═══ CHARACTER PARADE ═══ */}
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
      <RqOffer />

      {/* ═══ FOUNDER STORY (no fabricated proof pre-launch — see brand-voice rules) ═══ */}
      <section className="rq-testimonials section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">Why It Exists</div>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              The Songs Came First. <span className="text-gold">This Is What Came Next.</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
              A father wrote these songs for his own kids first. Then he drew this world around
              them, page by page, so the story could keep going after the last track ends.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <RqFaq />

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
              <div className="rq-cta-card__icon" aria-hidden="true">🎶</div>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                Continue the Quest Today
              </h2>
              <p className="section-subtitle" style={{ marginTop: '1rem' }}>
                66 pages. 7 Lands. 15 heroes. Seven weeks, start to finish.
                <br />
                <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>
                  Crafted by a father&apos;s heart and mother&apos;s love.
                </span>
              </p>
              <div className="rq-cta-actions">
                <RqBuyLink className="btn btn-gold">Start the Quest — $19</RqBuyLink>
                <Link to="/listen" className="btn btn-sage">Get the Free Album First</Link>
              </div>
              <div className="rq-guarantee">
                <span>🔒</span> Instant digital delivery · EPUB format · Read on any device
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default RhythmQuestSale;
