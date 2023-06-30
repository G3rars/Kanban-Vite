import mongoose from 'mongoose'

const connectionString = process.env.MONGO_DB as string

export const connectMongoDB = async () => {
  // ready state nos devuelve el estado de la coneccion
  // pon el mouse encima de ready state para ver los demas estados
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  }

  return await mongoose.connect(connectionString)
}
