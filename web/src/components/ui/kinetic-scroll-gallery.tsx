import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { assetPath } from "../../utils/assetPath";
import { bookGalleryImages } from "../../data/storybookGallery";
import "./kinetic-scroll-gallery.css";

export interface GalleryItem {
  src: string;
  title: string;
  land?: string;
  caption?: string;
  isTextbook?: boolean;
}

interface KineticGridItemProps {
  item: GalleryItem | string;
  scrollVelocity: any;
}

const KineticGridItem: React.FC<KineticGridItemProps> = ({ item, scrollVelocity }) => {
  const itemObj: GalleryItem = typeof item === 'string' ? { src: item, title: 'Storybook Illustration' } : item;

  // Smooth the velocity value for a gradual skew effect
  const smoothedVelocity = useSpring(scrollVelocity, {
    mass: 0.1,
    stiffness: 80,
    damping: 40,
  });

  // Transform velocity into skew angle
  const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-14, 0, 14]);

  return (
    <motion.div
      className={`kinetic-gallery-card group ${itemObj.isTextbook ? 'kinetic-gallery-card--textbook' : ''}`}
      style={{ skewX: skew }}
    >
      <img
        src={assetPath(itemObj.src)}
        alt={itemObj.title}
        className="kinetic-gallery-img"
        style={{
          transform: "scale(1.15)" // Prevent white edges during dynamic skew
        }}
        loading="lazy"
      />

      {/* Glassmorphic Description Overlay */}
      <div className="kinetic-gallery-overlay">
        {itemObj.land && (
          <span className={`kinetic-gallery-tag ${itemObj.isTextbook ? 'kinetic-gallery-tag--textbook' : ''}`}>
            {itemObj.isTextbook ? `📖 ${itemObj.land}` : itemObj.land}
          </span>
        )}
        <h3 className="kinetic-gallery-card-title">{itemObj.title}</h3>
        {itemObj.caption && (
          <p className="kinetic-gallery-card-caption">{itemObj.caption}</p>
        )}
      </div>
    </motion.div>
  );
};

interface KineticScrollGalleryProps {
  items?: (GalleryItem | string)[];
  title?: string;
  subtitle?: string;
}

export default function KineticScrollGallery({
  items = bookGalleryImages,
  title = "The Official Companion Storybook to The Sound of Essentials",
  subtitle = "Explore the 66-page multi-sensory curriculum, 7 developmental lands, 15 heroic guides, and back-of-the-book pedagogical glossary."
}: KineticScrollGalleryProps) {
  const { scrollYProgress } = useScroll();

  const scrollYVelocity = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1000],
    { clamp: false }
  );

  return (
    <div className="kinetic-gallery-wrapper">
      <div className="kinetic-gallery-container">
        <div className="kinetic-gallery-header">
          <div className="kinetic-gallery-badge-top">
            📖 The Sound of Essentials: Rhythm Quest
          </div>
          <h1 className="kinetic-gallery-title">
            {title}
          </h1>
          <p className="kinetic-gallery-subtitle">
            {subtitle}
          </p>
        </div>

        <div className="kinetic-gallery-grid">
          {items.map((item, index) => (
            <KineticGridItem
              key={index}
              item={item}
              scrollVelocity={scrollYVelocity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
