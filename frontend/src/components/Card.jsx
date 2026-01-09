import React from "react";

/**
 * Reusable Card component with consistent styling
 * @param {object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 */
export default function Card({ children, className = "" }) {
    return (
        <div className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm ${className}`}>
            {children}
        </div>
    );
}
