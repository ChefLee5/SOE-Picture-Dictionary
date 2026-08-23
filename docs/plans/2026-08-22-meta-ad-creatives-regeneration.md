# Meta Ad Creatives Regeneration & Market-Ready Asset Pipeline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deconstruct the prototype reference mocks in `C:\Users\ldmur\Downloads\The Sound of Essentials Image Assets\Meta ad mocks` and systematically generate, validate, and assemble market-ready, high-resolution Meta ad visuals adhering strictly to the July 2026 Bright & Playful canonical design system and character model sheets.

**Architecture:** 5-stage production pipeline: (1) Reference Audit & Weakness Diagnosis → (2) Canonical Prompt Engineering Matrix with Character Consistency Anchors → (3) Multi-Format Image Generation (1:1 Feed & 9:16 Story/Reel) → (4) Visual Quality Gate & Color Calibration → (5) Meta Campaign Matrix & Ad Manifest Binding.

**Tech Stack:** Gemini Image Generation Tool / Fal.ai / AI Canvas, Python Pillow / Sharp for image pipeline validation, Meta Ads Manager CSV export.

---

## Task 1: Reference Mock Deconstruction & Style Diagnosis Audit

**Files:**
- Create: `The-Sound-of-Essentials-Website/docs/meta_ad_reference_audit.md`

**Step 1: Write the audit file structure**
Document the exact composition, focal subject, emotional hook, Cultural Delta alignment, and specific visual flaws to fix for all 14 mock references in `Meta ad mocks`.

**Step 2: Run verification script**
Run a Python script to verify all 16 reference image files exist and record their exact dimensions, aspect ratios, and file sizes.

**Step 3: Define the Fix / Refinement Mandates per Asset:**
- `Ad7_Before_After_Bridge.png` → Fix: Replace muddy split screen with a clean side-by-side: left side is a muted, glazed child staring at an algorithm tablet; right side is warm, golden, radiant child singing with Kenji & Amara in vibrant 3D Pixar style.
- `Ad2_What_They_Took.png` → Fix: Replace dark empty room with an evocative, cinematic classroom where musical instruments are packed away in gray boxes, while golden musical staves emerge from a glowing Rhythm Quest book held by Seriphia.
- `Ad4_The_Other_Side.png` → Fix: Replace generic cartoon faces with canonical Kenji (orange hoodie + blue headband) and Aiko (green dress + orange striped tights) exploring Harmonia.
- `Ad5_The_Name.png` → Fix: High-fashion regal Seriphia (golden-brown skin, gold-rimmed wire glasses, thin gold halo, cream/ivory embroidered gown) holding the open glowing tome.
- `Ad6_Victory_Garden.png` → Fix: Lush, sunlight-drenched sanctuary living room blending into Terrasol greenery with Silas and Vesta planting alphabet seeds.
- `Ad9_Trojan_Horse.png` → Fix: Dynamic action shot of Felix (red jersey) and Amara (yellow tank + dreadlocks with gold cuffs) leaping over rhythm blocks.
- `Blank Podium SOE Presser.png` → Fix: Photorealistic cinematic press room podium with custom SOE microphone flags and cream `#FFF8F0` backdrop with subtle gold emblem.
- `SOE_on_table.jpeg` → Fix: Ultra-photorealistic morning tabletop scene (real ceramic mug with morning light, physical printed 8-week workbook open to Day 1, colored pencils, natural oak wood grain).
- `Horses_Interlude_4.jpeg` → Fix: Dreamy, atmospheric watercolor-3D fusion of Ronan and Nerissa with a graceful white horse in the lavender fields of Luminosity.
- `Free_Music_.jpeg` → Fix: High-gloss 3D render of the Deluxe 19-track album box with iridescent gold vinyl record and character stickers.

---

## Task 2: Master Prompt Engineering Matrix (14 Market-Ready Visuals)

**Files:**
- Create: `The-Sound-of-Essentials-Website/docs/meta_ad_prompt_library_v2.md`

**Step 1: Write master style tokens**
Define the universal style wrapper applied to all prompts:
`Style: 3D stylized digital animation, Pixar and DreamWorks feature quality, warm volumetric sunlight, cream #FFF8F0 palette, vibrant orange #FF6F00 and gold accents, tactile felt and paper textures, hyper-detailed character expressions, 8k resolution, cinematic depth of field, f/2.8 lens, photorealistic subsurface scattering, no warped limbs, no distorted faces, no text artifacts.`

**Step 2: Write exact prompt for Ad 01 (Before/After Screen vs Sensory)**
```
A split-screen composition contrasting two childhood moments. On the left: a dim, cool-toned room where a 5-year-old child sits slumped, mesmerized by a glaring neon tablet screen with tired eyes. On the right: a warm, sun-drenched sunroom with golden sunlight streaming through curtains, where the same happy child is actively singing and laughing with two stylized 3D animated character companions (Kenji in an orange hoodie and blue headband, Amara in a yellow athletic tank with braided hair). Musical notes and glowing sparks drift around them. 3D Pixar animation style, rich cinematic lighting, vibrant cream and orange color tones, 8k, photorealistic textures --ar 1:1
```

