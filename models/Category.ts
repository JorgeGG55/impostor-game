import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  emoji: string
  words: string[]
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    emoji: {
      type: String,
      required: true,
      default: '🎯',
    },
    words: {
      type: [String],
      required: true,
      validate: {
        validator: (words: string[]) => words.length >= 5,
        message: 'Una categoría debe tener al menos 5 palabras',
      },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Category ||
  mongoose.model<ICategory>('Category', CategorySchema)