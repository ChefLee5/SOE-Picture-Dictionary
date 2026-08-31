/**
 * Cloudflare Pages Catch-all SPA Handler:
 * 1. Passes API requests to /api/* handlers.
 * 2. Fetches static files directly from assets.
 * 3. Rewrites non-file client routes (/universe, /characters, etc.) to /index.html with HTTP 200.
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // If path starts with /api/, pass to functions/api/*
  if (url.pathname.startsWith('/api/')) {
    return next();
  }

  // Try fetching the exact static asset
  const assetRes = await env.ASSETS.fetch(request);
  if (assetRes.status !== 404) {
    return assetRes;
  }

  // If 404 and it's an HTML/SPA route (no file extension), return index.html with 200 OK
  const isFile = url.pathname.split('/').pop().includes('.');
  if (!isFile) {
    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  }

  return assetRes;
}
