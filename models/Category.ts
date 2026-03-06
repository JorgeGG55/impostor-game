import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  emoji: string
  words: string[]
  createdAt: Date
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
        message: 'A category must have at least 5 words',
      },
    },
  },
  {
    timestamps: true,
  }
)

// Evitar re-compilar el modelo en hot reload
export default mongoose.models.Category ||
  mongoose.model<ICategory>('Category', CategorySchema)