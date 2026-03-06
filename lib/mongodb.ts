import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Extender el tipo global para evitar el error de TypeScript
const globalWithMongoose = global as typeof globalThis & {
  _mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

if (!globalWithMongoose._mongooseCache) {
  globalWithMongoose._mongooseCache = { conn: null, promise: null }
}

const cached = globalWithMongoose._mongooseCache

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB