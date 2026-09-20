'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PatientData {
  age: number
  sex: number
  height: number
  weight: number
  systolicBP: number
  diastolicBP: number
  cholesterol: number
  glucose: number
  smoker: number
  alcohol: number
  active: number
  region: string
}

interface RiskResult {
  immediateRisk: number
  risk1Year: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  featureContributions: Record<string, number>
  riskCategory: string
  recommendation: string
}

interface PatientFormProps {
  onCalculate: (data: PatientData) => void
  isLoading: boolean
}

const initialPatient: PatientData = {
  age: 55,
  sex: 1,
  height: 170,
  weight: 70,
  systolicBP: 130,
  diastolicBP: 85,
  cholesterol: 1,
  glucose: 1,
  smoker: 0,
  alcohol: 0,
  active: 1,
  region: 'moderate',
}

const CHOLESTEROL_OPTIONS = [
  { value: 1, label: 'Normal (<5.0 mmol/L)' },
  { value: 2, label: 'Above Normal (5.0–6.5 mmol/L)' },
  { value: 3, label: 'Well Above Normal (>6.5 mmol/L)' },
] as const

const GLUCOSE_OPTIONS = [
  { value: 1, label: 'Normal (<5.6 mmol/L fasting)' },
  { value: 2, label: 'Pre-diabetes (5.6–6.9 mmol/L)' },
  { value: 3, label: 'Diabetes (≥7.0 mmol/L)' },
] as const

const SEX_OPTIONS = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
] as const

const YES_NO_OPTIONS = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
] as const

const REGION_OPTIONS = [
  { value: 'low', label: 'Low Risk Region (Western Europe)' },
  { value: 'moderate', label: 'Moderate Risk Region (UK, Germany, etc.)' },
  { value: 'high', label: 'High Risk Region (Central/Eastern Europe)' },
  { value: 'veryHigh', label: 'Very High Risk Region (Eastern Europe)' },
] as const

