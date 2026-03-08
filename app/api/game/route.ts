import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import { assignRoles, pickRandomWord } from '@/lib/gameLogic'

interface GameRequestBody {
  categoryIds: string[]
  playerCount: number
  impostorCount: number
}

function validateBody({ categoryIds, playerCount, impostorCount }: GameRequestBody): string | null {
  if (!categoryIds?.length || !playerCount || !impostorCount) {
    return 'Faltan campos requeridos'
  }
  if (impostorCount >= playerCount) {
    return 'Los impostores no pueden ser iguales o más que los jugadores'
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: GameRequestBody = await request.json()

    const validationError = validateBody(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { categoryIds, playerCount, impostorCount } = body

    await connectDB()

    const categories = await Category.find({ _id: { $in: categoryIds } }).lean()
    if (!categories.length) {
      return NextResponse.json(
        { error: 'Categorías no encontradas' },
        { status: 404 }
      )
    }

    const allWords = categories.flatMap((cat) => cat.words)
    const secretWord = pickRandomWord(allWords)
    const wordCategory = categories.find((cat) => cat.words.includes(secretWord))
    const categoryName = wordCategory?.name ?? categories.map((c) => c.name).join(' & ')

    const players = assignRoles({
      playerCount,
      impostorCount,
      secretWord,
      categoryName,
    })

    return NextResponse.json({ players, secretWord, categoryName })

  } catch (error) {
    console.error('Error al crear la partida:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}