# SOE Picture Dictionary Web App

React + Vite website for The Sound of Essentials picture dictionary and Rhythm Quest ecosystem.

## Routes

- Home
- Universe
- Heroes
- Listen
- Dictionary
- Science
- Mission
- Join
- Allies

`/characters` redirects to `/heroes` for older links.

## Project Structure

```txt
web/
|-- public/               # Static web assets requested by URL
|-- src/
|   |-- assets/           # Media imported directly by React
|   |-- components/       # Reusable UI components
|   |-- data/             # Static structured app data
|   |-- hooks/            # Custom React hooks
|   |-- i18n/             # i18next config and locale JSON
|   |-- pages/            # Route-level page components
|   |-- remotion/         # Remotion video compositions
|   |-- utils/            # Shared helper functions
|   |-- App.jsx           # Root routes
|   `-- main.jsx          # Browser entry point
|-- index.html
|-- package.json
`-- vite.config.js
```

## Asset Organization

Use `public/` for files referenced by URL. New public assets should follow this shape where practical:

```txt
public/
|-- favicon/
|-- images/
|   |-- heroes/
|   |-- lands/
|   |-- backgrounds/
|   |-- logos/
|   `-- ui/
|-- audio/
|   |-- music/
|   |-- sfx/
|   `-- voiceover/
|-- video/
|   |-- trailers/
|   `-- loops/
`-- fonts/
```

Use `src/assets/` for files imported directly by React:

```txt
src/assets/
|-- heroes/
|-- lands/
|-- logos/
|-- textures/
`-- icons/
```

### Hosted Asset Origin

The site can serve public media from a CDN or object storage bucket while keeping the original files in this repo. Mirror the contents of `public/` to the hosted origin, then set:

```bash
VITE_ASSET_HOST=https://your-asset-host.example.com
```

For example, `assetPath('/assets/marketing/quest-collage.webp')` resolves to `https://your-asset-host.example.com/assets/marketing/quest-collage.webp` when the env var is set, and falls back to the Vite base path during local development.

Keep original high-resolution PNG/JPG masters in `public/assets` when needed, but point pages at optimized WebP display files for normal browsing.

To build a small deploy bundle that omits the hosted media folders from `dist/assets`, run:

```powershell
$env:VITE_ASSET_HOST='https://your-asset-host.example.com'
npm run build:hosted-assets
```

Use `npm run build` when you want the normal all-local static build.

## Deployment

The app is currently configured for GitHub Pages under `/SOE-Picture-Dictionary/`.

- Vite base: `/SOE-Picture-Dictionary/`
- React Router basename: `/SOE-Picture-Dictionary`
- Dev URL: `http://localhost:5173/SOE-Picture-Dictionary/`

The Vite base is set in `vite.config.js`. The React Router basename is set in `src/main.jsx`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
