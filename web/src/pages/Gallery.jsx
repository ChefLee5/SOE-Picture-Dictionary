import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import KineticScrollGallery from '@/components/ui/kinetic-scroll-gallery';

export default function Gallery() {
  useEffect(() => {
    document.title = 'Storybook & Curriculum Gallery — The Sound of Essentials';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="gallery-page" 
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        background: 'radial-gradient(ellipse at 50% 0%, #FFF3E0 0%, #FFF8F0 45%, #FFFDF9 100%)',
        color: 'var(--color-text-primary, #E65100)'
      }}
    >
      {/* Floating Back Navigation Bar */}
      <div 
        style={{
          position: 'sticky',
          top: '1rem',
          zIndex: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0.75rem 1.5rem',
        }}
      >
        <Link 
          to="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.4rem',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '50px',
            color: '#FF6F00',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 800,
            border: '2px solid rgba(255, 111, 0, 0.25)',
            boxShadow: '0 8px 24px rgba(255, 111, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FF6F00';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 111, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)';
            e.currentTarget.style.color = '#FF6F00';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 111, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)';
          }}
        >
          <span>←</span> Back to Homepage
        </Link>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#D84315',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(12px)',
            padding: '0.5rem 1.25rem',
            borderRadius: '50px',
            border: '2px solid rgba(255, 179, 0, 0.4)',
            boxShadow: '0 4px 16px rgba(255, 179, 0, 0.15)',
          }}
        >
          <span>✨</span> Interactive Kinetic Gallery
        </div>
      </div>

      {/* Kinetic Scroll Gallery Component */}
      <KineticScrollGallery />
    </div>
  );
}
