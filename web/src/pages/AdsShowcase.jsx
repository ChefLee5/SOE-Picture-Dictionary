import React, { useState } from 'react';
import { assetPath } from '../utils/assetPath';
import './AdsShowcase.css';

const ADS_DATA = [
  {
    id: 'ad01',
    name: 'Ad 01 — Before / After Bridge',
    delta: 'Δ1: Screen vs. Sensory',
    audience: 'Homeschool & Screen-Free Parents',
    image: '/assets/marketing/meta-ads/ad01_the_enemy_before_after.jpg',
    primaryText: `Tired of kids' content that feels like junk food for the developing brain?

The flashing neon cuts and hyperactive loops are engineered to hook eyes — not nurture minds.

The Sound of Essentials: Rhythm Quest is the anti-Cocomelon. 19 calm, acoustic songs that teach phonics, counting, science, and emotional regulation.

🎵 Stream the full 19-track album 100% free today.`,
    headline: 'Screen Time You Won\'t Feel Bad About',
    description: '100% Free • No Credit Card',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta1&utm_content=ad01_before_after',
  },
  {
    id: 'ad02',
    name: 'Ad 02 — What They Took',
    delta: 'Δ2: Testing vs. Arts',
    audience: 'Disillusioned School Parents & Educators',
    image: '/assets/marketing/meta-ads/ad02_what_they_took.jpg',
    primaryText: `They called music "non-essential" because it wasn't on the standardized test.

So a father sat down and built what the schools took away.

19 songs. 7 developmental lands. 15 hero mentors. A complete early learning curriculum where music and literacy are the exact same lesson.

🎧 Built for the developing brain, not the algorithm. Start free.`,
    headline: 'When Schools Cut Music We Built This',
    description: '19 Tracks • 7 Lands • Free',
    cta: 'LEARN_MORE',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta2&utm_content=ad02_what_they_took',
  },
  {
    id: 'ad03',
    name: 'Ad 03 — The Other Side',
    delta: 'Δ5: Consumption vs. Quest',
    audience: 'Parents Seeking Structured Phonics',
    image: '/assets/marketing/meta-ads/ad03_the_other_side_harmonia.jpg',
    primaryText: `Most kids' media wants your child staring. Rhythm Quest wants your child singing and moving.

Turn morning car rides and quiet time into an 8-week learning quest.

Language, math, science, and somatic movement wrapped in warm orchestral melodies. Free album + coloring pages.`,
    headline: 'Replace Junk Content With This',
    description: '5 Developmental Domains',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta5&utm_content=ad03_the_other_side',
  },
  {
    id: 'ad04',
    name: 'Ad 04 — The Name Tells You Everything',
    delta: 'Δ4: Institution vs. Sanctuary',
    audience: 'Brand Discovery & Early Childhood',
    image: '/assets/marketing/meta-ads/ad04_the_name_seriphia.jpg',
    primaryText: `Why is it called The Sound of Essentials? Because early rhythm is not an elective.

It’s the neurological foundation of how children decode words, understand patterns, and regulate emotions.

Join 1,000+ families listening to the 19-track album free.`,
    headline: 'Built for Brains Not Algorithms',
    description: "A father's mission for kids",
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta4&utm_content=ad04_the_name',
  },
  {
    id: 'ad05',
    name: 'Ad 05 — The Victory Garden',
    delta: 'Δ4: Sanctuary Home',
    audience: 'Homeschooling & Mindful Families',
    image: '/assets/marketing/meta-ads/ad05_victory_garden_terrasol.jpg',
    primaryText: `You don't need a four-hour homeschool grind. You need 16 minutes of intentional rhythm.

Discover the calm, multi-sensory learning system that turns breakfast into joyful reading and counting practice.

Tap to unlock all 19 tracks free.`,
    headline: 'Your Living Room Is the Classroom',
    description: '16 mins/day • Zero burnout',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta4&utm_content=ad05_victory_garden',
  },
  {
    id: 'ad06',
    name: 'Ad 06 — The Trojan Horse',
    delta: 'Δ3: Algorithm vs. Handcrafted',
    audience: 'Active Kids (Ages 3–7)',
    image: '/assets/marketing/meta-ads/ad06_trojan_horse_vitalis.jpg',
    primaryText: `They think they’re just singing along. Their brain is mastering syllable segmentation.

Rhythm is the brain's secret backdoor to reading readiness.

Experience 19 masterfully produced tracks spanning 7 Lands. 100% free download.`,
    headline: 'Free Music That Teaches Kids',
    description: 'Phonics Math & Science',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_delta3&utm_content=ad06_trojan_horse',
  },
  {
    id: 'ad07',
    name: 'Ad 07 — Numeria Rhythm Math',
    delta: 'Δ2: Testing vs. Arts (STEM)',
    audience: 'Early Educators & STEM Parents',
    image: '/assets/marketing/meta-ads/ad07_numeria_counting_stem.jpg',
    primaryText: `What if counting felt like a quest?

Built around 7 magical lands, The Sound of Essentials gives children a multi-sensory way to master 1–20 counting, geometry, and spatial reasoning through rhythm.

19 songs. Zero screen fatigue. Free today.`,
    headline: 'Rhythm Math That Clicks',
    description: 'Ages 2–7 • Free Album',
    cta: 'LEARN_MORE',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_numeria&utm_content=ad07_numeria_math',
  },
  {
    id: 'ad08',
    name: 'Ad 08 — The Quest Book Hero',
    delta: 'Direct Gate 1 Offer',
    audience: 'High-Intent Free Curriculum Seekers',
    image: '/assets/marketing/meta-ads/ad08_official_quest_book_hero.jpg',
    primaryText: `Unlock all 19 tracks of the Deluxe Rhythm Quest album + printable coloring sheets for free.

No subscription. No credit card required. Just rich, beautiful learning music for your family.

Tap below for instant access.`,
    headline: '19 Free Educational Songs + Art',
    description: 'Ages 2–7 • Instant Access',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_direct&utm_content=ad08_free_album',
  },
  {
    id: 'ad09',
    name: 'Ad 09 — Aquaria Emotional Calm',
    delta: 'Δ1: Sensory Stewardship',
    audience: 'Sensory-Sensitive & Calm Seekers',
    image: '/assets/marketing/meta-ads/ad09_aquaria_ronan_nerissa.jpg',
    primaryText: `Calm breathing exercises, sensory regulation, and emotional literacy.

Discover the serene coastal land of Aquaria where Ronan & Nerissa guide children through acoustic melodies that ground developing nervous systems.

Stream free now.`,
    headline: 'Emotional Literacy & Calm',
    description: 'Ages 2–7 • 19 Free Songs',
    cta: 'LISTEN_NOW',
    url: 'https://thesoundofessentials.com/listen?utm_source=meta&utm_medium=paid_social&utm_campaign=cold_aquaria&utm_content=ad09_aquaria_calm',
  },
  {
    id: 'ad10',
    name: 'Ad 10 — Crystal Creek Routine',
    delta: 'Gate 2 Ascension ($21)',
    audience: 'Retargeting (Album Leads)',
    image: '/assets/marketing/meta-ads/ad10_crystal_creek_routine.jpg',
    primaryText: `Love the 19 free songs? Bring them to life with the 8-Week Rhythm Ready Workbook.

40 days of open-and-go morning lessons in phonics, math, science, and somatic movement.

Just $21 for the complete digital curriculum (about 52¢ a day). 30-day guarantee.`,
    headline: 'The 16-Minute Daily Workbook ($21)',
    description: '40 Days • Grades K–3',
    cta: 'SHOP_NOW',
    url: 'https://thesoundofessentials.com/rhythm-ready?utm_source=meta&utm_medium=paid_social&utm_campaign=retarget_warm&utm_content=ad10_crystal_creek',
  },
];

