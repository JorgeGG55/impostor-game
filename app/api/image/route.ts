import { NextRequest, NextResponse } from 'next/server'

interface WikipediaSummary {
  thumbnail?: {
    source: string
  }
}

async function fetchWikipediaImage(
  query: string,
  lang: 'es' | 'en'
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null

    const data: WikipediaSummary = await res.json()
    return data.thumbnail?.source ?? null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json({ image: null })
  }

  const image =
    (await fetchWikipediaImage(query, 'es')) ??
    (await fetchWikipediaImage(query, 'en'))

  return NextResponse.json({ image })
}