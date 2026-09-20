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
import { SkeletonChart } from './SkeletonLoader'

interface RiskResult {
  immediateRisk: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  shapImportance: { feature: string; value: number }[]
}

interface RiskDisplayProps {
  result: RiskResult | null
}

export default function RiskDisplay({ result }: RiskDisplayProps) {
  if (
    !result ||
    typeof result.immediateRisk !== 'number' ||
    isNaN(result.immediateRisk)
  ) {
    return (
      <div className="glass-card p-6">
        <div className="text-center py-10">
          <div
            className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-champagne flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
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
          <p className="text-sm text-stone tracking-wide">
            Complete the patient form to calculate CVD risk
          </p>
        </div>
      </div>
    )
  }

  // Determine risk category
  const risk10YearPct = result.risk10Year * 100
  let riskCategory = 'Low'
  let riskColorClass = 'text-risk-low'
  let riskBgClass = 'bg-risk-low-bg'
  let riskBorderClass = 'border-risk-low/20'
  let riskDotClass = 'bg-risk-low'

  if (risk10YearPct >= 20) {
    riskCategory = 'High'
    riskColorClass = 'text-risk-high'
    riskBgClass = 'bg-risk-high-bg'
    riskBorderClass = 'border-risk-high/20'
    riskDotClass = 'bg-risk-high'
  } else if (risk10YearPct >= 10) {
    riskCategory = 'Moderate'
    riskColorClass = 'text-risk-moderate'
    riskBgClass = 'bg-risk-moderate-bg'
    riskBorderClass = 'border-risk-moderate/20'
    riskDotClass = 'bg-risk-moderate'
  }

  // SHAP data
  const shapImportance = result.shapImportance || []
  const topRiskFactors = shapImportance
    .filter((f) => f.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)

  const topProtectiveFactors = shapImportance
    .filter((f) => f.value < 0)
    .sort((a, b) => a.value - b.value)
    .slice(0, 2)

  const featureLabels: Record<string, string> = {
    ap_hi: 'Systolic BP',
    ap_lo: 'Diastolic BP',
    cholesterol: 'Cholesterol',
    gluc: 'Glucose',
    age: 'Age',
    weight: 'BMI',
    smoke: 'Smoking',
    alco: 'Alcohol',
    active: 'Physical Activity',
  }

  const chartData = [
    { time: 'Immediate', risk: result.immediateRisk * 100 },
    { time: '2 Years', risk: result.risk2Year * 100 },
    { time: '5 Years', risk: result.risk5Year * 100 },
    { time: '10 Years', risk: result.risk10Year * 100 },
  ]

  return (
    <div className="glass-card p-6" role="region" aria-label="Risk assessment results">
      {/* Risk Category Header */}
      <div
        className={`flex items-center gap-3 p-4 rounded-luxury ${riskBgClass} border ${riskBorderClass} mb-6`}
        role="status"
        aria-live="polite"
      >
        <span className={`w-3 h-3 rounded-full ${riskDotClass} flex-shrink-0`} aria-hidden="true" />
        <div>
          <p className="text-xs text-stone uppercase tracking-widest mb-0.5">
            10-Year CVD Risk Category
          </p>
          <p className={`text-xl font-medium tracking-widest uppercase ${riskColorClass}`}>
            {riskCategory} Risk ({risk10YearPct.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Risk Trajectory Chart */}
      <div className="h-64 mb-6" role="img" aria-label={`Risk trajectory chart showing risk increasing from ${(result.immediateRisk * 100).toFixed(1)}% immediately to ${risk10YearPct.toFixed(1)}% at 10 years`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7a3b3b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7a3b3b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e8e0d0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#8a857e"
              fontSize={12}
              tick={{ fill: '#6b6560' }}
              axisLine={{ stroke: '#d8cfc0' }}
              tickLine={false}
            />
            <YAxis
              stroke="#8a857e"
              fontSize={12}
              tickFormatter={(v) => `${v.toFixed(0)}%`}
              domain={[0, 'auto']}
              tick={{ fill: '#6b6560' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'CVD Risk']}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e8e0d0',
                background: 'rgba(245, 240, 232, 0.9)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#7a3b3b"
              fill="url(#riskGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Timeline Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 sm:p-4 glass-card-subtle">
          <p className="text-xs text-stone uppercase tracking-widest mb-1">Immediate</p>
          <p className="text-xl sm:text-2xl font-medium tracking-wide text-charcoal">
            {(result.immediateRisk * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 sm:p-4 glass-card-subtle">
          <p className="text-xs text-stone uppercase tracking-widest mb-1">2-Year</p>
          <p className="text-xl sm:text-2xl font-medium tracking-wide text-charcoal">
            {(result.risk2Year * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 sm:p-4 glass-card-subtle">
          <p className="text-xs text-stone uppercase tracking-widest mb-1">5-Year</p>
          <p className="text-xl sm:text-2xl font-medium tracking-wide text-charcoal">
            {(result.risk5Year * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 sm:p-4 glass-card-subtle border-gold/20 border">
          <p className="text-xs text-gold uppercase tracking-widest mb-1">10-Year</p>
          <p className="text-xl sm:text-2xl font-medium tracking-wide text-charcoal">
            {(result.risk10Year * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Risk Factors */}
      {topRiskFactors.length > 0 && (
        <div className="p-4 bg-risk-high-bg/50 border border-risk-high/10 rounded-luxury mb-4">
          <h3 className="text-sm font-medium text-risk-high mb-3 uppercase tracking-wide">
            Key Risk Factors
          </h3>
          <ul className="text-sm space-y-2" role="list">
            {topRiskFactors.map((factor, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal-soft">
                <span
                  className="w-1.5 h-1.5 bg-risk-high rounded-full flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium">
                  {featureLabels[factor.feature] || factor.feature}
                </span>
                <span className="text-stone font-mono text-xs ml-auto">
                  +{factor.value.toFixed(4)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topProtectiveFactors.length > 0 && (
        <div className="p-4 bg-protective-bg/50 border border-protective/10 rounded-luxury mb-4">
          <h3 className="text-sm font-medium text-protective mb-3 uppercase tracking-wide">
            Protective Factors
          </h3>
          <ul className="text-sm space-y-2" role="list">
            {topProtectiveFactors.map((factor, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal-soft">
                <span
                  className="w-1.5 h-1.5 bg-protective rounded-full flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium">
                  {featureLabels[factor.feature] || factor.feature}
                </span>
                <span className="text-stone font-mono text-xs ml-auto">
                  {factor.value.toFixed(4)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clinical Recommendations */}
      <div className="p-4 glass-card-subtle">
        <h3 className="text-sm font-medium text-charcoal mb-3 uppercase tracking-wide">
          Clinical Recommendations
        </h3>
        <div className="text-sm text-stone space-y-3">
          {topRiskFactors.length > 0 && (
            <div>
              <p className="font-medium text-risk-high mb-1.5 text-xs uppercase tracking-wide">
                Address modifiable risk factors:
              </p>
              <ul className="space-y-1.5 ml-4" role="list">
                {topRiskFactors.map((factor, i) => (
                  <li key={i} className="flex gap-1.5 leading-relaxed">
                    <span className="text-stone-light select-none" aria-hidden="true">&middot;</span>
                    <span>
                      <strong className="text-charcoal-soft">
                        {featureLabels[factor.feature] || factor.feature}
                      </strong>
                      {factor.feature === 'ap_hi' &&
                        ': Target SBP < 130 mmHg through lifestyle and/or medication'}
                      {factor.feature === 'ap_lo' && ': Target DBP < 80 mmHg'}
                      {factor.feature === 'cholesterol' &&
                        ': Consider lipid-lowering therapy if indicated'}
                      {factor.feature === 'gluc' && ': Optimize glycemic control'}
                      {factor.feature === 'smoke' &&
                        ': Strongly recommend smoking cessation program'}
                      {factor.feature === 'weight' &&
                        ': Weight management through diet and exercise'}
                      {factor.feature === 'alco' && ': Limit alcohol consumption'}
                      {factor.feature === 'active' &&
                        ': Increase physical activity to 150+ min/week moderate intensity'}
                      {factor.feature === 'age' &&
                        ': Age-appropriate screening and preventive care'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topProtectiveFactors.length > 0 && (
            <div>
              <p className="font-medium text-protective mb-1.5 text-xs uppercase tracking-wide">
                Maintain protective factors:
              </p>
              <ul className="space-y-1.5 ml-4" role="list">
                {topProtectiveFactors.map((factor, i) => (
                  <li key={i} className="flex gap-1.5 leading-relaxed">
                    <span className="text-stone-light select-none" aria-hidden="true">&middot;</span>
                    <span>
                      <strong className="text-charcoal-soft">
                        {featureLabels[factor.feature] || factor.feature}
                      </strong>
                      {factor.feature === 'active' &&
                        ': Continue regular physical activity'}
                      {factor.feature === 'smoke' && ': Maintain smoke-free status'}
                      {factor.feature === 'cholesterol' && ': Continue healthy diet'}
                      {factor.feature === 'ap_hi' &&
                        ': Maintain blood pressure control'}
                      {factor.feature === 'gluc' && ': Maintain normal glucose levels'}
                      {factor.feature === 'alco' && ': Continue moderate/no alcohol'}
                      {factor.feature === 'weight' && ': Maintain healthy weight'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topRiskFactors.length === 0 &&
            topProtectiveFactors.length === 0 && (
              <p className="text-stone">
                No significant modifiable risk factors identified. Continue
                healthy lifestyle.
              </p>
            )}
        </div>
      </div>
    </div>
  )
}