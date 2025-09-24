import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

/**
 * Connect to DB.
 * - If process.env.MONGO_URI is set (prod), connect to it.
 * - Otherwise start MongoMemoryServer (dev).
 */
export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    // Connect to provided URI (production)
    await mongoose.connect(mongoUri, {} as mongoose.ConnectOptions);
    console.log('Connected to MongoDB (MONGO_URI).');
    return;
  }

  // Use in-memory server
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'voiceowl',
    }
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('Connected to in-memory MongoDB (MongoMemoryServer).');
}

/** Disconnect and cleanup in-memory server (used in tests / graceful shutdown) */
export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
}
