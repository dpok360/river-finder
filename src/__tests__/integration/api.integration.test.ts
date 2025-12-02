import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { testDatabase } from '../utils/testDatabase.js';
import { testRivers } from '../utils/testFixtures.js';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await testDatabase.connect();
  });

  afterAll(async () => {
    await testDatabase.disconnect();
  });

  beforeEach(async () => {
    await testDatabase.clearDatabase();
    await testDatabase.seedRivers(testRivers);
  });

  describe('GET /api/rivers/nearby', () => {
    it('should return nearby river with valid coordinates', async () => {
      const response = await request(app)
        .get('/api/rivers/nearby')
        .query({ lat: 27.7172, lng: 85.3240, radius: 5 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
    });

    it('should return 400 for missing latitude', async () => {
      const response = await request(app)
        .get('/api/rivers/nearby')
        .query({ lng: 85.3240, radius: 5 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Latitude');
    });

    it('should return 400 for invalid latitude', async () => {
      const response = await request(app)
        .get('/api/rivers/nearby')
        .query({ lat: 95, lng: 85.3240, radius: 5 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid longitude', async () => {
      const response = await request(app)
        .get('/api/rivers/nearby')
        .query({ lat: 27.7172, lng: 185, radius: 5 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return empty array when no rivers nearby', async () => {
      const response = await request(app)
        .get('/api/rivers/nearby')
        .query({ lat: 0, lng: 0, radius: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.total).toBe(0);
    });
  });

  describe('GET /', () => {
    it('should return API info', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('River Finder API');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('GET /invalid-route', () => {
    it('should return 404 for invalid routes', async () => {
      const response = await request(app).get('/invalid-route');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Not found');
    });
  });
});
