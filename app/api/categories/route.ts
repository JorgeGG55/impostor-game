import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find({}, 'name emoji words').lean()

    // Mandamos el count de palabras, no las palabras en sí
    // (no es necesario el array completo para la pantalla de setup)
    const response = categories.map((cat) => ({
      _id: cat._id.toString(),
      name: cat.name,
      emoji: cat.emoji,
      wordCount: cat.words.length,
    }))

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}