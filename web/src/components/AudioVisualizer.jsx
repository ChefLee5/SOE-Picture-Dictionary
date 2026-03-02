import React, { useEffect, useRef } from 'react';

/**
 * AudioVisualizer - A real-time reactive waveform component using Web Audio API and Canvas.
 * 
 * Props:
 * @param {React.RefObject} audioRef - The ref to the HTML5 <audio> element.
 * @param {boolean} isPlaying - Current play state to trigger analysis.
 * @param {string} color - The theme color for the waveform bars.
 */
const AudioVisualizer = ({ analyser, isPlaying, color = '#FF6B6B' }) => {
    const canvasRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        // Start animation loop
        if (isPlaying && analyser) {
            renderFrame();
        } else {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        }

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isPlaying, analyser]);

    const renderFrame = () => {
        const canvas = canvasRef.current;
        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationIdRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 1.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * height;
                ctx.fillStyle = color;
                const radius = 3;
                const barX = x;
                const barY = height - barHeight;

                if (barHeight > 2) {
                    ctx.beginPath();
                    ctx.roundRect(barX, barY, barWidth - 2, barHeight, radius);
                    ctx.fill();
                }
                x += barWidth;
            }
        };
        draw();
    };

    return (
        <canvas
            ref={canvasRef}
            className="audio-visualizer"
            width={120}
            height={40}
            style={{
                width: '120px',
                height: '40px',
                opacity: isPlaying ? 0.8 : 0.3,
                transition: 'opacity 0.3s ease'
            }}
        />
    );
};

export default AudioVisualizer;
