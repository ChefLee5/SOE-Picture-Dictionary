/**
 * SOE Unified Attribution & Analytics Engine
 * Tracks Meta Pixel (fbq), Google Analytics 4 (gtag), and Microsoft Clarity.
 * Persists UTM parameters and handles standard ecommerce & funnel events safely.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'aff'];
const UTM_STORAGE_KEY = 'soe_attribution_data';

/**
 * Captures UTM parameters from current URL and stores in sessionStorage + localStorage.
 */
export const captureUtms = () => {
  if (typeof window === 'undefined') return {};
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const captured = {};
    let hasUtm = false;

    UTM_KEYS.forEach(key => {
      const val = urlParams.get(key);
      if (val) {
        captured[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      captured.timestamp = new Date().toISOString();
      captured.landing_path = window.location.pathname;
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }

    // Fallback to stored UTMs
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.warn('[Analytics] Failed to capture UTMs:', e);
    return {};
  }
};

/**
 * Returns currently persisted UTM and referral parameters.
 */
export const getStoredUtms = () => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY) || localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Appends persisted UTM parameters to an outgoing URL (e.g. Shopify checkout or referral link).
 */
export const appendUtmsToUrl = (urlStr) => {
  if (!urlStr || typeof window === 'undefined') return urlStr;
  try {
    const utms = getStoredUtms();
    if (!utms || Object.keys(utms).length === 0) return urlStr;

    const url = new URL(urlStr, window.location.origin);
    Object.entries(utms).forEach(([k, v]) => {
      if (k !== 'timestamp' && k !== 'landing_path' && !url.searchParams.has(k)) {
        url.searchParams.set(k, v);
      }
    });
    return url.toString();
  } catch {
    return urlStr;
  }
};

/**
 * Dispatches PageView to all configured platforms.
 */
export const trackPageView = (path, title = '') => {
  if (typeof window === 'undefined') return;
  const utms = getStoredUtms();

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_title: title || document.title,
      ...utms,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }

  // Microsoft Clarity Tagging
  if (window.clarity && path) {
    window.clarity('set', 'page_path', path);
  }
};

/**
 * Dispatches Lead event (e.g. email capture on /listen).
 */
export const trackLead = ({ email = '', formName = 'gate1_listen', source = 'listen_page' } = {}) => {
  if (typeof window === 'undefined') return;
  const utms = getStoredUtms();

  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'funnel',
      event_label: formName,
      form_source: source,
      value: 1,
      ...utms,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formName,
      content_category: 'email_funnel',
      value: 0.00,
      currency: 'USD',
      ...utms,
    });
  }

  if (window.clarity) {
    window.clarity('event', 'lead_captured');
  }
};

/**
 * Dispatches ViewContent (e.g. browsing a Land, Hero, or Track).
 */
export const trackViewContent = ({ contentName, category = 'curriculum', id = '', value = 0 } = {}) => {
  if (typeof window === 'undefined') return;
  const utms = getStoredUtms();

  if (window.gtag) {
    window.gtag('event', 'view_item', {
      item_name: contentName,
      item_category: category,
      item_id: id,
      value,
      ...utms,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: category,
      content_ids: id ? [id] : [],
      value,
      currency: 'USD',
    });
  }
};

/**
 * Dispatches InitiateCheckout (e.g. clicking buy link for Workbook or Dictionary).
 */
export const trackInitiateCheckout = ({ sku = 'SOE-RQ-WORKBOOK', name = 'Rhythm Ready Workbook', price = 21.00, currency = 'USD' } = {}) => {
  if (typeof window === 'undefined') return;
  const utms = getStoredUtms();

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency,
      value: price,
      items: [{
        item_id: sku,
        item_name: name,
        price,
        quantity: 1,
      }],
      ...utms,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: name,
      content_ids: [sku],
      value: price,
      currency,
      num_items: 1,
      ...utms,
    });
  }

  if (window.clarity) {
    window.clarity('event', 'checkout_initiated');
  }
};

/**
 * Dispatches TrackPlay event in Audio Player.
 */
export const trackAudioPlay = ({ trackId, trackTitle, domain = '' } = {}) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'audio_play', {
      event_category: 'audio',
      event_label: trackTitle,
      track_id: trackId,
      domain,
    });
  }

  if (window.clarity) {
    window.clarity('event', `play_${trackId}`);
  }
};

/**
 * Dispatches Referral / Share event.
 */
export const trackReferralShare = ({ channel = 'link_copy', target = 'gift_a_land' } = {}) => {
  if (typeof window === 'undefined') return;
  const utms = getStoredUtms();

  if (window.gtag) {
    window.gtag('event', 'share', {
      method: channel,
      content_type: target,
      ...utms,
    });
  }

  if (window.fbq) {
    window.fbq('trackCustom', 'ReferralShare', {
      share_channel: channel,
      share_target: target,
    });
  }

  if (window.clarity) {
    window.clarity('event', 'referral_shared');
  }
};

export default {
  captureUtms,
  getStoredUtms,
  appendUtmsToUrl,
  trackPageView,
  trackLead,
  trackViewContent,
  trackInitiateCheckout,
  trackAudioPlay,
  trackReferralShare,
};
