import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxHero — floating background elements that respond to scroll.
 * Drop this inside any hero <header> for instant depth.
 *
 * Props:
 *   variant: 'home' | 'universe' — determines which set of floating elements to render
 */

/* ── Floating element configs ── */
const homeElements = [
    { emoji: '♪', size: 28, top: '12%', left: '8%', speed: 0.3, delay: 0, opacity: 0.30 },
    { emoji: '♫', size: 22, top: '25%', left: '85%', speed: 0.5, delay: 0.5, opacity: 0.24 },
    { emoji: '🎵', size: 32, top: '60%', left: '5%', speed: 0.2, delay: 1, opacity: 0.20 },
    { emoji: '◆', size: 16, top: '18%', left: '45%', speed: 0.4, delay: 0.3, opacity: 0.16 },
    { emoji: '○', size: 20, top: '75%', left: '90%', speed: 0.35, delay: 0.8, opacity: 0.20 },
    { emoji: '♪', size: 24, top: '40%', left: '92%', speed: 0.25, delay: 1.2, opacity: 0.24 },
    { emoji: '◇', size: 14, top: '55%', left: '20%', speed: 0.45, delay: 0.6, opacity: 0.16 },
    { emoji: '✦', size: 18, top: '8%', left: '72%', speed: 0.55, delay: 0.2, opacity: 0.20 },
    { emoji: '♫', size: 20, top: '85%', left: '35%', speed: 0.3, delay: 1.5, opacity: 0.24 },
    { emoji: '○', size: 12, top: '35%', left: '55%', speed: 0.6, delay: 0.9, opacity: 0.12 },
    { emoji: '♪', size: 18, top: '5%', left: '30%', speed: 0.32, delay: 0.15, opacity: 0.20 },
    { emoji: '✦', size: 14, top: '22%', left: '62%', speed: 0.48, delay: 0.7, opacity: 0.14 },
    { emoji: '◆', size: 20, top: '48%', left: '12%', speed: 0.28, delay: 1.1, opacity: 0.18 },
    { emoji: '♫', size: 16, top: '68%', left: '75%', speed: 0.52, delay: 0.35, opacity: 0.22 },
    { emoji: '○', size: 10, top: '90%', left: '50%', speed: 0.38, delay: 1.4, opacity: 0.12 },
    { emoji: '🎵', size: 26, top: '15%', left: '95%', speed: 0.22, delay: 0.55, opacity: 0.20 },
    { emoji: '◇', size: 18, top: '32%', left: '3%', speed: 0.42, delay: 0.85, opacity: 0.16 },
    { emoji: '♪', size: 22, top: '72%', left: '42%', speed: 0.33, delay: 1.25, opacity: 0.24 },
    { emoji: '✦', size: 12, top: '52%', left: '68%', speed: 0.58, delay: 0.4, opacity: 0.14 },
    { emoji: '◆', size: 15, top: '82%', left: '15%', speed: 0.27, delay: 1.6, opacity: 0.18 },
    { emoji: '♫', size: 24, top: '6%', left: '52%', speed: 0.44, delay: 0.25, opacity: 0.22 },
    { emoji: '○', size: 16, top: '42%', left: '78%', speed: 0.36, delay: 1.05, opacity: 0.14 },
    { emoji: '♪', size: 20, top: '28%', left: '38%', speed: 0.5, delay: 0.65, opacity: 0.20 },
    { emoji: '🎵', size: 14, top: '65%', left: '58%', speed: 0.3, delay: 1.35, opacity: 0.16 },
    { emoji: '✦', size: 22, top: '88%', left: '82%', speed: 0.4, delay: 0.45, opacity: 0.18 },
    { emoji: '◇', size: 10, top: '38%', left: '25%', speed: 0.55, delay: 1.15, opacity: 0.12 },
    { emoji: '♫', size: 18, top: '78%', left: '65%', speed: 0.32, delay: 0.75, opacity: 0.20 },
    { emoji: '○', size: 14, top: '10%', left: '18%', speed: 0.46, delay: 1.45, opacity: 0.14 },
    { emoji: '♪', size: 26, top: '58%', left: '48%', speed: 0.28, delay: 0.5, opacity: 0.22 },
    { emoji: '◆', size: 12, top: '95%', left: '72%', speed: 0.52, delay: 0.95, opacity: 0.12 },
];

