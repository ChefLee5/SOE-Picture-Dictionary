import { supabase } from '../lib/supabase';
import { assetPath } from './assetPath';

export const AUDIO_BUCKET = 'audio';

/**
 * Generates the public streaming URL for an album track.
 * Resolves from Supabase Storage (`audio` bucket) where all 19 tracks are hosted,
 * with graceful local asset fallback.
 */
export const audioUrl = (file) => {
  if (!file) return '';
  if (/^(https?:)?\/\//.test(file)) return file;

  const rawFile = file.replace(/^\/+/, '');
  const normalized = file.startsWith('/') ? file : `/${file}`;

  // Supabase Storage (production audio host)
  try {
    const { data } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(rawFile);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  } catch (err) {
    console.warn('Audio URL Supabase notice:', err);
  }

  // Local static fallback
  return assetPath(`/audio${normalized}`);
};

