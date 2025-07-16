import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Conectado correctamente a MongoDB');
  } catch (error) {
    console.error('⛔ Error al conectar a MongoDB:', error.message);
  }
}
