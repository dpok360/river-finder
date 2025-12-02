import { RiverData } from '../../types.js';

export const testGenerators = {
  generateValidCoordinates(): { lat: number; lng: number } {
    const lat = Math.random() * 180 - 90; // -90 to 90
    const lng = Math.random() * 360 - 180; // -180 to 180
    return { lat, lng };
  },

  generateInvalidCoordinates(): { lat: number; lng: number } {
    const choice = Math.floor(Math.random() * 4);
    switch (choice) {
      case 0:
        return { lat: 91 + Math.random() * 100, lng: 0 }; // lat too high
      case 1:
        return { lat: -91 - Math.random() * 100, lng: 0 }; // lat too low
      case 2:
        return { lat: 0, lng: 181 + Math.random() * 100 }; // lng too high
      default:
        return { lat: 0, lng: -181 - Math.random() * 100 }; // lng too low
    }
  },

  generateValidRadius(): number {
    return Math.random() * 100; // 0 to 100
  },

  generateInvalidRadius(): number {
    const choice = Math.floor(Math.random() * 2);
    if (choice === 0) {
      return -1 - Math.random() * 100; // negative
    } else {
      return 101 + Math.random() * 100; // > 100
    }
  },

  generateRiverData(overrides?: Partial<RiverData>): RiverData {
    const coords = this.generateValidCoordinates();
    const id = Math.random().toString(36).substring(7);
    
    return {
      osmId: `test-river-${id}`,
      name: `Test River ${id}`,
      type: 'river',
      geometry: {
        type: 'LineString',
        coordinates: [
          [coords.lng, coords.lat],
          [coords.lng + 0.01, coords.lat + 0.01],
        ],
      },
      properties: {
        length: Math.floor(Math.random() * 100000),
        width: `${Math.floor(Math.random() * 100)}m`,
        waterway: 'river',
      },
      boundingBox: {
        minLat: coords.lat,
        maxLat: coords.lat + 0.01,
        minLng: coords.lng,
        maxLng: coords.lng + 0.01,
      },
      ...overrides,
    };
  },
};
