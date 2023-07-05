import request from 'supertest';
import { Request, Response } from 'express';
import { getRegions, getState, getLocalGov } from '../locale/locale.controller';

describe('Location API', () => {
  describe('GET /location/region', () => {
    it('should return regions', async () => {
      const response = await request(getRegions).get('/location/region');
      expect(response.status).toBe(200);
      expect(response.body.regions).toBeDefined();
      expect(response.body.regions.length).toBeGreaterThan(0);
    });

    it('should return regions filtered by LGA', async () => {
      const response = await request(getRegions).get('/location/region?lga=true');
      expect(response.status).toBe(200);
      expect(response.body.regions).toBeDefined();
      expect(response.body.regions.length).toBeGreaterThan(0);
      expect(response.body.regions[0].lgas).toBeDefined();
    });
  });

  describe('GET /location/state', () => {
    it('should return states', async () => {
      const response = await request(getState).get('/location/state');
      expect(response.status).toBe(200);
      expect(response.body.states).toBeDefined();
      expect(response.body.states.length).toBeGreaterThan(0);
    });

    it('should return states filtered by name and LGA', async () => {
      const response = await request(getState).get('/location/state?state_name=New%20York&lga=true');
      expect(response.status).toBe(200);
      expect(response.body.states).toBeDefined();
      expect(response.body.states.length).toBeGreaterThan(0);
      expect(response.body.states[0].lgas).toBeDefined();
    });
  });

  describe('GET /location/lga', () => {
    it('should return LGAs', async () => {
      const response = await request(getLocalGov).get('/location/lga');
      expect(response.status).toBe(200);
      expect(response.body.lgas).toBeDefined();
      expect(response.body.lgas.length).toBeGreaterThan(0);
    });

    it('should return LGAs filtered by name', async () => {
      const response = await request(getLocalGov).get('/location/lga?lga_name=Lagos');
      expect(response.status).toBe(200);
      expect(response.body.lgas).toBeDefined();
      expect(response.body.lgas.length).toBeGreaterThan(0);
    });
  });
});