export default function PatientForm({ onCalculate, isLoading }: PatientFormProps) {
  const [patient, setPatient] = useState<PatientData>(initialPatient)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback((field: keyof PatientData, value: number | string) => {
    setPatient((prev) => ({ ...prev, [field]: typeof value === 'string' ? value : Number(value) }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  const validateField = (field: keyof PatientData, value: number): string | null => {
    switch (field) {
      case 'age':
        if (value < 40 || value > 69) return 'Age must be 40–69 for SCORE2'
        break
      case 'systolicBP':
        if (value < 80 || value > 200) return 'Systolic BP must be 80–200 mmHg'
        break
      case 'diastolicBP':
        if (value < 40 || value > 150) return 'Diastolic BP must be 40–150 mmHg'
        break
    }
    return null
  }

  const handleBlur = (field: keyof PatientData) => {
    const error = validateField(field, patient[field] as number)
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(patient).forEach((key) => {
      const error = validateField(key as keyof PatientData, patient[key as keyof PatientData] as number)
      if (error) newErrors[key] = error
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onCalculate(patient)
  }

  const inputClassName = (field: keyof PatientData) => 
    `w-full transition-all duration-200 ${
      errors[field] 
        ? 'border-risk-high focus:border-risk-high focus:ring-risk-high/20' 
        : 'border-sand hover:border-stone-light focus:border-gold focus:ring-gold/20'
    }`

  return (
    <motion.div
      className="glass-card-elevated p-6 sm:p-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-medium tracking-widest text-charcoal uppercase">
          Patient Parameters
        </h2>
        <p className="text-xs text-stone-light mt-2 tracking-wider font-body">
          Enter clinical values for SCORE2 risk estimation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Patient parameters input form" noValidate>
        {/* Age & Sex */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Demographics</legend>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-charcoal-soft mb-2">
              Age (years)
              <span className="text-gold font-body" aria-hidden="true">*</span>
            </label>
            <input
              id="age"
              type="number"
              value={patient.age}
              onChange={(e) => handleChange('age', Number(e.target.value))}
              onBlur={() => handleBlur('age')}
              aria-required="true"
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : 'age-hint'}
              min={40}
              max={69}
              className={inputClassName('age')}
              inputMode="numeric"
            />
            {errors.age && (
              <p id="age-error" className="mt-1.5 text-xs text-risk-high" role="alert">{errors.age}</p>
            )}
            {!errors.age && (
              <p id="age-hint" className="mt-1.5 text-xs text-stone-light">SCORE2 validated for ages 40–69</p>
            )}
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-charcoal-soft mb-2">
              Sex
              <span className="text-gold font-body" aria-hidden="true">*</span>
            </label>
            <select
              id="sex"
              value={patient.sex}
              onChange={(e) => handleChange('sex', Number(e.target.value))}
              aria-required="true"
              className={inputClassName('sex')}
            >
              {SEX_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Height & Weight */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Body measurements</legend>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-charcoal-soft mb-2">
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              value={patient.height}
              onChange={(e) => handleChange('height', Number(e.target.value))}
              min={100}
              max={250}
              className={inputClassName('height')}
              inputMode="numeric"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-charcoal-soft mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              value={patient.weight}
              onChange={(e) => handleChange('weight', Number(e.target.value))}
              min={30}
              max={250}
              className={inputClassName('weight')}
              inputMode="numeric"
            />
          </div>
        </fieldset>

        {/* Blood Pressure */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Blood pressure</legend>
          <div>
            <label htmlFor="systolicBP" className="block text-sm font-medium text-charcoal-soft mb-2">
              Systolic BP (mmHg)
              <span className="text-gold font-body" aria-hidden="true">*</span>
            </label>
            <input
              id="systolicBP"
              type="number"
              value={patient.systolicBP}
              onChange={(e) => handleChange('systolicBP', Number(e.target.value))}
              onBlur={() => handleBlur('systolicBP')}
              aria-required="true"
              aria-invalid={!!errors.systolicBP}
              aria-describedby={errors.systolicBP ? 'sbp-error' : 'sbp-hint'}
              min={80}
              max={200}
              className={inputClassName('systolicBP')}
              inputMode="numeric"
            />
            {errors.systolicBP && (
              <p id="sbp-error" className="mt-1.5 text-xs text-risk-high" role="alert">{errors.systolicBP}</p>
            )}
            {!errors.systolicBP && (
              <p id="sbp-hint" className="mt-1.5 text-xs text-stone-light">Used directly in SCORE2 calculation</p>
            )}
          </div>
          <div>
            <label htmlFor="diastolicBP" className="block text-sm font-medium text-charcoal-soft mb-2">
              Diastolic BP (mmHg)
            </label>
            <input
              id="diastolicBP"
              type="number"
              value={patient.diastolicBP}
              onChange={(e) => handleChange('diastolicBP', Number(e.target.value))}
              onBlur={() => handleBlur('diastolicBP')}
              min={40}
              max={150}
              className={inputClassName('diastolicBP')}
              inputMode="numeric"
            />
          </div>
        </fieldset>

        {/* Cholesterol & Glucose (Categorical) */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Lipid and glucose status</legend>
          <div>
            <label htmlFor="cholesterol" className="block text-sm font-medium text-charcoal-soft mb-2">
              Total Cholesterol
              <span className="text-gold font-body" aria-hidden="true">*</span>
            </label>
            <select
              id="cholesterol"
              value={patient.cholesterol}
              onChange={(e) => handleChange('cholesterol', Number(e.target.value))}
              aria-required="true"
              className={inputClassName('cholesterol')}
            >
              {CHOLESTEROL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-stone-light">Converted to mmol/L for calculation</p>
          </div>
          <div>
            <label htmlFor="glucose" className="block text-sm font-medium text-charcoal-soft mb-2">
              Glucose Status
            </label>
            <select
              id="glucose"
              value={patient.glucose}
              onChange={(e) => handleChange('glucose', Number(e.target.value))}
              className={inputClassName('glucose')}
            >
              {GLUCOSE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Smoking, Alcohol, Activity */}
        <fieldset className="grid grid-cols-3 gap-3 sm:gap-4">
          <legend className="sr-only">Lifestyle factors</legend>
          <div>
            <label htmlFor="smoker" className="block text-sm font-medium text-charcoal-soft mb-2">
              Current Smoker
              <span className="text-gold font-body" aria-hidden="true">*</span>
            </label>
            <select
              id="smoker"
              value={patient.smoker}
              onChange={(e) => handleChange('smoker', Number(e.target.value))}
              aria-required="true"
              className={inputClassName('smoker')}
            >
              {YES_NO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="alcohol" className="block text-sm font-medium text-charcoal-soft mb-2">
              Alcohol Use
            </label>
            <select
              id="alcohol"
              value={patient.alcohol}
              onChange={(e) => handleChange('alcohol', Number(e.target.value))}
              className={inputClassName('alcohol')}
            >
              {YES_NO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="active" className="block text-sm font-medium text-charcoal-soft mb-2">
              Physical Activity
            </label>
            <select
              id="active"
              value={patient.active}
              onChange={(e) => handleChange('active', Number(e.target.value))}
              className={inputClassName('active')}
            >
              {YES_NO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Risk Region */}
        <fieldset>
          <legend className="sr-only">Risk region calibration</legend>
          <label htmlFor="region" className="block text-sm font-medium text-charcoal-soft mb-2">
            Risk Region Calibration
          </label>
          <select
            id="region"
            value={patient.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className={inputClassName('region')}
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-stone-light">
            Select region for SCORE2 calibration. Moderate risk region is broadly applicable.
          </p>
        </fieldset>

        {/* BMI Display */}
        <div className="glass-card-subtle p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone tracking-wider uppercase">Calculated BMI</span>
            <span className="text-lg font-medium text-charcoal tabular-nums">
              {(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)} kg/m²
            </span>
          </div>
        </div>

        {/* Submit */}
        <AnimatePresence mode="wait">
          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5"
            aria-label={isLoading ? 'Calculating risk assessment' : 'Calculate 10-year CVD risk'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <span className="spinner-gold" aria-hidden="true" />
                  Calculating...
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  Calculate 10-Year CVD Risk
                  <span className="arrow-right" aria-hidden="true">&rarr;</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </AnimatePresence>
      </form>
    </motion.div>
  )
}