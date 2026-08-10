import { supabase } from '../lib/supabase';

// Album audio lives in Supabase Storage. `web/public/audio/` exists but is empty, so any
// assetPath('/audio/...') call site plays nothing — that is what killed the player on
// /listen after the Player.jsx migration moved only one of the four call sites.
//
// Kept as a module-level constant to match Player.jsx: the bucket name being in exactly
// one place per module is what made the 2026-08-07 outage flip-back a one-line change.
export const AUDIO_BUCKET = 'audio';

// getPublicUrl only builds a string — no network call — so callers stay synchronous and
// tracklists have no empty first paint.
export const audioUrl = (file) =>
  supabase.storage.from(AUDIO_BUCKET).getPublicUrl(file).data.publicUrl;
