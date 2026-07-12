import { NextResponse } from 'next/server'

// Local FastAPI endpoint (internal nginx proxy forwards /api/* to FastAPI on port 8000)
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const patientData = await request.json()

    console.log('[API] Forwarding to FastAPI:', FASTAPI_URL)
    
    const response = await fetch(`${FASTAPI_URL}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    })

    console.log('[API] FastAPI response status:', response.status)
    
    const text = await response.text()
    console.log('[API] FastAPI raw response:', text)
    
    if (!response.ok) {
      console.error('[API] FastAPI error:', text)
      return NextResponse.json({ error: 'Risk calculation failed: ' + text }, { status: 500 })
    }
    
    if (!text) {
      console.error('[API] Empty response from FastAPI')
      return NextResponse.json({ error: 'Empty response from risk service' }, { status: 500 })
    }
    
    let result
    try {
      result = JSON.parse(text)
    } catch (e) {
      console.error('[API] Failed to parse FastAPI response:', text)
      return NextResponse.json({ error: 'Invalid response from risk service' }, { status: 500 })
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Server error:', error)
    return NextResponse.json({ error: 'Server error: ' + String(error) }, { status: 500 })
  }
}