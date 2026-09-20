'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'motion/react'
import { RISK_CATEGORY_COLORS } from '@/lib/constants'

interface RiskResult {
  immediateRisk: number
  risk1Year: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  featureContributions: Record<string, number>
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Very High'
  recommendation: string
}

interface RiskDisplayProps {
  result: RiskResult | null
}

const CHART_COLORS = {
  low: '#3d5c35',
  moderate: '#7d662e',
  high: '#6d3434',
  veryHigh: '#4a1d1d',
}

const CHART_GRADIENTS = {
  low: { start: '#3d5c35', end: 'rgba(61, 92, 53, 0)' },
  moderate: { start: '#7d662e', end: 'rgba(125, 102, 46, 0)' },
  high: { start: '#6d3434', end: 'rgba(109, 52, 52, 0)' },
  veryHigh: { start: '#4a1d1d', end: 'rgba(74, 29, 29, 0)' },
}

export default function RiskDisplay({ result }: RiskDisplayProps) {
  if (!result) {
    return (
      <motion.div
        className="glass-card-elevated p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center py-12">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-champagne flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-stone-light"
              aria-hidden="true"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h3 className="text-base font-medium tracking-widest text-charcoal uppercase mb-2">
            Cardiovascular Risk Assessment
          </h3>
          <p className="text-sm text-stone tracking-wide max-w-xs mx-auto">
            Complete the patient form to calculate 10-year CVD risk using SCORE2
          </p>
        </div>
      </motion.div>
    )
  }

  const riskCategoryKey = result.riskCategory.toLowerCase() as keyof typeof RISK_CATEGORY_COLORS
  const categoryColors = RISK_CATEGORY_COLORS[riskCategoryKey]
  const chartColor = CHART_COLORS[riskCategoryKey]
  const chartGradient = CHART_GRADIENTS[riskCategoryKey]

  const chartData = [
    { time: 'Now', risk: result.immediateRisk * 100 },
    { time: '1 Year', risk: result.risk1Year * 100 },
    { time: '2 Years', risk: result.risk2Year * 100 },
    { time: '5 Years', risk: result.risk5Year * 100 },
    { time: '10 Years', risk: result.risk10Year * 100 },
  ]

  const featureLabels: Record<string, string> = {
    age: 'Age',
    systolicBP: 'Systolic BP',
    totalCholesterol: 'Total Cholesterol',
    hdlCholesterol: 'HDL Cholesterol',
    smoker: 'Smoking',
    sex: 'Sex',
  }

  // Get top risk factors
  const sortedFactors = Object.entries(result.featureContributions)
    .filter(([, value]) => value > 0.001)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)

  return (
    <motion.div
      className="glass-card-elevated p-6 sm:p-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      role="region"
      aria-label="Risk assessment results"
    >
      {/* Risk Category Header */}
      <motion.div
        className={`flex items-center gap-4 p-4 rounded-xl ${categoryColors.bg} border ${categoryColors.border} mb-6`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        role="status"
        aria-live="polite"
      >
        <motion.span
          className={`w-3 h-3 rounded-full ${categoryColors.dot} flex-shrink-0`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          aria-hidden="true"
        />
        <div>
          <p className="text-xs text-stone uppercase tracking-widest mb-1">
            10-Year CVD Risk Category
          </p>
          <p className={`${categoryColors.text} text-xl font-medium tracking-widest uppercase`}>
            {categoryColors.label} ({(result.risk10Year * 100).toFixed(1)}%)
          </p>
        </div>
      </motion.div>

      {/* Risk Trajectory Chart */}
      <div className="h-64 mb-6" role="img" aria-label={`Risk trajectory chart showing risk increasing from ${(result.immediateRisk * 100).toFixed(1)}% now to ${(result.risk10Year * 100).toFixed(1)}% at 10 years`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartGradient.start} stopOpacity={0.18} />
                <stop offset="95%" stopColor={chartGradient.end} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e8e0d0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#8a857e"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              tick={{ fill: '#6b6560' }}
              axisLine={{ stroke: '#d4cab8' }}
              tickLine={false}
              dy={8}
            />
            <YAxis
              stroke="#8a857e"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              tickFormatter={(v) => `${v.toFixed(0)}%`}
              domain={[0, 'auto']}
              tick={{ fill: '#6b6560' }}
              axisLine={false}
              tickLine={false}
              dx={-8}
              tickCount={5}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'CVD Risk']}
              labelFormatter={(label) => label}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e8e0d0',
                background: 'rgba(250, 247, 242, 0.95)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(20, 20, 20, 0.08)',
                fontFamily: 'system-ui, sans-serif',
              }}
              labelStyle={{
                color: '#141414',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontSize: '0.75rem',
              }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke={chartColor}
              fill="url(#riskGrad)"
              strokeWidth={2.5}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Timeline Cards */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Now', value: result.immediateRisk * 100, highlight: false },
          { label: '1 Year', value: result.risk1Year * 100, highlight: false },
          { label: '2 Years', value: result.risk2Year * 100, highlight: false },
          { label: '5 Years', value: result.risk5Year * 100, highlight: false },
          { label: '10 Years', value: result.risk10Year * 100, highlight: true },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className={`text-center p-4 sm:p-5 glass-card-subtle ${item.highlight ? 'border-gold/30 border' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
          >
            <p className={`text-xs tracking-widest uppercase mb-2 ${item.highlight ? 'text-gold' : 'text-stone'}`}>
              {item.label}
            </p>
            <p className={`text-xl sm:text-2xl font-medium tracking-wide ${item.highlight ? 'text-charcoal' : 'text-charcoal'}`}>
              {item.value.toFixed(1)}%
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Risk Factors */}
      {sortedFactors.length > 0 && (
        <motion.div
          className="p-4 bg-risk-high-bg/50 border border-risk-high/10 rounded-xl mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-risk-high mb-3 uppercase tracking-wide">
            Key Risk Factors
          </h3>
          <ul className="text-sm space-y-2.5" role="list">
            {sortedFactors.map(([feature, value], i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-3 text-charcoal-soft"
              >
                <span className="w-2 h-2 bg-risk-high rounded-full flex-shrink-0" aria-hidden="true" />
                <span className="font-medium flex-1">
                  {featureLabels[feature] || feature}
                </span>
                <span className="text-stone font-mono text-xs text-right min-w-[5rem]">
                  +{(value * 100).toFixed(1)}%
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Clinical Recommendations */}
      <motion.div
        className="p-5 glass-card-subtle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-medium text-charcoal mb-4 uppercase tracking-wide">
          Clinical Recommendation
        </h3>
        <div className="text-sm text-stone leading-relaxed">
          <p className="font-medium text-charcoal mb-2">
            {result.recommendation}
          </p>
          <p className="text-xs text-stone-light">
            Per ESC/EAPC 2021 Guidelines. This tool supports but does not replace clinical judgment.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}