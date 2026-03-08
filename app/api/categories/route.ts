import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import { CategoryResponse } from '@/types'

function toCategoryResponse(cat: any): CategoryResponse {
  return {
    _id: cat._id.toString(),
    name: cat.name,
    emoji: cat.emoji,
    wordCount: cat.words.length,
  }
}

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find({}, 'name emoji words').lean()

    return NextResponse.json(categories.map(toCategoryResponse))

  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    )
  }
}