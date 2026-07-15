interface PatientData {
  age: number;
  gender: number;
  height: number;
  weight: number;
  ap_hi: number;
  ap_lo: number;
  cholesterol: number;
  gluc: number;
  smoke: number;
  alco: number;
  active: number;
}

interface ShapFeature {
  feature: string;
  value: number;
}

function calculateClinicalRisk(patient: PatientData): [number, Record<string, number>] {
  const ageYears = patient.age > 100 ? patient.age / 365.25 : patient.age;
  const systolicBp = patient.ap_hi;
  const diastolicBp = patient.ap_lo;
  const cholesterol = patient.cholesterol;
  const glucose = patient.gluc;
  const bmi = patient.weight / Math.pow(patient.height / 100, 2);
  const smoker = patient.smoke;
  const alco = patient.alco;
  const active = patient.active;
  const gender = patient.gender;

  let points = 0;
  const featureContributions: Record<string, number> = {
    age: 0, ap_hi: 0, ap_lo: 0, cholesterol: 0,
    gluc: 0, weight: 0, smoke: 0, alco: 0, active: 0, gender: 0
  };

  if (gender === 1) {
    if (ageYears >= 65) { points += 10; featureContributions.age = 10; }
    else if (ageYears >= 60) { points += 8; featureContributions.age = 8; }
    else if (ageYears >= 55) { points += 6; featureContributions.age = 6; }
    else if (ageYears >= 50) { points += 4; featureContributions.age = 4; }
    else if (ageYears >= 45) { points += 2; featureContributions.age = 2; }
    else if (ageYears >= 40) { points += 1; featureContributions.age = 1; }
  } else {
    if (ageYears >= 65) { points += 8; featureContributions.age = 8; }
    else if (ageYears >= 60) { points += 6; featureContributions.age = 6; }
    else if (ageYears >= 55) { points += 4; featureContributions.age = 4; }
    else if (ageYears >= 50) { points += 2; featureContributions.age = 2; }
    else if (ageYears >= 45) { points += 1; featureContributions.age = 1; }
  }

  if (systolicBp >= 180) { points += 10; featureContributions.ap_hi = 10; }
  else if (systolicBp >= 160) { points += 7; featureContributions.ap_hi = 7; }
  else if (systolicBp >= 140) { points += 4; featureContributions.ap_hi = 4; }
  else if (systolicBp >= 130) { points += 2; featureContributions.ap_hi = 2; }
  else if (systolicBp < 120) { points -= 1; featureContributions.ap_hi = -1; }

  if (diastolicBp >= 120) { points += 5; featureContributions.ap_lo = 5; }
  else if (diastolicBp >= 100) { points += 3; featureContributions.ap_lo = 3; }

  if (cholesterol === 3) { points += 5; featureContributions.cholesterol = 5; }
  else if (cholesterol === 2) { points += 2; featureContributions.cholesterol = 2; }

  if (glucose === 3) { points += 4; featureContributions.gluc = 4; }
  else if (glucose === 2) { points += 2; featureContributions.gluc = 2; }

  if (bmi >= 40) { points += 6; featureContributions.weight = 6; }
  else if (bmi >= 35) { points += 4; featureContributions.weight = 4; }
  else if (bmi >= 30) { points += 3; featureContributions.weight = 3; }
  else if (bmi >= 25) { points += 1; featureContributions.weight = 1; }

  if (smoker) { points += 5; featureContributions.smoke = 5; }
  if (alco) { points += 2; featureContributions.alco = 2; }

  if (active === 1) { points -= 2; featureContributions.active = -2; }
  else { points += 2; featureContributions.active = 2; }

  if (gender === 2) featureContributions.gender = -1;

  let risk = 0.05 + (points / 35.0) * 0.45;
  risk = Math.max(0.02, Math.min(0.75, risk));

  return [risk, featureContributions];
}

function computeShapImportance(featureContributions: Record<string, number>, riskScore: number): ShapFeature[] {
  const totalAbsContrib = Object.values(featureContributions).reduce((sum, v) => sum + Math.abs(v), 0);
  if (totalAbsContrib === 0) {
    return Object.keys(featureContributions).map(k => ({ feature: k, value: 0.0 }));
  }

  const shapValues: ShapFeature[] = [];
  for (const [feature, contrib] of Object.entries(featureContributions)) {
    const shapVal = (contrib / totalAbsContrib) * riskScore;
    shapValues.push({ feature, value: shapVal });
  }

  shapValues.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  return shapValues.filter(s => Math.abs(s.value) > 1e-10).slice(0, 10);
}

function computeAllRiskMetrics(risk10yr: number): Record<string, number> {
  const riskBaseline = risk10yr * 0.15;
  const risk2yr = risk10yr * 0.35;
  const risk5yr = risk10yr * 0.70;

  return {
    immediateRisk: Math.max(0.01, Math.min(0.50, riskBaseline)),
    risk2Year: Math.max(0.05, Math.min(0.60, risk2yr)),
    risk5Year: Math.max(0.10, Math.min(0.70, risk5yr)),
    risk10Year: Math.max(0.15, Math.min(0.75, risk10yr))
  };
}

export function calculateRisk(patient: PatientData) {
  const [risk10yr, featureContributions] = calculateClinicalRisk(patient);
  const riskMetrics = computeAllRiskMetrics(risk10yr);
  const shapImportance = computeShapImportance(featureContributions, risk10yr);

  return {
    ...riskMetrics,
    shapImportance
  };
}