import fs from 'fs';
import mongoose from 'mongoose';
import { River } from '../models/River.js';
import { connectDB } from '../config/database.js';
import { BATCH_SIZE } from '../config/constants.js';
import {RiverData} from "../types.js";

const saveBatch = async (batch: RiverData[]): Promise<number> => {
  if (!batch.length) return 0;

  await River.bulkWrite(
    batch.map((data) => ({
      updateOne: { filter: { osmId: data.osmId }, update: data, upsert: true },
    }))
  );

  return batch.length;
};

const importGeoJSON = async (geoJsonFile: string) => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        const raw = fs.readFileSync(geoJsonFile, 'utf-8');
        const geojson = JSON.parse(raw);

        if (!geojson.features) throw new Error('Invalid GeoJSON');

        let batch: any[] = [];
        let processed = 0;
        let saved = 0;

        for (const feature of geojson.features) {
            const props = feature.properties || {};
            const geom = feature.geometry;

            if (!geom || geom.type !== 'LineString' || !props.name || !props.waterway) continue;

            const latitudes = geom.coordinates.map((c: any) => c[1]);
            const longitudes = geom.coordinates.map((c: any) => c[0]);

            batch.push({
                osmId: props.id?.toString() || `generated-${Date.now()}-${Math.random()}`,
                name: props.name,
                type: props.waterway,
                geometry: geom,
                properties: {
                    waterway: props.waterway,
                    width: props.width,
                    length: props.length ? parseFloat(props.length) : undefined,
                },
                boundingBox: {
                    minLat: Math.min(...latitudes),
                    maxLat: Math.max(...latitudes),
                    minLng: Math.min(...longitudes),
                    maxLng: Math.max(...longitudes),
                },
            });

            processed++;
            if (batch.length >= BATCH_SIZE) {
                saved += await saveBatch(batch);
                batch = [];
            }
        }

        saved += await saveBatch(batch);
        console.log(`Complete: ${processed} processed, ${saved} saved`);
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const geoJsonFile = process.argv[2];
if (!geoJsonFile || !fs.existsSync(geoJsonFile)) {
    console.error('Usage: yarn import-geojson <path-to-geojson-file>');
    process.exit(1);
}

importGeoJSON(geoJsonFile);
