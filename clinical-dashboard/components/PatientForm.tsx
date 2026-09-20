'use client'

import { useState } from 'react'

interface PatientData {
  age: number
  gender: number
  height: number
  weight: number
  ap_hi: number
  ap_lo: number
  cholesterol: number
  gluc: number
  smoke: number
  alco: number
  active: number
}

interface RiskResult {
  immediateRisk: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  shapImportance: { feature: string; value: number }[]
}

const initialPatient: PatientData = {
  age: 50,
  gender: 1,
  height: 170,
  weight: 70,
  ap_hi: 120,
  ap_lo: 80,
  cholesterol: 1,
  gluc: 1,
  smoke: 0,
  alco: 0,
  active: 1,
}

export default function PatientForm({
  onResult,
}: {
  onResult: (result: RiskResult | null) => void
}) {
  const [patient, setPatient] = useState<PatientData>(initialPatient)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof PatientData, value: number) => {
    setPatient((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('API error:', error)
        throw new Error(error.error || 'Risk calculation failed')
      }

      const result = await response.json()
      onResult(result)
    } catch (error) {
      console.error('Error:', error)
      onResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h2 className="text-base font-medium tracking-widest text-charcoal uppercase">
          Patient Vitals
        </h2>
        <p className="text-xs text-stone-light mt-1.5 tracking-wider">
          Enter clinical parameters for risk assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Patient vitals input form">
        {/* Age & Gender */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Demographics</legend>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={patient.age}
              onChange={(e) => handleChange('age', Number(e.target.value))}
              aria-required="true"
              min={1}
              max={120}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Gender
            </label>
            <select
              id="gender"
              value={patient.gender}
              onChange={(e) => handleChange('gender', Number(e.target.value))}
              aria-required="true"
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>
        </fieldset>

        {/* Height & Weight */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Body measurements</legend>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              value={patient.height}
              onChange={(e) => handleChange('height', Number(e.target.value))}
              aria-required="true"
              min={50}
              max={250}
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              value={patient.weight}
              onChange={(e) => handleChange('weight', Number(e.target.value))}
              aria-required="true"
              min={20}
              max={300}
            />
          </div>
        </fieldset>

        {/* Blood Pressure */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Blood pressure</legend>
          <div>
            <label htmlFor="ap_hi" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Systolic BP
            </label>
            <input
              id="ap_hi"
              type="number"
              value={patient.ap_hi}
              onChange={(e) => handleChange('ap_hi', Number(e.target.value))}
              aria-required="true"
              aria-describedby="bp-hint"
              min={60}
              max={250}
            />
          </div>
          <div>
            <label htmlFor="ap_lo" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Diastolic BP
            </label>
            <input
              id="ap_lo"
              type="number"
              value={patient.ap_lo}
              onChange={(e) => handleChange('ap_lo', Number(e.target.value))}
              aria-required="true"
              min={40}
              max={200}
            />
          </div>
          <p id="bp-hint" className="sr-only">
            Enter blood pressure in millimeters of mercury (mmHg)
          </p>
        </fieldset>

        {/* Cholesterol, Glucose, Smoker */}
        <fieldset className="grid grid-cols-3 gap-3">
          <legend className="sr-only">Lab values and habits</legend>
          <div>
            <label htmlFor="cholesterol" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Cholesterol
            </label>
            <select
              id="cholesterol"
              value={patient.cholesterol}
              onChange={(e) => handleChange('cholesterol', Number(e.target.value))}
              aria-required="true"
            >
              <option value={1}>Normal</option>
              <option value={2}>Above Normal</option>
              <option value={3}>Well Above Normal</option>
            </select>
          </div>
          <div>
            <label htmlFor="glucose" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Glucose
            </label>
            <select
              id="glucose"
              value={patient.gluc}
              onChange={(e) => handleChange('gluc', Number(e.target.value))}
              aria-required="true"
            >
              <option value={1}>Normal</option>
              <option value={2}>Above Normal</option>
              <option value={3}>Well Above Normal</option>
            </select>
          </div>
          <div>
            <label htmlFor="smoke" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Smoker
            </label>
            <select
              id="smoke"
              value={patient.smoke}
              onChange={(e) => handleChange('smoke', Number(e.target.value))}
              aria-required="true"
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </fieldset>

        {/* Alcohol & Activity */}
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="sr-only">Lifestyle factors</legend>
          <div>
            <label htmlFor="alcohol" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Alcohol
            </label>
            <select
              id="alcohol"
              value={patient.alco}
              onChange={(e) => handleChange('alco', Number(e.target.value))}
              aria-required="true"
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div>
            <label htmlFor="active" className="block text-sm font-medium text-charcoal-soft mb-1.5">
              Physical Activity
            </label>
            <select
              id="active"
              value={patient.active}
              onChange={(e) => handleChange('active', Number(e.target.value))}
              aria-required="true"
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
          aria-label={loading ? 'Calculating risk assessment' : 'Calculate risk assessment'}
        >
          {loading && <span className="spinner" aria-hidden="true" />}
          {loading ? 'Calculating...' : 'Calculate Risk Assessment'}
          {!loading && (
            <span className="arrow-right" aria-hidden="true">
              &rarr;
            </span>
          )}
        </button>
      </form>
    </div>
  )
}