import { NextResponse } from 'next/server'
import { calculateRisk } from './clinicalRisk'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const patientData = await request.json()

    const result = calculateRisk(patientData)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Server error:', error)
    return NextResponse.json({ error: 'Server error: ' + String(error) }, { status: 500 })
  }
}