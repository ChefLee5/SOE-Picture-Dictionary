import { supabase } from '../lib/supabase';
import { assetPath } from './assetPath';

/**
 * Album audio streams with $0.00 egress from Cloudflare R2 bucket (`soemedia`).
 * Fallback to Supabase Storage if custom host is not configured.
 */
const R2_PUBLIC_HOST = import.meta.env.VITE_R2_PUBLIC_HOST || import.meta.env.VITE_ASSET_HOST || '';

export const AUDIO_BUCKET = 'audio';

export const audioUrl = (file) => {
  if (!file) return '';
  if (/^(https?:)?\/\//.test(file)) return file;

  const normalized = file.startsWith('/') ? file : `/${file}`;
  
  if (R2_PUBLIC_HOST) {
    return `${R2_PUBLIC_HOST.replace(/\/+$/, '')}/audio${normalized}`;
  }

  // Supabase fallback
  try {
    const rawFile = file.replace(/^\/+/, '');
    const { data } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(rawFile);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  } catch (err) {
    console.warn('Audio URL fallback notice:', err);
  }

  // Local static fallback
  return assetPath(`/audio${normalized}`);
};
