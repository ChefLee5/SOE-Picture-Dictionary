import { useEffect, useRef } from 'react';

/**
 * BeehiivSubscribeForm — embeds Beehiiv's hosted subscribe-form widget.
 *
 * Beehiiv's embed is a third-party script that injects its own UI wherever it's
 * placed in the DOM ("inline forms render where you paste the code" per their
 * docs) — there's no plain <script> tag we can drop in JSX, so it's injected via
 * a ref'd container in an effect instead. There is no JS success callback or
 * postMessage event; the only documented success signal is a dashboard-configured
 * post-submission redirect URL (see callers that read a query param on mount).
 */
const BEEHIIV_FORM_ID = '7adc612d-4edf-4d38-9cc5-192c7f376963';

const BeehiivSubscribeForm = ({ className = '' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
        script.setAttribute('data-beehiiv-form', BEEHIIV_FORM_ID);
        container.appendChild(script);

        return () => {
            container.innerHTML = '';
        };
    }, []);

    return <div ref={containerRef} className={`beehiiv-embed ${className}`.trim()} />;
};

export default BeehiivSubscribeForm;
