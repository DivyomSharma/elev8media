'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
    isHovering: boolean;
    isClicking: boolean;
    text?: string;
}

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isClicking: false,
    });

    // Position values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the ring
    const springConfig = { damping: 25, stiffness: 400 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    // Main cursor movement handler
    const moveCursor = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        },
        [cursorX, cursorY, isVisible]
    );

    // Mouse events
    useEffect(() => {
        // Check if device has fine pointer (not touch)
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!hasFinePointer) return;

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseenter', () => setIsVisible(true));
        window.addEventListener('mouseleave', () => setIsVisible(false));

        // Track hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.dataset.cursor === 'pointer';

            setCursorState((prev) => ({ ...prev, isHovering: !!isInteractive }));
        };

        const handleMouseDown = () => setCursorState((prev) => ({ ...prev, isClicking: true }));
        const handleMouseUp = () => setCursorState((prev) => ({ ...prev, isClicking: false }));

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [moveCursor]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
        return null;
    }

    const dotSize = cursorState.isClicking ? 6 : 8;
    const ringSize = cursorState.isHovering ? 48 : 32;

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Dot (follows exactly) */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: dotSize,
                    height: dotSize,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: 'var(--color-accent-cyan)' }}
                />
            </motion.div>

            {/* Ring (follows with spring delay) */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    opacity: isVisible ? 0.6 : 0,
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className="w-full h-full rounded-full border"
                    style={{
                        borderColor: 'var(--color-accent-cyan)',
                        borderWidth: cursorState.isHovering ? 2 : 1,
                    }}
                />
            </motion.div>
        </>
    );
}

export default CustomCursor;
