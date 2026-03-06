import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import { assignRoles, pickRandomWord } from '@/lib/gameLogic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categoryIds, playerCount, impostorCount } = body

    if (!categoryIds || !categoryIds.length || !playerCount || !impostorCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (impostorCount >= playerCount) {
      return NextResponse.json(
        { error: 'Impostors cannot be equal or more than players' },
        { status: 400 }
      )
    }

    await connectDB()

    const categories = await Category.find({ _id: { $in: categoryIds } }).lean()
    if (!categories.length) {
      return NextResponse.json(
        { error: 'Categories not found' },
        { status: 404 }
      )
    }

    // Mezclamos todas las palabras de todas las categorías seleccionadas
    const allWords = categories.flatMap((cat) => cat.words)
    const secretWord = pickRandomWord(allWords)
    const categoryName = categories.map((c) => c.name).join(' & ')
    const players = assignRoles(playerCount, impostorCount, secretWord)

    return NextResponse.json({
      players,
      secretWord,
      categoryName,
    })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    )
  }
}