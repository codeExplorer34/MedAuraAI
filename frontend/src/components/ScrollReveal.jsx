import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Wraps children and reveals them with animation when scrolled into view
 */
export function ScrollReveal({
    children,
    animation = 'fade-up', // 'fade-up', 'fade-left', 'fade-right', 'scale-up'
    delay = 0,
    threshold = 0.1,
    className = ''
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const animationClass = {
        'fade-up': 'scroll-fade-up',
        'fade-left': 'scroll-fade-left',
        'fade-right': 'scroll-fade-right',
        'scale-up': 'scroll-scale-up',
        'reveal': 'scroll-reveal'
    }[animation] || 'scroll-fade-up';

    const delayClass = delay ? `delay-${delay}` : '';

    return (
        <div
            ref={ref}
            className={`${animationClass} ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
        >
            {children}
        </div>
    );
}

/**
 * PageTransition Component
 * Wraps entire page content for smooth entry animation
 */
export function PageTransition({ children, className = '' }) {
    return (
        <div className={`page-animate-in ${className}`}>
            {children}
        </div>
    );
}

/**
 * StaggeredReveal Component
 * Reveals children one by one with staggered delay
 */
export function StaggeredReveal({ children, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-stagger ${isVisible ? 'visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;
