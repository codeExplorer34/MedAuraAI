import React, { useState, useEffect, useRef } from 'react';

/**
 * Count-up animation for numbers
 */
export function CountUp({ end, duration = 2, suffix = '', decimals = 0 }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(progress * end);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, end, duration]);

    return (
        <span ref={ref}>
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}

/**
 * Scroll-triggered reveal animation
 */
export function ScrollReveal({ children, delay = 0, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${className}`}
        >
            {children}
        </div>
    );
}

/**
 * Interactive product card with tilt effect and premium animations
 */
export function ProductCard({ title, description, color, icon, gradient }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 8, y: -x * 8 });

        // Track mouse position for spotlight
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x: mouseX, y: mouseY });
    };

    return (
        <div
            className="product-card-premium group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setTilt({ x: 0, y: 0 });
                setMousePos({ x: 50, y: 50 });
            }}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            }}
        >
            {/* Animated border glow */}
            <div className="product-card-border-glow"></div>

            {/* Spotlight effect following mouse */}
            <div
                className="product-card-spotlight"
                style={{
                    background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08), transparent)`
                }}
            ></div>

            {/* Gradient overlay on hover */}
            <div className={`product-card-gradient bg-gradient-to-br ${gradient}`} />

            {/* Feature ray effect */}
            <div className="product-card-ray"></div>

            {/* Content */}
            <div className="product-card-content">
                {/* Icon with pulse */}
                <div className="product-card-icon">
                    {icon}
                </div>

                <h3 className="product-card-title" style={{ color: color }}>
                    {title}
                </h3>
                <p className="product-card-description">
                    {description}
                </p>

                {/* Arrow that slides in */}
                <div className="product-card-arrow" style={{ color: color }}>
                    →
                </div>
            </div>
        </div>
    );
}

/**
 * Premium 3D team member card with glassmorphism and layered circles
 */
