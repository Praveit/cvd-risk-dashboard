'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { motion } from 'motion/react'
import { FEATURE_LABELS, FEATURE_DESCRIPTIONS } from '@/lib/constants'

interface ExplanationPanelProps {
  featureContributions: Record<string, number> | null
}

const CHART_RISK_COLOR = '#6d3434'
const CHART_PROTECTIVE_COLOR = '#324a5a'

export default function ExplanationPanel({ featureContributions }: ExplanationPanelProps) {
  if (!featureContributions) {
    return (
      <motion.div
        className="glass-card-elevated p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-base font-medium tracking-widest text-charcoal uppercase mb-3">
          Feature Contribution Analysis
        </h2>
        <p className="text-sm text-stone tracking-wide text-center py-10">
          Calculate risk to see how each factor contributes to the prediction
        </p>
      </motion.div>
    )
  }

  const chartData = Object.entries(featureContributions)
    .filter(([, value]) => Math.abs(value) > 0.0001)
    .map(([feature, value]) => ({
      feature: FEATURE_LABELS[feature] || feature,
      value,
      rawFeature: feature,
    }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))

  const riskFactors = chartData.filter((d) => d.value > 0)
  const protectiveFactors = chartData.filter((d) => d.value < 0)
  const topFactor = chartData[0]

  return (
    <motion.div
      className="glass-card-elevated p-6 sm:p-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      role="region"
      aria-label="Feature contribution analysis"
    >
      <h2 className="text-base font-medium tracking-widest text-charcoal uppercase mb-2">
        Feature Contribution Analysis
      </h2>

      <p className="text-sm text-stone tracking-wide mb-5 leading-relaxed">
        How each clinical parameter contributes to the 10-year CVD risk estimate. 
        Warm tones increase risk, cool tones decrease risk. Values show absolute risk change.
      </p>

      {/* Chart */}
      <motion.div
        className="h-72 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        role="img"
        aria-label="Horizontal bar chart showing feature contribution values for each clinical parameter"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e8e0d0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              stroke="#8a857e"
              fontSize={11}
              fontFamily="system-ui, sans-serif"
              tickFormatter={(v) => v > 0 ? `+${(v * 100).toFixed(2)}%` : `${(v * 100).toFixed(2)}%`}
              axisLine={{ stroke: '#d4cab8' }}
              tickLine={false}
              tick={{ fill: '#6b6560' }}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#8a857e"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              width={100}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a4a46' }}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value > 0 ? '+' : ''}${(value * 100).toFixed(2)}%`,
                'Absolute Risk Change'
              ]}
              labelFormatter={() => ''}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e8e0d0',
                background: 'rgba(250, 247, 242, 0.95)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(20, 20, 20, 0.08)',
                fontFamily: 'system-ui, sans-serif',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.value > 0 ? CHART_RISK_COLOR : CHART_PROTECTIVE_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Risk Factors Detail */}
      {riskFactors.length > 0 && (
        <motion.div
          className="p-4 bg-risk-high-bg/50 border border-risk-high/10 rounded-xl mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-risk-high mb-3 uppercase tracking-wide">
            Factors Increasing Risk
          </h3>
          <ul className="text-sm space-y-2" role="list">
            {riskFactors.map((factor, i) => (
              <motion.li
                key={factor.rawFeature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className="flex items-start gap-3 text-charcoal-soft"
              >
                <span className="w-2 h-2 bg-risk-high rounded-full flex-shrink-0 mt-1.5" aria-hidden="true" />
                <div className="flex flex-1 items-baseline gap-1.5 flex-wrap">
                  <strong>{FEATURE_LABELS[factor.rawFeature] || factor.rawFeature}</strong>
                  <span className="text-stone text-xs line-clamp-2">
                    {FEATURE_DESCRIPTIONS[factor.rawFeature]?.risk || 'Increases CVD risk'}
                  </span>
                  <span className="text-risk-high font-mono text-xs ml-auto whitespace-nowrap">
                    +{(factor.value * 100).toFixed(2)}%
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Protective Factors Detail */}
      {protectiveFactors.length > 0 && (
        <motion.div
          className="p-4 bg-protective-bg/50 border border-protective/10 rounded-xl mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-protective mb-3 uppercase tracking-wide">
            Protective Factors
          </h3>
          <ul className="text-sm space-y-2" role="list">
            {protectiveFactors.map((factor, i) => (
              <motion.li
                key={factor.rawFeature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.04 }}
                className="flex items-start gap-3 text-charcoal-soft"
              >
                <span className="w-2 h-2 bg-protective rounded-full flex-shrink-0 mt-1.5" aria-hidden="true" />
                <div className="flex flex-1 items-baseline gap-1.5 flex-wrap">
                  <strong>{FEATURE_LABELS[factor.rawFeature] || factor.rawFeature}</strong>
                  <span className="text-stone text-xs line-clamp-2">
                    {FEATURE_DESCRIPTIONS[factor.rawFeature]?.protective || 'Decreases CVD risk'}
                  </span>
                  <span className="text-protective font-mono text-xs ml-auto whitespace-nowrap">
                    {(factor.value * 100).toFixed(2)}%
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Clinical Interpretation */}
      <motion.div
        className="p-5 glass-card-subtle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-medium text-charcoal mb-3 uppercase tracking-wide">
          Clinical Interpretation
        </h3>
        <p className="text-sm text-stone leading-relaxed">
          {topFactor && (
            <>
              <strong className="text-charcoal-soft">
                {FEATURE_LABELS[topFactor.rawFeature] || topFactor.rawFeature}
              </strong>{' '}
              is the most significant contributor to this patient&apos;s CVD risk (
              {topFactor.value > 0 ? 'increasing' : 'decreasing'} absolute risk
              by {(Math.abs(topFactor.value) * 100).toFixed(2)}%).
              {topFactor.value > 0
                ? ' Consider addressing this modifiable risk factor through lifestyle changes or medical management.'
                : ' This protective factor should be maintained through continued healthy behaviors.'}
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}