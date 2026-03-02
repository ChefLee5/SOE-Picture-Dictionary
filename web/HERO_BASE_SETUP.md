# Hero Variation Generator Setup

Generate new poses, scenes, and settings for the existing 15 heroes using GitHub Issues.

## Quick Start

### 1. Request a Variation

**Issues** → **New Issue** → **"🎨 Hero Variation"**  
Pick a hero, describe the scene, choose a mood and aspect ratio.

### 2. Approve It

Add the **`approved`** label to trigger generation.

### 3. Automatic Generation

The Action will:

- Look up the hero's identity (traits, land, bio) from `heroes.json`
- Build a rich DALL-E 3 prompt combining hero + scene
- Generate the image and save to `public/assets/gallery/{hero}/`
- Update `gallery.json` and commit
- Close the issue with a confirmation

## Repository Secrets

| Secret | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | **Yes** | DALL-E 3 image generation |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions.

## Running Locally

```bash
export GITHUB_TOKEN=your_pat
export GITHUB_REPOSITORY=owner/repo
export OPENAI_API_KEY=your_key
export ISSUE_NUMBER=42

node scripts/syncHeroBase.js
```

## Gallery Structure

```
public/assets/gallery/
├── seriphia/
│   ├── seriphia_1709151234567.png
│   └── seriphia_1709152345678.png
├── kenji/
│   └── kenji_1709153456789.png
└── ...
```

Each variation is tracked in `src/data/gallery.json`.