**Step 3: Write exact prompt for Ad 02 (What They Took / Lost Music)**
```
A cinematic, emotional scene set in a sunlit elementary classroom. In the foreground, musical instruments and sheet music rest quietly in brown packing boxes. In the center, Seriphia (a regal, warm-smiling Black woman with curly dark-brown hair, thin gold-rimmed glasses, a subtle glowing golden halo ring, and an ivory gown with gold embroidery) opens a magical glowing storybook. Glowing golden ribbons of musical staves and colorful notes spiral out of the book into the room. 3D Pixar feature film lighting, high contrast, warm emotional atmosphere, 8k resolution --ar 1:1
```

**Step 4: Write exact prompt for Ad 05 (Sanctuary Home / Victory Garden)**
```
A cozy, sunlit family living room with indoor plants, wooden floors, and floor cushions. A young mother and her 5-year-old daughter are seated together on a cream rug, smiling joyfully as they tap rhythm sticks onto an open colorful learning workbook. Around them, subtle 3D animated characters (Silas in a safari vest and Vesta in a green botanical tunic) playfully emerge from the surrounding green plants, holding glowing alphabet and number fruits. Warm morning sunshine, organic and peaceful atmosphere, bright and playful design aesthetic, 8k render --ar 1:1
```

**Step 5: Write exact prompt for Ad 08 (Tabletop Physical Sanctuary)**
```
A photorealistic, high-end editorial overhead angle shot of a clean breakfast table bathed in soft morning window light. In the center lies the physical printed 'The Sound of Essentials: Rhythm Ready Workbook' open to Day 1, showing crisp illustrated phonics and counting blocks. Beside the book are two sharpened colored pencils, a ceramic mug of warm tea on a wooden saucer, and a pair of colorful kids' headphones. Clean aesthetic, cream and honey wood tones, shallow depth of field, magazine-quality product photography, 8k --ar 1:1
```

**Step 6: Write remaining 10 prompts across all 14 angles**

---

## Task 3: Image Generation Pipeline & File Generation

**Files:**
- Create: `The-Sound-of-Essentials-Website/web/public/assets/marketing/meta-ads/` (directory)
- Script: `The-Sound-of-Essentials-Website/scripts/generate_meta_ads.py`

**Step 1: Create destination assets folder**
Create `web/public/assets/marketing/meta-ads/`.

**Step 2: Execute generation for Core Wave 1 Creatives**
Generate 1:1 square assets for Meta Feed and 9:16 vertical assets for Meta Stories:
- `ad01_before_after_v2.png`
- `ad02_what_they_took_v2.png`
- `ad03_the_other_side_v2.png`
- `ad04_the_name_v2.png`
- `ad05_victory_garden_v2.png`
- `ad06_trojan_horse_v2.png`
- `ad07_press_announcement_v2.png`
- `ad08_table_workbook_v2.png`
- `ad09_le_cheval_v2.png`
- `ad10_free_album_hero_v2.png`

**Step 3: Verify image outputs**
Run validation script checking image dimensions (1080x1080 min for 1:1, 1080x1920 min for 9:16) and verifying zero corrupted files.

---

## Task 4: Visual Quality Gate & Design System Compliance

**Files:**
- Checklist: `The-Sound-of-Essentials-Website/docs/visual_quality_gate.md`

**Step 1: Validate against July 2026 Canonical Rules:**
- [ ] Seriphia visual canon: Black woman, golden-brown skin, curly dark hair, gold-rimmed glasses, thin gold halo, ivory gown.
- [ ] No retired entities present (Marcus, Elena, Sophia land, Geometria).
- [ ] Bright & Playful palette: Cream `#FFF8F0` backdrop, `#FF6F00` orange accents, Fredoka/Inter typography tokens.
- [ ] No AI limb/finger distortions or illegible background gibberish.
- [ ] Mobile feed contrast test: Subject stands out in a 3-second mobile scroll test.

---

## Task 5: Meta Campaign Matrix & Ad Manifest Binding

**Files:**
- Modify: `The-Sound-of-Essentials-Website/docs/meta_campaign_deployment_blueprint.md`
- Modify: `The-Sound-of-Essentials-Website/docs/meta_ads_import_matrix.csv`

**Step 1: Update blueprint with new market-ready asset paths**
Bind each ad set and copy angle directly to the newly generated `meta-ads/adXX_*.png` assets.

**Step 2: Update Ads Manager import CSV**
Ensure `Media File Name` and image URLs point to the finalized, market-ready asset deliverables.

**Step 3: Verification & Commit**
Run build test and commit clean assets.
