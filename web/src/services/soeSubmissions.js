import { supabase } from '../lib/supabase';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitSoeInterest({
  kind,
  name,
  email,
  organizationName,
  message,
  sourcePath,
  honeypot = '',
}) {
  const normalizedName = name?.trim() || 'Rhythm Explorer';
  const normalizedEmail = email?.trim().toLowerCase();

  if (!['interest', 'partnership', 'newsletter'].includes(kind)) {
    throw new Error('Unsupported submission kind.');
  }
  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind,
        name: normalizedName,
        email: normalizedEmail,
        organizationName: organizationName?.trim() || null,
        message: message?.trim() || null,
        sourcePath: sourcePath?.slice(0, 500) || null,
        honeypot,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.warn('Edge submission failed, trying fallback...', e);
  }

  // Fallback to Supabase RPC if edge API is unreachable
  const { data, error } = await supabase.rpc('submit_soe_interest', {
    p_kind: kind,
    p_name: normalizedName,
    p_email: normalizedEmail,
    p_organization_name: organizationName?.trim() || null,
    p_message: message?.trim() || null,
    p_source_path: sourcePath?.slice(0, 500) || null,
    p_honeypot: honeypot,
  });

  if (error) {
    throw new Error('We could not send your message right now. Please try again.');
  }

  return data;
}
