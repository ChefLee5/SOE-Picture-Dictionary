/**
 * ═══════════════════════════════════════════════════════════════
 * useAudio — Audio Hook for the Picture Dictionary
 * ═══════════════════════════════════════════════════════════════
 *
 * Uses the Web Speech API as a zero-setup audio system.
 * Production: swap in MP3s by setting `audioSrc` on each word.
 *
 * Supports:
 *   - Normal speed speech
 *   - "Slow down and say..." mode (rate 0.6) for Aquaria hard words
 * ═══════════════════════════════════════════════════════════════
 */
import { useCallback, useRef } from 'react';

export function useAudio() {
    const synthRef = useRef(window.speechSynthesis);
    const currentUtterance = useRef(null);

    /**
     * Speak a word aloud.
     * @param {string}  word     — The word to speak
     * @param {object}  options  — { slow: bool, audioSrc: string|null }
     */
    const speak = useCallback((word, options = {}) => {
        const { slow = false, audioSrc = null } = options;

        // Cancel any in-progress speech
        synthRef.current.cancel();

        // ── Strategy 1: Use provided MP3 if available ──
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            if (slow) audio.playbackRate = 0.6;
            audio.play().catch(() => {
                // Fallback to speech synthesis if audio fails
                fallbackSpeak(word, slow);
            });
            return;
        }

        // ── Strategy 2: Web Speech API ──
        fallbackSpeak(word, slow);
    }, []);

    /**
     * Internal: Speech synthesis fallback.
     */
    const fallbackSpeak = useCallback((word, slow) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = slow ? 0.6 : 0.9;   // Calm, clear pace
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        currentUtterance.current = utterance;
        synthRef.current.speak(utterance);
    }, []);

    /**
     * Stop any current speech.
     */
    const stop = useCallback(() => {
        synthRef.current.cancel();
    }, []);

    return { speak, stop };
}
