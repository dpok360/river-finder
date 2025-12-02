import { RiverData } from '../../types.js';

export const testRivers: RiverData[] = [
  {
    osmId: 'test-river-1',
    name: 'Bagmati River',
    type: 'river',
    geometry: {
      type: 'LineString',
      coordinates: [
        [85.3240, 27.7172],
        [85.3250, 27.7180],
        [85.3260, 27.7190],
      ],
    },
    properties: {
      length: 51000,
      width: '50m',
      waterway: 'river',
    },
    boundingBox: {
      minLat: 27.7172,
      maxLat: 27.7190,
      minLng: 85.3240,
      maxLng: 85.3260,
    },
  },
  {
    osmId: 'test-river-2',
    name: 'Bishnumati River',
    type: 'river',
    geometry: {
      type: 'LineString',
      coordinates: [
        [85.3000, 27.7125],
        [85.3010, 27.7130],
        [85.3020, 27.7140],
      ],
    },
    properties: {
      length: 31000,
      width: '30m',
      waterway: 'river',
    },
    boundingBox: {
      minLat: 27.7125,
      maxLat: 27.7140,
      minLng: 85.3000,
      maxLng: 85.3020,
    },
  },
  {
    osmId: 'test-river-3',
    name: 'Manohara River',
    type: 'river',
    geometry: {
      type: 'LineString',
      coordinates: [
        [85.3600, 27.7000],
        [85.3610, 27.7010],
        [85.3620, 27.7020],
      ],
    },
    properties: {
      length: 38000,
      width: '40m',
      waterway: 'river',
    },
    boundingBox: {
      minLat: 27.7000,
      maxLat: 27.7020,
      minLng: 85.3600,
      maxLng: 85.3620,
    },
  },
];

export const validCoordinates = {
  kathmandu: { lat: 27.7172, lng: 85.3240 },
  westKathmandu: { lat: 27.7125, lng: 85.3000 },
  eastKathmandu: { lat: 27.7000, lng: 85.3600 },
  northPole: { lat: 90, lng: 0 },
  southPole: { lat: -90, lng: 0 },
  dateLine: { lat: 0, lng: 180 },
  primeMeridian: { lat: 0, lng: 0 },
};

export const invalidCoordinates = {
  latTooHigh: { lat: 91, lng: 85.3240 },
  latTooLow: { lat: -91, lng: 85.3240 },
  lngTooHigh: { lat: 27.7172, lng: 181 },
  lngTooLow: { lat: 27.7172, lng: -181 },
};
