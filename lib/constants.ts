/**
 * Feature labels and clinical descriptions for the CVD Risk Dashboard
 */

export const FEATURE_LABELS: Record<string, string> = {
  age: 'Age',
  systolicBP: 'Systolic BP',
  totalCholesterol: 'Total Cholesterol',
  hdlCholesterol: 'HDL Cholesterol',
  smoker: 'Smoking',
  sex: 'Sex',
};

export const FEATURE_DESCRIPTIONS: Record<
  string,
  { risk: string; protective: string }
> = {
  age: {
    risk: 'Advanced age is a non-modifiable risk factor for CVD',
    protective: 'Younger age confers lower baseline risk',
  },
  systolicBP: {
    risk: 'Elevated systolic pressure increases arterial wall stress and atherosclerosis progression',
    protective: 'Optimal systolic pressure (<120 mmHg) reduces cardiovascular strain',
  },
  totalCholesterol: {
    risk: 'Elevated total cholesterol promotes atherosclerotic plaque formation',
    protective: 'Normal cholesterol levels support vascular health',
  },
  hdlCholesterol: {
    risk: 'Low HDL cholesterol reduces reverse cholesterol transport',
    protective: 'High HDL cholesterol is protective through reverse cholesterol transport',
  },
  smoker: {
    risk: 'Smoking is a major modifiable risk factor causing endothelial dysfunction and inflammation',
    protective: 'Non-smoking status eliminates tobacco-related cardiovascular damage',
  },
  sex: {
    risk: 'Male sex confers higher age-adjusted CVD risk',
    protective: 'Female sex (pre-menopause) is associated with lower CVD risk',
  },
};

export const RISK_CATEGORY_COLORS = {
  low: {
    text: 'text-risk-low',
    bg: 'bg-risk-low-bg',
    border: 'border-risk-low/20',
    dot: 'bg-risk-low',
    label: 'Low Risk',
  },
  moderate: {
    text: 'text-risk-moderate',
    bg: 'bg-risk-moderate-bg',
    border: 'border-risk-moderate/20',
    dot: 'bg-risk-moderate',
    label: 'Moderate Risk',
  },
  high: {
    text: 'text-risk-high',
    bg: 'bg-risk-high-bg',
    border: 'border-risk-high/20',
    dot: 'bg-risk-high',
    label: 'High Risk',
  },
  veryHigh: {
    text: 'text-risk-veryhigh',
    bg: 'bg-risk-veryhigh-bg',
    border: 'border-risk-veryhigh/20',
    dot: 'bg-risk-veryhigh',
    label: 'Very High Risk',
  },
} as const;

export const CHOLESTEROL_OPTIONS = [
  { value: 1, label: 'Normal (<5.0 mmol/L)', mmolL: 5.0 },
  { value: 2, label: 'Above Normal (5.0–6.5 mmol/L)', mmolL: 6.5 },
  { value: 3, label: 'Well Above Normal (>6.5 mmol/L)', mmolL: 8.0 },
] as const;

export const GLUCOSE_OPTIONS = [
  { value: 1, label: 'Normal (<5.6 mmol/L fasting)' },
  { value: 2, label: 'Pre-diabetes (5.6–6.9 mmol/L)' },
  { value: 3, label: 'Diabetes (≥7.0 mmol/L)' },
] as const;

export const SEX_OPTIONS = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
] as const;

export const YES_NO_OPTIONS = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
] as const;

export const RISK_REGION_OPTIONS = [
  { value: 'low', label: 'Low Risk Region (Western Europe: Belgium, France, Italy, Spain)' },
  { value: 'moderate', label: 'Moderate Risk Region (UK, Germany, Ireland, Netherlands)' },
  { value: 'high', label: 'High Risk Region (Central/Eastern Europe: Poland, Czechia, Hungary)' },
  { value: 'veryHigh', label: 'Very High Risk Region (Eastern Europe: Russia, Ukraine, Belarus)' },
] as const;

export const UNITS = {
  age: 'years',
  systolicBP: 'mmHg',
  totalCholesterol: 'mmol/L',
  hdlCholesterol: 'mmol/L',
  height: 'cm',
  weight: 'kg',
  bmi: 'kg/m²',
} as const;

export const VALIDATION_RANGES = {
  age: { min: 40, max: 69 },
  systolicBP: { min: 80, max: 200 },
  totalCholesterol: { min: 2, max: 12 },
  hdlCholesterol: { min: 0.5, max: 3 },
  height: { min: 100, max: 250 },
  weight: { min: 30, max: 250 },
} as const;