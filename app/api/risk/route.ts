import { NextResponse } from 'next/server'
import { calculateScore2Risk, computeRiskTrajectory, getRiskCategory, validateForScore2, convertCategoricalLabs } from '@/lib/score2'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()
    
    // Handle both direct mmol/L inputs and categorical inputs
    let { age, sex, smoker, systolicBP, totalCholesterol, hdlCholesterol, cholesterol, glucose, region = 'moderate' } = body
    
    // Convert categorical cholesterol/glucose if mmol/L not provided
    if ((!totalCholesterol || !hdlCholesterol) && cholesterol) {
      const converted = convertCategoricalLabs(cholesterol, glucose || 1)
      totalCholesterol = converted.totalCholesterol
      hdlCholesterol = converted.hdlCholesterol
    }
    
    const patientData = {
      age: Number(age),
      sex: Number(sex),
      smoker: Number(smoker),
      systolicBP: Number(systolicBP),
      totalCholesterol: Number(totalCholesterol),
      hdlCholesterol: Number(hdlCholesterol),
    }
    
    // Validate
    const validation = validateForScore2(patientData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      )
    }
    
    // Calculate SCORE2 risk
    const { risk10Year, featureContributions } = calculateScore2Risk(patientData, region)
    
    // Compute multi-horizon trajectory
    const riskTrajectory = computeRiskTrajectory(risk10Year)
    
    // Get risk category and recommendation
    const { category, color, recommendation } = getRiskCategory(risk10Year)
    
    // Map feature contributions to UI-friendly keys
    const uiContributions: Record<string, number> = {
      age: featureContributions.age || 0,
      systolicBP: featureContributions.systolicBP || 0,
      totalCholesterol: featureContributions.totalCholesterol || 0,
      hdlCholesterol: featureContributions.hdlCholesterol || 0,
      smoker: featureContributions.smoker || 0,
      sex: sex === 1 ? 0.01 : -0.01, // Small contribution for sex
    }
    
    const result = {
      ...riskTrajectory,
      risk10Year,
      featureContributions: uiContributions,
      riskCategory: category,
      recommendation,
      region,
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Server error:', error)
    return NextResponse.json(
      { error: 'Server error: ' + String(error) },
      { status: 500 }
    )
  }
}