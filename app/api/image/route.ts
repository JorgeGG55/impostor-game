import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ image: null })
  }

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
      { next: { revalidate: 86400 } } // cache 24h
    )

    if (!res.ok) {
      // Intentar con búsqueda en español
      const searchRes = await fetch(
        `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      )
      if (!searchRes.ok) return NextResponse.json({ image: null })
      const searchData = await searchRes.json()
      return NextResponse.json({
        image: searchData.thumbnail?.source ?? null
      })
    }

    const data = await res.json()
    return NextResponse.json({
      image: data.thumbnail?.source ?? null
    })
  } catch {
    return NextResponse.json({ image: null })
  }
}