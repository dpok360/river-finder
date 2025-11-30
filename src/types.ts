import { Document } from 'mongoose';

export interface IRiver extends Document {
  osmId: string;
  name: string;
  type: string;
  geometry: {
    type: 'LineString' | 'MultiLineString';
    coordinates: number[][] | number[][][];
  };
  properties: {
    length?: number;
    width?: string;
    waterway: string;
  };
  boundingBox: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
