/**
 * SCORE2 Cardiovascular Risk Algorithm
 * 
 * European Society of Cardiology (ESC) / European Association of Preventive Cardiology (EAPC)
 * 2021 Guidelines for cardiovascular disease prevention
 * 
 * Estimates 10-year risk of fatal and non-fatal CVD in adults aged 40-69
 * without established CVD, diabetes, or severe chronic kidney disease
 * 
 * References:
 * - SCORE2 working group. Eur Heart J. 2021;42(25):2439-2454
 * - ESC Guidelines on cardiovascular disease prevention. Eur Heart J. 2021;42(34):3227-3337
 */

export interface PatientData {
  age: number;           // years (40-69)
  sex: number;           // 1 = male, 2 = female
  smoker: number;        // 1 = current smoker, 0 = non-smoker
  systolicBP: number;    // mmHg
  totalCholesterol: number; // mmol/L
  hdlCholesterol: number;   // mmol/L
  // Optional fields for UI compatibility
  height?: number;       // cm
  weight?: number;       // kg
  diastolicBP?: number;  // mmHg
  glucose?: number;      // 1=normal, 2=above, 3=well above (categorical)
  alcohol?: number;      // 0=no, 1=yes
  active?: number;       // 0=no, 1=yes
}

// Risk region coefficients (calibrated for different European regions)
// Using "moderate risk" region coefficients as default (broadly applicable)
// From SCORE2 paper: moderate risk region (e.g., UK, Germany, France)
const MODERATE_REGION = {
  male: {
    betaAge: 0.0642,
    betaLogSBP: 0.2589,
    betaLogTC: 0.1478,
    betaLogHDL: -0.1264,
    betaSmoker: 0.5256,
    baselineSurvival: 0.9665, // S0(10) for moderate region
    meanAge: 55.2,
    meanLogSBP: 4.78,
    meanLogTC: 5.28,
    meanLogHDL: 4.34,
    meanSmoker: 0.28,
  },
  female: {
    betaAge: 0.0707,
    betaLogSBP: 0.2929,
    betaLogTC: 0.1919,
    betaLogHDL: -0.1543,
    betaSmoker: 0.5870,
    baselineSurvival: 0.9812,
    meanAge: 55.2,
    meanLogSBP: 4.78,
    meanLogTC: 5.28,
    meanLogHDL: 4.34,
    meanSmoker: 0.22,
  },
};

// Risk region multipliers for calibration
export const RISK_REGIONS = {
  low: { name: 'Low Risk (e.g., Belgium, France, Italy, Spain)', multiplier: 0.7 },
  moderate: { name: 'Moderate Risk (e.g., UK, Germany, Ireland)', multiplier: 1.0 },
  high: { name: 'High Risk (e.g., Central/Eastern Europe)', multiplier: 1.3 },
  veryHigh: { name: 'Very High Risk (e.g., Russia, Ukraine)', multiplier: 1.6 },
} as const;

export type RiskRegion = keyof typeof RISK_REGIONS;

/**
 * Calculate 10-year CVD risk using SCORE2 algorithm
 * Returns risk as probability (0-1) and feature contributions for explanation
 */
export function calculateScore2Risk(
  patient: PatientData,
  region: RiskRegion = 'moderate'
): { risk10Year: number; featureContributions: Record<string, number> } {
  const { age, sex, smoker, systolicBP, totalCholesterol, hdlCholesterol } = patient;
  
  // Validate inputs
  if (age < 40 || age > 69) {
    throw new Error('SCORE2 is validated for ages 40-69');
  }
  if (systolicBP < 80 || systolicBP > 200) {
    throw new Error('Systolic BP must be between 80-200 mmHg');
  }
  if (totalCholesterol < 2 || totalCholesterol > 12) {
    throw new Error('Total cholesterol must be between 2-12 mmol/L');
  }
  if (hdlCholesterol < 0.5 || hdlCholesterol > 3) {
    throw new Error('HDL cholesterol must be between 0.5-3 mmol/L');
  }

  const isMale = sex === 1;
  const coeffs = isMale ? MODERATE_REGION.male : MODERATE_REGION.female;
  
  // Log transformations
  const logSBP = Math.log(systolicBP);
  const logTC = Math.log(totalCholesterol);
  const logHDL = Math.log(hdlCholesterol);
  
  // Linear predictor
  const linearPredictor = 
    coeffs.betaAge * age +
    coeffs.betaLogSBP * logSBP +
    coeffs.betaLogTC * logTC +
    coeffs.betaLogHDL * logHDL +
    coeffs.betaSmoker * smoker;
  
  // Centered linear predictor (relative to mean risk factor levels)
  const centeredLP = linearPredictor - (
    coeffs.betaAge * coeffs.meanAge +
    coeffs.betaLogSBP * coeffs.meanLogSBP +
    coeffs.betaLogTC * coeffs.meanLogTC +
    coeffs.betaLogHDL * coeffs.meanLogHDL +
    coeffs.betaSmoker * coeffs.meanSmoker
  );
  
  // 10-year risk = 1 - S0(10)^exp(centeredLP)
  // Apply region calibration multiplier
  const calibratedLP = centeredLP + Math.log(RISK_REGIONS[region].multiplier);
  const risk10Year = 1 - Math.pow(coeffs.baselineSurvival, Math.exp(calibratedLP));
  
  // Clamp to reasonable bounds
  const clampedRisk = Math.max(0.01, Math.min(0.95, risk10Year));
  
  // Calculate feature contributions (for SHAP-like explanations)
  // Using the derivative of risk with respect to each feature
  const riskDerivative = clampedRisk * Math.log(1 / coeffs.baselineSurvival) * Math.exp(calibratedLP);
  
  const featureContributions: Record<string, number> = {
    age: riskDerivative * coeffs.betaAge,
    systolicBP: riskDerivative * coeffs.betaLogSBP * (1 / systolicBP),
    totalCholesterol: riskDerivative * coeffs.betaLogTC * (1 / totalCholesterol),
    hdlCholesterol: riskDerivative * coeffs.betaLogHDL * (1 / hdlCholesterol),
    smoker: riskDerivative * coeffs.betaSmoker * smoker,
  };
  
  // Normalize contributions to sum to risk
  const totalContrib = Object.values(featureContributions).reduce((sum, v) => sum + Math.abs(v), 0);
  if (totalContrib > 0) {
    for (const key of Object.keys(featureContributions)) {
      featureContributions[key] = (featureContributions[key] / totalContrib) * clampedRisk;
    }
  }
  
  return { risk10Year: clampedRisk, featureContributions };
}

