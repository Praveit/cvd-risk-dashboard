'use client'

import { motion } from 'motion/react'

/**
 * Skeleton loading components for the CVD Risk Dashboard
 * Provides smooth loading states matching the final UI layout
 */

// Base skeleton container
export function SkeletonCard({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`glass-card-elevated p-6 sm:p-7 ${className}`} aria-hidden="true">
      {children}
    </div>
  )
}

// Form skeleton
export function SkeletonForm() {
  return (
    <SkeletonCard>
      <div className="mb-8">
        <div className="skeleton skeleton-title mb-2" />
        <div className="skeleton skeleton-text w-1/3" />
      </div>
      <div className="space-y-5">
        {/* Field rows */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <div className="space-y-2">
              <div className="skeleton skeleton-text w-3/4 h-4" />
              <div className="skeleton h-12 w-full" />
            </div>
            <div className="space-y-2">
              <div className="skeleton skeleton-text w-3/4 h-4" />
              <div className="skeleton h-12 w-full" />
            </div>
          </motion.div>
        ))}
        {/* Single field row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="space-y-2">
            <div className="skeleton skeleton-text w-1/2 h-4" />
            <div className="skeleton h-12 w-full" />
          </div>
        </motion.div>
        {/* Submit button */}
        <motion.div
          className="w-full h-14 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="skeleton h-full w-full rounded-md" />
        </motion.div>
      </div>
    </SkeletonCard>
  )
}

// Risk display skeleton
export function SkeletonRiskDisplay() {
  return (
    <SkeletonCard>
      {/* Risk category header */}
      <motion.div
        className="flex items-center gap-4 p-4 rounded-xl mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="skeleton w-3 h-3 rounded-full flex-shrink-0" />
        <div>
          <div className="skeleton skeleton-text w-2/3 h-4 mb-1" />
          <div className="skeleton skeleton-text w-1/2 h-6" />
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="h-64 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="skeleton h-full w-full" />
      </motion.div>

      {/* Timeline cards */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="text-center p-4 sm:p-5 glass-card-subtle"
          >
            <div className="skeleton skeleton-text w-3/4 h-3 mx-auto mb-2" />
            <div className="skeleton w-1/2 h-8 mx-auto" />
          </motion.div>
        ))}
      </motion.div>

      {/* Risk factors list */}
      <motion.div
        className="p-4 rounded-xl mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="skeleton skeleton-text w-1/3 h-4 mb-3" />
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.04 }}
            >
              <div className="skeleton w-2 h-2 rounded-full flex-shrink-0" />
              <div className="skeleton skeleton-text flex-1 h-4" />
              <div className="skeleton skeleton-text w-20 h-4 text-right" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="skeleton skeleton-text w-1/3 h-4 mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="skeleton skeleton-text h-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
    </SkeletonCard>
  )
}

// Explanation panel skeleton
export function SkeletonExplanation() {
  return (
    <SkeletonCard>
      <div className="mb-5">
        <div className="skeleton skeleton-title mb-3" />
        <div className="skeleton skeleton-text w-full h-4 mb-2" />
        <div className="skeleton skeleton-text w-3/4 h-4" />
      </div>

      {/* Chart */}
      <motion.div
        className="h-72 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="skeleton h-full w-full" />
      </motion.div>

      {/* Risk factors */}
      <motion.div
        className="p-4 rounded-xl mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="skeleton skeleton-text w-1/2 h-4 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.04 }}
            >
              <div className="skeleton w-2 h-2 rounded-full flex-shrink-0 mt-1.5" />
              <div className="flex-1 space-y-1">
                <div className="skeleton skeleton-text w-1/3 h-4" />
                <div className="skeleton skeleton-text w-3/4 h-3" />
              </div>
              <div className="skeleton skeleton-text w-20 h-3 text-right" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Protective factors */}
      <motion.div
        className="p-4 rounded-xl mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="skeleton skeleton-text w-1/2 h-4 mb-3" />
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.04 }}
            >
              <div className="skeleton w-2 h-2 rounded-full flex-shrink-0 mt-1.5" />
              <div className="flex-1 space-y-1">
                <div className="skeleton skeleton-text w-1/3 h-4" />
                <div className="skeleton skeleton-text w-3/4 h-3" />
              </div>
              <div className="skeleton skeleton-text w-20 h-3 text-right" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interpretation */}
      <motion.div
        className="p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="skeleton skeleton-text w-1/3 h-4 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="skeleton skeleton-text h-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
    </SkeletonCard>
  )
}