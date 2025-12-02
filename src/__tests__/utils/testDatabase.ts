import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { River } from '../../models/River.js';
import { RiverData } from '../../types.js';

let mongoServer: MongoMemoryServer;

export const testDatabase = {
  async connect(): Promise<void> {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri);
  },

  async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  },

  async clearDatabase(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
    }
  },

  async seedRivers(rivers: RiverData[]): Promise<void> {
    await River.insertMany(rivers);
    // Ensure geospatial index exists
    await River.collection.createIndex({ geometry: '2dsphere' });
  },
};
