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

interface ShapImportance {
  feature: string
  value: number
}

interface ExplanationPanelProps {
  shapImportance: ShapImportance[] | null
}

const featureLabels: Record<string, string> = {
  ap_hi: 'Systolic BP',
  ap_lo: 'Diastolic BP',
  cholesterol: 'Cholesterol',
  gluc: 'Glucose',
  age: 'Age',
  weight: 'Weight',
  smoke: 'Smoking',
  alco: 'Alcohol',
  active: 'Physical Activity',
}

const featureDescriptions: Record<
  string,
  { risk: string; protective: string }
> = {
  ap_hi: {
    risk: 'Elevated systolic blood pressure significantly increases CVD risk',
    protective: 'Normal systolic blood pressure is protective',
  },
  ap_lo: {
    risk: 'Elevated diastolic blood pressure increases CVD risk',
    protective: 'Normal diastolic blood pressure is protective',
  },
  cholesterol: {
    risk: 'Elevated cholesterol contributes to atherosclerosis risk',
    protective: 'Normal cholesterol levels are protective',
  },
  gluc: {
    risk: 'Elevated glucose indicates diabetes/prediabetes risk',
    protective: 'Normal glucose levels are protective',
  },
  age: {
    risk: 'Advanced age is a non-modifiable risk factor',
    protective: 'Younger age is protective',
  },
  weight: {
    risk: 'Excess weight increases cardiovascular strain',
    protective: 'Healthy weight is protective',
  },
  smoke: {
    risk: 'Smoking is a major modifiable CVD risk factor',
    protective: 'Non-smoking status is protective',
  },
  alco: {
    risk: 'Excessive alcohol consumption increases CVD risk',
    protective: 'Moderate/no alcohol is protective',
  },
  active: {
    risk: 'Physical inactivity increases CVD risk',
    protective: 'Regular physical activity is protective',
  },
}

export default function ExplanationPanel({
  shapImportance,
}: ExplanationPanelProps) {
  const shapData = shapImportance || []

  if (!shapData || shapData.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-base font-medium tracking-widest text-charcoal uppercase mb-2">
          SHAP Feature Importance
        </h2>
        <p className="text-sm text-stone tracking-wide text-center py-8">
          Calculate risk to see feature explanations
        </p>
      </div>
    )
  }

  const chartData = shapData.map((item) => ({
    feature: featureLabels[item.feature] || item.feature,
    value: item.value,
    rawFeature: item.feature,
  }))

  const riskFactors = chartData.filter((d) => d.value > 0)
  const protectiveFactors = chartData.filter((d) => d.value < 0)
  const topFactor = chartData[0]

  // Muted colors for chart bars
  const riskBarColor = '#7a3b3b'
  const protectiveBarColor = '#3d5a6e'

  return (
    <div className="glass-card p-6" role="region" aria-label="SHAP feature importance analysis">
      <h2 className="text-base font-medium tracking-widest text-charcoal uppercase mb-2">
        SHAP Feature Importance
      </h2>

      <p className="text-sm text-stone tracking-wide mb-4 leading-relaxed">
        How each feature contributes to the risk prediction for this patient.
        Warm tones increase risk, cool tones decrease risk.
      </p>

      {/* Chart */}
      <div
        className="h-72"
        role="img"
        aria-label="Bar chart showing SHAP feature importance values for each clinical parameter"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e8e0d0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              stroke="#8a857e"
              fontSize={12}
              tickFormatter={(v) => (v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2))}
              axisLine={{ stroke: '#d8cfc0' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#8a857e"
              fontSize={11}
              width={80}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value > 0 ? '+' : ''}${(value * 100).toFixed(1)}%`,
                'Risk Impact (%)',
              ]}
              labelFormatter={() => ''}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e8e0d0',
                background: 'rgba(245, 240, 232, 0.9)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.value > 0 ? riskBarColor : protectiveBarColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Factors */}
      {riskFactors.length > 0 && (
        <div className="mt-4 p-4 bg-risk-high-bg/50 border border-risk-high/10 rounded-luxury">
          <h3 className="text-sm font-medium text-risk-high mb-2 uppercase tracking-wide">
            Risk Factors (Increase CVD Risk)
          </h3>
          <ul className="text-sm space-y-1.5" role="list">
            {riskFactors.map((factor, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-charcoal-soft"
              >
                <span
                  className="w-1.5 h-1.5 bg-risk-high rounded-full flex-shrink-0 mt-1.5"
                  aria-hidden="true"
                />
                <div className="flex flex-1 items-baseline gap-1 flex-wrap">
                  <strong>
                    {featureLabels[factor.rawFeature] || factor.rawFeature}
                  </strong>
                  <span className="text-stone text-xs">
                    {featureDescriptions[factor.rawFeature]?.risk ||
                      'Increases CVD risk'}
                  </span>
                  <span className="text-risk-high font-mono text-xs ml-auto">
                    +{(factor.value * 100).toFixed(1)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Protective Factors */}
      {protectiveFactors.length > 0 && (
        <div className="mt-4 p-4 bg-protective-bg/50 border border-protective/10 rounded-luxury">
          <h3 className="text-sm font-medium text-protective mb-2 uppercase tracking-wide">
            Protective Factors (Decrease CVD Risk)
          </h3>
          <ul className="text-sm space-y-1.5" role="list">
            {protectiveFactors.map((factor, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-charcoal-soft"
              >
                <span
                  className="w-1.5 h-1.5 bg-protective rounded-full flex-shrink-0 mt-1.5"
                  aria-hidden="true"
                />
                <div className="flex flex-1 items-baseline gap-1 flex-wrap">
                  <strong>
                    {featureLabels[factor.rawFeature] || factor.rawFeature}
                  </strong>
                  <span className="text-stone text-xs">
                    {featureDescriptions[factor.rawFeature]?.protective ||
                      'Decreases CVD risk'}
                  </span>
                  <span className="text-protective font-mono text-xs ml-auto">
                    {(factor.value * 100).toFixed(1)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clinical Interpretation */}
      <div className="mt-4 p-4 glass-card-subtle">
        <h3 className="text-sm font-medium text-charcoal mb-2 uppercase tracking-wide">
          Clinical Interpretation
        </h3>
        <p className="text-sm text-stone leading-relaxed">
          {topFactor && (
            <>
              <strong className="text-charcoal-soft">
                {featureLabels[topFactor.rawFeature] || topFactor.rawFeature}
              </strong>{' '}
              is the most significant contributor to this patient&apos;s CVD risk (
              {topFactor.value > 0 ? 'increasing' : 'decreasing'} absolute risk
              by {(Math.abs(topFactor.value) * 100).toFixed(1)}%).
              {topFactor.value > 0
                ? ' Consider addressing this modifiable risk factor through lifestyle changes or medical management.'
                : ' This protective factor should be maintained.'}
            </>
          )}
        </p>
      </div>
    </div>
  )
}