const AdsShowcase = () => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyText = (ad) => {
    const text = `${ad.primaryText}\n\nHeadline: ${ad.headline}\nDescription: ${ad.description}\nLink: ${ad.url}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ad.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="ads-showcase-page">
      <div className="container">
        <header className="ads-showcase-header">
          <div className="ads-showcase-badge">🚀 Meta Ads Deployment Matrix</div>
          <h1 className="section-title">The Sound of Essentials — Ad Creative Engine</h1>
          <p className="section-subtitle">
            10 production-ready ad units mapped to the 5 Cultural Deltas and canonical 2D storybook style.
          </p>
        </header>

        <div className="ads-feed-grid">
          {ADS_DATA.map((ad) => (
            <div key={ad.id} className="meta-ad-card">
              {/* Meta Card Header */}
              <div className="meta-ad-header">
                <img
                  src={assetPath('/assets/branding/soe-favicon.png')}
                  alt="SOE"
                  className="meta-ad-avatar"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="meta-ad-page-info">
                  <div className="meta-ad-page-name">
                    The Sound of Essentials <span className="meta-verified">✓</span>
                  </div>
                  <div className="meta-ad-sponsored">Sponsored • 🌐</div>
                </div>
                <div className="meta-ad-tag">{ad.delta}</div>
              </div>

              {/* Primary Text */}
              <div className="meta-ad-body">
                <p className="meta-ad-text">{ad.primaryText}</p>
              </div>

              {/* Ad Image Visual */}
              <div className="meta-ad-image-wrap">
                <img
                  src={assetPath(ad.image)}
                  alt={ad.headline}
                  className="meta-ad-image"
                />
              </div>

              {/* Bottom Link Bar */}
              <div className="meta-ad-bottom-bar">
                <div className="meta-ad-link-info">
                  <span className="meta-ad-display-url">THESOUNDOFESSENTIALS.COM</span>
                  <div className="meta-ad-headline">{ad.headline}</div>
                  <div className="meta-ad-desc">{ad.description}</div>
                </div>
                <a
                  href={ad.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-ad-cta-btn"
                >
                  {ad.cta.replace('_', ' ')}
                </a>
              </div>

              {/* Meta Card Footer Tool */}
              <div className="meta-card-actions">
                <span className="meta-ad-target-pill">🎯 {ad.audience}</span>
                <button
                  className="meta-copy-btn"
                  onClick={() => handleCopyText(ad)}
                >
                  {copiedId === ad.id ? '✓ Copied' : '📋 Copy Copy & UTM Link'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdsShowcase;
