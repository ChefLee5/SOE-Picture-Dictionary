import { supabase } from '../lib/supabase';
import { assetPath } from './assetPath';

export const FULFILLMENT_BUCKET = 'fulfillment';

/**
 * Product fulfillment file mapping
 */
export const FULFILLMENT_FILES = {
  'rhythm-quest-storybook': {
    title: 'The Sound of Essentials: Rhythm Quest (66-Page Storybook)',
    filename: 'SOE_Rhythm_Quest_Storybook_2026-08.pdf',
    format: 'PDF',
    size: '19.8 MB',
    pages: 66,
    cover: '/assets/book/soe-rhythm-quest-cover.webp',
  },
  'coloring-book': {
    title: 'SOE Rhythm Quest: Printable Coloring Pages',
    filename: 'SOE_Rhythm_Quest_Coloring_Book.pdf',
    format: 'PDF',
    size: '16.5 MB',
    pages: 20,
    cover: '/assets/marketing/quest-collage.webp',
  },
  'summer-stretch-workbook': {
    title: 'SOE Rhythm Quest: Summer Stretch Workbook',
    filename: 'SOE_Summer_Stretch_Workbook_COMPLETE.pdf',
    format: 'PDF',
    size: '24.8 MB',
    pages: 80,
    cover: '/assets/marketing/summer-stretch-cover.webp',
  },
};

/**
 * Generates the download URL for a digital product.
 * Checks Supabase Storage bucket first, with a fallback to local/CDN assets.
 */
export const getDeliveryUrl = (productKey = 'rhythm-quest-storybook') => {
  const item = FULFILLMENT_FILES[productKey] || FULFILLMENT_FILES['rhythm-quest-storybook'];
  try {
    const { data } = supabase.storage.from(FULFILLMENT_BUCKET).getPublicUrl(item.filename);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  } catch {
    // Fallback if supabase client is offline
  }
  return assetPath(`/downloads/${item.filename}`);
};

/**
 * Triggers a direct browser download
 */
export const triggerBrowserDownload = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
