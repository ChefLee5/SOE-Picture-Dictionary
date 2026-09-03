import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const [visible, setVisible] = useState(false);

    // Scroll to anchor or top on route/hash change
    useEffect(() => {
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                return;
            }
            const timer = setTimeout(() => {
                const retryTarget = document.querySelector(hash);
                if (retryTarget) {
                    retryTarget.scrollIntoView({ behavior: 'smooth' });
                }
            }, 150);
            return () => clearTimeout(timer);
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    // Show button after 300px scroll
    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            title="Back to top"
        >
            ↑
        </button>
    );
};

export default ScrollToTop;
