import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  const category = request.nextUrl.searchParams.get('cat')

  console.log('🔑 Palabra secreta:', query)
  console.log('📂 Categoría:', category)

  if (!query) return NextResponse.json({ hint: null })

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Eres un asistente para un juego de adivinanzas. 
        La categoría del juego es "${category}" y la palabra secreta es "${query}".
        Responde ÚNICAMENTE con UNA sola palabra en español que sirva de pista para que el impostor intuya de qué va la palabra, sin revelarla directamente.
        Sin puntuación, sin explicaciones, solo la palabra.`,
    })

    console.log('🤖 Respuesta Gemini:', response.text)

    const hint = response.text?.trim().split(/\s+/)[0] ?? null

    console.log('💡 Pista final:', hint)

    return NextResponse.json({ hint })
  } catch (error) {
    console.error('❌ Error Gemini:', error)
    return NextResponse.json({ hint: null })
  }
}