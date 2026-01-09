import React from "react";

/**
 * Consistent section header with accent bar
 * @param {object} props
 * @param {string} props.title - Section title
 * @param {string} [props.accentColor] - Color of the accent bar (default: sky-500)
 */
export default function SectionHeader({ title, accentColor = "bg-sky-500" }) {
    return (
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className={`w-1 h-6 ${accentColor} rounded-full`}></span>
            {title}
        </h2>
    );
}