const universeElements = [
    { emoji: '🌍', size: 26, top: '15%', left: '10%', speed: 0.25, delay: 0, opacity: 0.24 },
    { emoji: '✦', size: 20, top: '20%', left: '80%', speed: 0.5, delay: 0.4, opacity: 0.20 },
    { emoji: '🎵', size: 28, top: '65%', left: '6%', speed: 0.2, delay: 0.8, opacity: 0.20 },
    { emoji: '◆', size: 14, top: '30%', left: '50%', speed: 0.45, delay: 0.2, opacity: 0.16 },
    { emoji: '🗺️', size: 22, top: '70%', left: '88%', speed: 0.35, delay: 1, opacity: 0.20 },
    { emoji: '✦', size: 16, top: '10%', left: '60%', speed: 0.55, delay: 0.6, opacity: 0.16 },
    { emoji: '♪', size: 22, top: '50%', left: '90%', speed: 0.3, delay: 1.3, opacity: 0.24 },
    { emoji: '○', size: 18, top: '80%', left: '25%', speed: 0.4, delay: 0.5, opacity: 0.16 },
    { emoji: '◇', size: 12, top: '45%', left: '18%', speed: 0.6, delay: 1.1, opacity: 0.12 },
    { emoji: '✦', size: 14, top: '88%', left: '65%', speed: 0.35, delay: 0.7, opacity: 0.20 },
    { emoji: '🌍', size: 18, top: '5%', left: '35%', speed: 0.28, delay: 0.15, opacity: 0.18 },
    { emoji: '♫', size: 16, top: '25%', left: '95%', speed: 0.48, delay: 0.55, opacity: 0.20 },
    { emoji: '◆', size: 20, top: '58%', left: '15%', speed: 0.32, delay: 1.2, opacity: 0.16 },
    { emoji: '✦', size: 12, top: '72%', left: '42%', speed: 0.52, delay: 0.35, opacity: 0.14 },
    { emoji: '♪', size: 24, top: '38%', left: '72%', speed: 0.22, delay: 0.9, opacity: 0.22 },
    { emoji: '🗺️', size: 16, top: '92%', left: '8%', speed: 0.42, delay: 1.4, opacity: 0.16 },
    { emoji: '○', size: 14, top: '12%', left: '48%', speed: 0.38, delay: 0.65, opacity: 0.12 },
    { emoji: '🎵', size: 20, top: '82%', left: '55%', speed: 0.3, delay: 1.15, opacity: 0.20 },
    { emoji: '◇', size: 16, top: '42%', left: '32%', speed: 0.5, delay: 0.45, opacity: 0.14 },
    { emoji: '✦', size: 18, top: '55%', left: '78%', speed: 0.26, delay: 1.5, opacity: 0.18 },
    { emoji: '♫', size: 22, top: '8%', left: '22%', speed: 0.44, delay: 0.25, opacity: 0.22 },
    { emoji: '🌍', size: 14, top: '35%', left: '62%', speed: 0.36, delay: 1.05, opacity: 0.14 },
    { emoji: '♪', size: 18, top: '68%', left: '38%', speed: 0.5, delay: 0.75, opacity: 0.20 },
    { emoji: '◆', size: 10, top: '48%', left: '5%', speed: 0.58, delay: 1.35, opacity: 0.12 },
    { emoji: '✦', size: 24, top: '78%', left: '82%', speed: 0.3, delay: 0.5, opacity: 0.20 },
    { emoji: '○', size: 16, top: '18%', left: '15%', speed: 0.46, delay: 1.25, opacity: 0.14 },
    { emoji: '♫', size: 14, top: '62%', left: '52%', speed: 0.34, delay: 0.85, opacity: 0.16 },
    { emoji: '🎵', size: 20, top: '95%', left: '28%', speed: 0.4, delay: 0.3, opacity: 0.18 },
    { emoji: '◇', size: 18, top: '28%', left: '88%', speed: 0.52, delay: 1.45, opacity: 0.14 },
    { emoji: '✦', size: 10, top: '85%', left: '48%', speed: 0.28, delay: 0.95, opacity: 0.12 },
];

const ParallaxHero = ({ variant = 'home' }) => {
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const elements = variant === 'universe' ? universeElements : homeElements;

    return (
        <div className="parallax-hero-layer" ref={containerRef} aria-hidden="true">
            {elements.map((el, i) => (
                <span
                    key={i}
                    className="parallax-hero-layer__item"
                    style={{
                        position: 'absolute',
                        top: el.top,
                        left: el.left,
                        fontSize: `${el.size}px`,
                        opacity: el.opacity,
                        transform: `translateY(${scrollY * el.speed * -1}px) rotate(${scrollY * el.speed * 0.1}deg)`,
                        animationDelay: `${el.delay}s`,
                        willChange: 'transform',
                        transition: 'transform 0.1s linear',
                    }}
                >
                    {el.emoji}
                </span>
            ))}

            <style>{`
                .parallax-hero-layer {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .parallax-hero-layer__item {
                    display: inline-block;
                    animation: parallaxFloat 8s ease-in-out infinite;
                    filter: blur(0.5px);
                    user-select: none;
                }

                @keyframes parallaxFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
            `}</style>
        </div>
    );
};

export default ParallaxHero;
