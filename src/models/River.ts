import mongoose, { Schema } from 'mongoose';
import { IRiver } from '../types.js';

const riverSchema = new Schema<IRiver>(
  {
    osmId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['LineString', 'MultiLineString'],
        required: true,
      },
      coordinates: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    properties: {
      length: Number,
      width: String,
      waterway: {
        type: String,
        required: true,
      },
    },
    boundingBox: {
      minLat: {
        type: Number,
        required: true,
      },
      maxLat: {
        type: Number,
        required: true,
      },
      minLng: {
        type: Number,
        required: true,
      },
      maxLng: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
riverSchema.index({ geometry: '2dsphere' });
riverSchema.index({ osmId: 1 });
riverSchema.index({ name: 'text' });

export const River = mongoose.model<IRiver>('River', riverSchema);
