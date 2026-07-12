'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { HelpCircle } from 'lucide-react'

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
  active: 'Physical Activity'
}

const featureDescriptions: Record<string, { risk: string; protective: string }> = {
  ap_hi: { risk: 'Elevated systolic blood pressure significantly increases CVD risk', protective: 'Normal systolic blood pressure is protective' },
  ap_lo: { risk: 'Elevated diastolic blood pressure increases CVD risk', protective: 'Normal diastolic blood pressure is protective' },
  cholesterol: { risk: 'Elevated cholesterol contributes to atherosclerosis risk', protective: 'Normal cholesterol levels are protective' },
  gluc: { risk: 'Elevated glucose indicates diabetes/prediabetes risk', protective: 'Normal glucose levels are protective' },
  age: { risk: 'Advanced age is a non-modifiable risk factor', protective: 'Younger age is protective' },
  weight: { risk: 'Excess weight increases cardiovascular strain', protective: 'Healthy weight is protective' },
  smoke: { risk: 'Smoking is a major modifiable CVD risk factor', protective: 'Non-smoking status is protective' },
  alco: { risk: 'Excessive alcohol consumption increases CVD risk', protective: 'Moderate/no alcohol is protective' },
  active: { risk: 'Physical inactivity increases CVD risk', protective: 'Regular physical activity is protective' },
}

export default function ExplanationPanel({ shapImportance }: ExplanationPanelProps) {
  const shapData = shapImportance || []
  
  if (!shapData || shapData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">SHAP Feature Importance</h2>
        </div>
        <p className="text-gray-500 text-center py-8">Calculate risk to see feature explanations</p>
      </div>
    )
  }

  const chartData = shapData.map(item => ({
    feature: featureLabels[item.feature] || item.feature,
    value: item.value,
    rawFeature: item.feature
  }))

  // Separate risk factors (positive SHAP) and protective factors (negative SHAP)
  const riskFactors = chartData.filter(d => d.value > 0)
  const protectiveFactors = chartData.filter(d => d.value < 0)

  // Get top contributing factor for clinical interpretation
  const topFactor = chartData[0]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">SHAP Feature Importance</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        The following shows how each feature contributes to the risk prediction for this patient. 
        Red bars increase risk, blue bars decrease risk.
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              stroke="#6b7280" 
              fontSize={12}
              tickFormatter={(v) => v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2)}
            />
            <YAxis 
              type="category" 
              dataKey="feature" 
              stroke="#6b7280" 
              fontSize={11}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => [
                `${value > 0 ? '+' : ''}${value.toFixed(4)}`,
                'SHAP Value'
              ]}
              labelFormatter={() => ''}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.value > 0 ? '#ef4444' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Factors Section */}
      {riskFactors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-medium text-red-900 mb-2">Risk Factors (Increase CVD Risk)</h3>
          <ul className="text-sm text-red-800 space-y-1">
            {riskFactors.map((factor, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />
                <strong>{featureLabels[factor.rawFeature] || factor.rawFeature}</strong>
                <span className="text-gray-600">: {featureDescriptions[factor.rawFeature]?.risk || 'Increases CVD risk'}</span>
                <span className="text-red-600 font-mono ml-auto">+{factor.value.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Protective Factors Section */}
      {protectiveFactors.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Protective Factors (Decrease CVD Risk)</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {protectiveFactors.map((factor, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                <strong>{featureLabels[factor.rawFeature] || factor.rawFeature}</strong>
                <span className="text-gray-600">: {featureDescriptions[factor.rawFeature]?.protective || 'Decreases CVD risk'}</span>
                <span className="text-blue-600 font-mono ml-auto">{factor.value.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clinical Interpretation */}
<div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Clinical Interpretation</h3>
        <p className="text-sm text-gray-700">
          {topFactor && (
            <>
              <strong>{featureLabels[topFactor.rawFeature] || topFactor.rawFeature}</strong> 
              {' '}is the most significant contributor to this patient's CVD risk 
              ({topFactor.value > 0 ? 'increasing' : 'decreasing'} risk by {Math.abs(topFactor.value).toFixed(4)} SHAP units).
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