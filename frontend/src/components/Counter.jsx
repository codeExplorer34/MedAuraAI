import { useEffect, useState, useRef } from 'react';
import './Counter.css';

function Digit({ place, value, height, digitStyle }) {
    const [displayValue, setDisplayValue] = useState(0);
    const prevValueRef = useRef(0);

    useEffect(() => {
        const targetValue = Math.floor(value / place) % 10;
        const startValue = prevValueRef.current;
        const startTime = Date.now();
        const duration = 800;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
            setDisplayValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(targetValue);
                prevValueRef.current = targetValue;
            }
        };

        animate();
    }, [value, place]);

    const offset = displayValue * height;

    return (
        <div className="counter-digit" style={{ height, ...digitStyle }}>
            <div
                className="counter-numbers"
                style={{
                    transform: `translateY(-${offset}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
                    <div
                        key={i}
                        className="counter-number"
                        style={{ height }}
                    >
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Counter({
    value,
    fontSize = 100,
    padding = 0,
    places = [100, 10, 1],
    gap = 8,
    borderRadius = 4,
    horizontalPadding = 8,
    textColor = 'white',
    fontWeight = 'bold',
    containerStyle,
    counterStyle,
    digitStyle,
    gradientHeight = 16,
    gradientFrom = 'black',
    gradientTo = 'transparent',
    topGradientStyle,
    bottomGradientStyle
}) {
    const height = fontSize + padding;
    const defaultCounterStyle = {
        fontSize,
        gap: gap,
        borderRadius: borderRadius,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        color: textColor,
        fontWeight: fontWeight
    };
    const defaultTopGradientStyle = {
        height: gradientHeight,
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
    };
    const defaultBottomGradientStyle = {
        height: gradientHeight,
        background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
    };

    return (
        <div className="counter-container" style={containerStyle}>
            <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
                {places.map(place => (
                    <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />
                ))}
            </div>
            <div className="gradient-container">
                <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>
                <div
                    className="bottom-gradient"
                    style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
                ></div>
            </div>
        </div>
    );
}
