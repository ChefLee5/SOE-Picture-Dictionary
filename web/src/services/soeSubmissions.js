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
  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!['interest', 'partnership'].includes(kind)) {
    throw new Error('Unsupported submission kind.');
  }
  if (!normalizedName || normalizedName.length > 120) {
    throw new Error('Please enter your name.');
  }
  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

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