export function TeamMemberCard({ member, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showSkills, setShowSkills] = useState(false);

    const techStack = member.skills.slice(0, 3).join(' • ');

    return (
        <div
            style={{
                width: '290px',
                height: showSkills ? '420px' : '340px',
                perspective: '1000px',
                margin: '0 auto',
                transition: 'height 0.3s ease-in-out'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    height: '100%',
                    borderRadius: '40px',
                    background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(30, 64, 175) 50%, rgb(37, 99, 235) 100%)',
                    transition: 'all 0.5s ease-in-out',
                    transformStyle: 'preserve-3d',
                    transform: isHovered && !showSkills ? 'rotate3d(1, 1, 0, 25deg)' : 'rotate3d(0, 0, 0, 0deg)',
                    boxShadow: isHovered
                        ? 'rgba(6, 95, 70, 0.4) 30px 50px 25px -40px, rgba(6, 95, 70, 0.2) 0px 25px 30px 0px'
                        : 'rgba(6, 95, 70, 0) 40px 50px 25px -40px, rgba(6, 95, 70, 0.2) 0px 25px 25px -5px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Layered Circles */}
                <div style={{ position: 'absolute', right: 0, top: 0, transformStyle: 'preserve-3d' }}>
                    {[170, 140, 110, 80, 50].map((size, i) => (
                        <span
                            key={i}
                            style={{
                                display: 'block',
                                position: 'absolute',
                                width: `${size}px`,
                                height: `${size}px`,
                                borderRadius: '50%',
                                top: `${8 + i * 5}px`,
                                right: `${8 + i * 5}px`,
                                boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                                backdropFilter: i < 2 ? 'blur(5px)' : 'blur(1px)',
                                background: 'rgba(59, 130, 246, 0.25)',
                                transition: `all 0.5s ease-in-out ${i * 0.2}s`,
                                transform: isHovered && !showSkills
                                    ? `translate3d(0, 0, ${20 + i * 25}px)`
                                    : `translate3d(0, 0, ${20 + i * 20}px)`
                            }}
                        >
                            {i === 4 && (
                                <div style={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center', fontSize: '24px' }}>
                                    {member.icon}
                                </div>
                            )}
                        </span>
                    ))}
                </div>

                {/* Glass Overlay */}
                <div
                    style={{
                        transformStyle: 'preserve-3d',
                        position: 'absolute',
                        inset: '8px',
                        borderRadius: '45px',
                        borderTopRightRadius: '100%',
                        background: 'linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.35) 100%)',
                        transform: 'translate3d(0px, 0px, 25px)',
                        borderLeft: '1px solid white',
                        borderBottom: '1px solid white',
                        transition: 'all 0.5s ease-in-out'
                    }}
                />

                {/* Content */}
                <div style={{ padding: '100px 40px 0px 25px', transform: 'translate3d(0, 0, 26px)', position: 'relative' }}>
                    <span style={{ display: 'block', color: '#ffffff', fontWeight: 900, fontSize: '18px', marginBottom: '4px' }}>
                        {member.name}
                    </span>
                    <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {member.role}
                    </span>
                    <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', lineHeight: 1.4 }}>
                        {techStack}
                    </span>

                    {/* Expanded Skills Section */}
                    {showSkills && (
                        <div style={{
                            marginTop: '16px',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', textTransform: 'uppercase' }}>
                                Skills & Expertise
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {member.skills.map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        color: '#ffffff',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '10px',
                                        fontWeight: 600
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                <div style={{
                    padding: '10px 20px',
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transform: 'translate3d(0, 0, 26px)'
                }}>
                    <div style={{ display: 'flex', gap: '10px', transformStyle: 'preserve-3d' }}>
                        <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: '36px', height: '36px', padding: '8px',
                                background: 'white', borderRadius: '50%', border: 'none',
                                display: 'grid', placeContent: 'center',
                                boxShadow: 'rgba(30, 58, 138, 0.5) 0px 7px 5px -5px',
                                transition: `transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s`,
                                transform: isHovered && !showSkills ? 'translate3d(0, 0, 50px)' : 'translate3d(0, 0, 0)',
                                cursor: 'pointer'
                            }}
                        >
                            <svg viewBox="0 0 24 24" style={{ width: '16px', fill: '#1e3a8a' }}>
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: '36px', height: '36px', padding: '8px',
                                background: 'white', borderRadius: '50%', border: 'none',
                                display: 'grid', placeContent: 'center',
                                boxShadow: 'rgba(30, 58, 138, 0.5) 0px 7px 5px -5px',
                                transition: `transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s`,
                                transform: isHovered && !showSkills ? 'translate3d(0, 0, 50px)' : 'translate3d(0, 0, 0)',
                                cursor: 'pointer'
                            }}
                        >
                            <svg viewBox="0 0 24 24" style={{ width: '16px', fill: '#1e3a8a' }}>
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                    <div
                        onClick={() => setShowSkills(!showSkills)}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <span style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '11px' }}>
                            {showSkills ? 'Hide skills' : 'View skills'}
                        </span>
                        <svg style={{
                            fill: 'none',
                            stroke: '#60a5fa',
                            strokeWidth: '3px',
                            maxHeight: '12px',
                            marginLeft: '4px',
                            transform: showSkills ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }} viewBox="0 0 24 24">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Tech stack card with tooltip
 */
export function TechCard({ tech, index }) {
    return (
        <div
            className="group relative p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Icon */}
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {tech.icon}
            </div>

            {/* Name */}
            <div className="font-semibold text-white mb-1">{tech.name}</div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {tech.description}
            </div>

            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
        </div>
    );
}

/**
 * Value card with gradient background
 */
export function ValueCard({ value, index }) {
    return (
        <div
            className="relative p-4 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

            {/* Content */}
            <div className="relative z-10">
                <div className="text-2xl mb-2">
                    {value.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                    {value.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                    {value.description}
                </p>
            </div>
        </div>
    );
}

/**
 * Testimonial carousel
 */
export function TestimonialCarousel({ testimonials }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ${i === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                        }`}
                >
                    <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 h-full flex flex-col justify-center">
                        <p className="text-xl text-slate-300 italic mb-6">
                            "{testimonial.quote}"
                        </p>
                        <div>
                            <div className="font-semibold text-white">{testimonial.author}</div>
                            <div className="text-sm text-sky-400">{testimonial.role}</div>
                            <div className="text-xs text-slate-500">{testimonial.hospital}</div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-sky-500 w-8' : 'bg-slate-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Timeline milestone
 */
export function TimelineMilestone({ milestone, index, isLast }) {
    const isEven = index % 2 === 0;

    return (
        <div
            className={`relative flex items-center mb-12 animate-fade-in-up ${isEven ? 'flex-row' : 'flex-row-reverse'
                } ${isLast ? 'mb-0' : ''}`}
            style={{ animationDelay: `${index * 200}ms` }}
        >
            {/* Content */}
            <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all">
                    <div className="text-3xl mb-2">{milestone.icon}</div>
                    <div className="text-2xl font-bold text-sky-400 mb-2">{milestone.year}</div>
                    <h4 className="text-xl font-semibold text-white mb-2">{milestone.title}</h4>
                    <p className="text-slate-400">{milestone.description}</p>
                </div>
            </div>

            {/* Spacer */}
            <div className="w-2/12" />

            {/* Center dot */}
            <div className="absolute left-1/2 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-950 -translate-x-1/2 animate-pulse-slow" />
        </div>
    );
}