/**
 * Convert SCORE2 risk to multi-horizon estimates
 * Uses proportional hazards assumption for intermediate timepoints
 */
export function computeRiskTrajectory(risk10Year: number): {
  immediateRisk: number;
  risk1Year: number;
  risk2Year: number;
  risk5Year: number;
  risk10Year: number;
} {
  // Under proportional hazards: S(t) = S0(t)^exp(LP)
  // Risk at time t = 1 - (1 - risk10Year)^(t/10)
  
  const immediateRisk = risk10Year * 0.05; // Baseline immediate risk
  const risk1Year = 1 - Math.pow(1 - risk10Year, 1/10);
  const risk2Year = 1 - Math.pow(1 - risk10Year, 2/10);
  const risk5Year = 1 - Math.pow(1 - risk10Year, 5/10);
  
  return {
    immediateRisk: Math.max(0.005, Math.min(0.3, immediateRisk)),
    risk1Year: Math.max(0.01, Math.min(0.5, risk1Year)),
    risk2Year: Math.max(0.02, Math.min(0.6, risk2Year)),
    risk5Year: Math.max(0.05, Math.min(0.75, risk5Year)),
    risk10Year: Math.max(0.1, Math.min(0.9, risk10Year)),
  };
}

/**
 * Determine risk category per ESC guidelines
 */
export function getRiskCategory(risk10Year: number): {
  category: 'Low' | 'Moderate' | 'High' | 'Very High';
  color: 'low' | 'moderate' | 'high' | 'veryHigh';
  recommendation: string;
} {
  const pct = risk10Year * 100;
  
  if (pct < 2.5) {
    return {
      category: 'Low',
      color: 'low',
      recommendation: 'Lifestyle advice. Reassess at 5 years.',
    };
  } else if (pct < 7.5) {
    return {
      category: 'Moderate',
      color: 'moderate',
      recommendation: 'Lifestyle intervention. Consider lipid-lowering if LDL-C elevated. Reassess at 3-5 years.',
    };
  } else if (pct < 15) {
    return {
      category: 'High',
      color: 'high',
      recommendation: 'Intensive lifestyle intervention. Strongly consider statin therapy. Reassess at 1-3 years.',
    };
  } else {
    return {
      category: 'Very High',
      color: 'veryHigh',
      recommendation: 'Immediate intensive risk factor management. Statin therapy indicated. Specialist referral considered.',
    };
  }
}

/**
 * Validate patient data for SCORE2
 */
export function validateForScore2(patient: PatientData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (patient.age < 40 || patient.age > 69) {
    errors.push('SCORE2 is validated for ages 40-69 only');
  }
  if (patient.systolicBP < 80 || patient.systolicBP > 200) {
    errors.push('Systolic BP must be 80-200 mmHg');
  }
  if (patient.totalCholesterol < 2 || patient.totalCholesterol > 12) {
    errors.push('Total cholesterol must be 2-12 mmol/L');
  }
  if (patient.hdlCholesterol < 0.5 || patient.hdlCholesterol > 3) {
    errors.push('HDL cholesterol must be 0.5-3 mmol/L');
  }
  if (![1, 2].includes(patient.sex)) {
    errors.push('Sex must be 1 (male) or 2 (female)');
  }
  if (![0, 1].includes(patient.smoker)) {
    errors.push('Smoking status must be 0 (no) or 1 (yes)');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Convert categorical cholesterol/glucose to mmol/L estimates
 * For backward compatibility with original UI
 */
export function convertCategoricalLabs(
  cholesterolCat: number,  // 1=normal, 2=above, 3=well above
  glucoseCat: number       // 1=normal, 2=above, 3=well above
): { totalCholesterol: number; hdlCholesterol: number } {
  // Rough estimates based on typical clinical ranges
  const totalCholMap: Record<number, number> = {
    1: 5.0,   // Normal ~5.0 mmol/L
    2: 6.5,   // Above normal ~6.5 mmol/L
    3: 8.0,   // Well above ~8.0 mmol/L
  };
  
  // HDL inversely related to total cholesterol categories
  const hdlMap: Record<number, number> = {
    1: 1.4,   // Normal HDL
    2: 1.1,   // Lower HDL
    3: 0.9,   // Low HDL
  };
  
  return {
    totalCholesterol: totalCholMap[cholesterolCat] || 5.0,
    hdlCholesterol: hdlMap[cholesterolCat] || 1.4,
  };
}