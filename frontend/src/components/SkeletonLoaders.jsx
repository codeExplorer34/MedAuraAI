import React from 'react';

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className = '', variant = 'rectangular' }) {
    const variantClasses = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div className={`skeleton ${variantClasses[variant]} ${className}`} />
    );
}

/**
 * Skeleton for a card layout
 */
export function SkeletonCard({ lines = 3 }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="w-12 h-12" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>

            {/* Content lines */}
            <div className="space-y-2">
                {Array.from({ length: lines }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-3"
                        style={{ width: `${85 - (i * 10)}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Skeleton for specialist card in MDT
 */
export function SkeletonSpecialistCard() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="w-12 h-12" />
                <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
            </div>

            {/* Findings */}
            <div className="p-3 bg-slate-950 rounded-lg space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
            </div>
        </div>
    );
}

/**
 * Skeleton for recommendation panel
 */
export function SkeletonRecommendation() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
            {/* Title row */}
            <div className="flex items-center gap-2">
                <Skeleton variant="circular" className="w-8 h-8" />
                <Skeleton className="h-5 w-48" />
            </div>

            {/* Content box */}
            <div className="p-3 bg-slate-950 rounded-lg space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
            </div>

            {/* Confidence bar */}
            <div className="space-y-1">
                <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 flex-1 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
        </div>
    );
}

/**
 * Skeleton for timeline events
 */
export function SkeletonTimeline({ count = 5 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    <Skeleton variant="circular" className="w-8 h-8 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * Skeleton for treatment table
 */
export function SkeletonTreatmentTable({ rows = 3 }) {
    return (
        <div className="border border-slate-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900/50 p-4 flex gap-4">
                {['Treatment', 'Match', 'Success', 'Duration', 'Cost'].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="p-4 border-t border-slate-800 flex gap-4 items-center">
                    <div className="flex-1">
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton variant="circular" className="w-12 h-6 rounded-full" />
                    <div className="w-24">
                        <Skeleton className="h-2 w-full rounded-full mb-1" />
                        <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-16 rounded" />
                </div>
            ))}
        </div>
    );
}

/**
 * Full page skeleton for ER Co-Pilot results
 */
export function SkeletonERResults() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Command Center */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <Skeleton className="h-10 w-16 mb-1" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <div className="text-center">
                            <Skeleton className="h-10 w-16 mb-1" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <SkeletonRecommendation />
                    <SkeletonRecommendation />
                </div>
                <div>
                    <SkeletonTimeline count={4} />
                </div>
            </div>
        </div>
    );
}

/**
 * Full page skeleton for MDT Review results  
 */
export function SkeletonMDTResults() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Command Center */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-8">
                <div className="flex justify-between items-center">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <Skeleton className="h-12 w-20 mb-2" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="text-center">
                            <Skeleton className="h-12 w-20 mb-2" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Recommendations */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <div className="space-y-4">
                            <SkeletonRecommendation />
                            <SkeletonRecommendation />
                        </div>
                    </div>

                    {/* Specialists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SkeletonSpecialistCard />
                        <SkeletonSpecialistCard />
                    </div>
                </div>

                {/* Timeline sidebar */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <SkeletonTimeline count={5} />
                </div>
            </div>

            {/* Treatment table */}
            <div>
                <Skeleton className="h-8 w-64 mx-auto mb-6" />
                <SkeletonTreatmentTable rows={2} />
            </div>
        </div>
    );
}
