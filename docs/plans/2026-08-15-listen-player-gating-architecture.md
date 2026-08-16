# Listen vs Player Gated Media Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Cleanly separate the `/listen` landing page into a focused email capture funnel and establish `/player` as the gated destination hosting the full 19-track album player, Le Cheval music video, and printable coloring book behind the email submission wall (with the SOE globe removed completely).

**Architecture:** 
- `/listen` serves as the public-facing opt-in funnel showcasing track previews with lock icons, proof metrics, and email capture. Upon submission, users are directed to `/player`.
- `/player` is the gated member portal that verifies unlock credentials (`localStorage` or URL query params). When unlocked, it renders the full interactive 19-track player (with automatic local fallback to `tracks.json`), the Le Cheval music video, the interactive coloring book viewer, and the storybook.
- Redundant and non-essential elements (embedded player on `/listen`, SOE globe video) are removed from `/listen` and `/player`.

**Tech Stack:** React 19, Vite, React Router 7, Framer Motion, Vanilla CSS (`Listen.css`, `Player.css`, `MediaRoom.css`), Supabase Storage & local audio fallback (`audioUrl`), Beehiiv subscription forms.

---

### Task 1: Streamline `/listen` Landing Page & Funnel Redirection

**Files:**
- Modify: `web/src/pages/Listen.jsx`
- Modify: `web/src/pages/Listen.css`

**Step 1: Update `/listen` to redirect unlocked visitors to `/player`**
In `Listen.jsx`:
- On mount or query param detection (`?unlocked=true`, `?_bhref=subscribe-forms`, `?email=...`), save unlock status in `localStorage` and navigate the user to `/player?unlocked=true`.
- If already unlocked in `localStorage`, provide a prominent banner / CTA button: "🎧 Jump to Your Unlocked Player →" directing to `/player`.

**Step 2: Remove soundtrack, music video, coloring book, and SOE globe from `/listen`**
- Remove `<AudioPlayer />` and its container section.
- Remove Le Cheval video section.
- Remove Coloring book section (`#coloring`).
- Remove SOE Globe video section.
- Keep the Tracklist Preview Grid (with lock icons on cards) and the Opt-In card with `BeehiivSubscribeForm`.

**Step 3: Verify build and routing for `/listen`**
- Run `npm run build` inside `web/` to confirm zero lint or compilation errors.

---

### Task 2: Enhance `/player` with Gating Check, Resilient Audio, and Gated Media Sections

**Files:**
- Modify: `web/src/pages/Player.jsx`
- Create: `web/src/pages/Player.css`

**Step 1: Implement Access Gate & Unlock Flow in `Player.jsx`**
- Check unlock state on mount:
  - If URL has `?unlocked=true`, `?email=...`, `?subscriber_id=...`, `?_bhref=subscribe-forms`, persist `localStorage.setItem('soe_listen_unlocked', '1')` and unlock.
  - If locked, render an elegant Locked Player Gate with a `BeehiivSubscribeForm` and a direct link back to `/listen`.
  - If unlocked, render the full member experience.

**Step 2: Add Resilient Audio Loading (Supabase + Local Fallback)**
- In `fetchTracks`, if Supabase returns 0 tracks or throws an error (e.g. offline, missing credentials), automatically map `tracksData` from `tracks.json` with `audioUrl(track.audioFile)`. This ensures all 19 tracks always load instantly.

**Step 3: Integrate Gated Media Sections into `/player`**
- Add the Le Cheval Bilingual Music Video section below the player widget.
- Add the Printable 28-Page Coloring Book Viewer with "Print Page" and "Download PNG" functionality.
- Add the 14-Page SOE Storybook Viewer & World Art Gallery.
- Ensure the SOE Globe section is omitted completely.

**Step 4: Verify build and styling for `/player`**
- Run `npm run build` inside `web/` to verify clean build.

---

### Task 3: Clean Up Unused Imports & Deprecated Components

**Files:**
- Modify: `web/src/pages/MediaRoom.jsx` (or consolidate exports)
- Modify: `web/src/App.jsx`

**Step 1: Ensure route consistency in `App.jsx`**
- Ensure `/media` redirects to `/listen` (or `/player` when unlocked).
- Ensure `/player` route is registered under `App.jsx`.

**Step 2: Run Full Automated Verification**
- Run `npm run build` in `web/` to guarantee clean bundle generation.
- Test both `/listen` (locked state, submission, CTA) and `/player` (gated state, unlocked state, audio playback, video, coloring book) in browser.
