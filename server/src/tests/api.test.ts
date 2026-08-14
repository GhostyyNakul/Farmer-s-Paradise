import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'node:http';
import type { Server } from 'node:http';
import { createApp } from '../app.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Laboratory } from '../models/Laboratory.js';

const TEST_EMAIL = `test-${Date.now()}@farmersparadise.dev`;
const TEST_PASSWORD = 'TestPass123!';

let server: Server;
let baseUrl: string;
let accessToken: string;
let farmId: string;

function apiRequest(method: string, path: string, body?: unknown, token?: string) {
  return new Promise<{ status: number; body: Record<string, unknown> }>((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const payload = body ? JSON.stringify(body) : undefined;

    const req = request(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode ?? 0, body: JSON.parse(data || '{}') });
          } catch {
            resolve({ status: res.statusCode ?? 0, body: { raw: data } });
          }
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

describe('Farmer\'s Paradise API', () => {
  before(async () => {
    await connectDatabase();
    const app = createApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const addr = server.address();
        const port = typeof addr === 'object' && addr ? addr.port : 5000;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });

    await Laboratory.create({
      name: 'Test Lab',
      address: 'Test Address, Delhi',
      latitude: 28.6139,
      longitude: 77.209,
      services: ['N-P-K Test'],
      rating: 4.5,
      isVerified: true,
      averageTurnaround: '48 Hours',
    });
  });

  after(async () => {
    await User.deleteMany({ email: TEST_EMAIL });
    await Laboratory.deleteMany({ name: 'Test Lab' });
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await disconnectDatabase();
  });

  it('GET /api/health returns ok', async () => {
    const res = await apiRequest('GET', '/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it('POST /api/auth/register creates user', async () => {
    const res = await apiRequest('POST', '/api/auth/register', {
      name: 'Test Farmer',
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    const data = res.body.data as { accessToken: string };
    assert.ok(data.accessToken);
    accessToken = data.accessToken;
  });

  it('POST /api/auth/login works', async () => {
    const res = await apiRequest('POST', '/api/auth/login', {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it('GET /api/auth/me requires auth', async () => {
    const unauth = await apiRequest('GET', '/api/auth/me');
    assert.equal(unauth.status, 401);

    const auth = await apiRequest('GET', '/api/auth/me', undefined, accessToken);
    assert.equal(auth.status, 200);
    assert.equal(auth.body.success, true);
  });

  it('POST /api/farms creates farm', async () => {
    const res = await apiRequest(
      'POST',
      '/api/farms',
      { name: 'Test Farm', totalArea: 5, soilType: 'Loam' },
      accessToken
    );
    assert.equal(res.status, 201);
    const data = res.body.data as { _id: string };
    farmId = data._id;
    assert.ok(farmId);
  });

  it('POST /api/crops creates crop', async () => {
    const res = await apiRequest(
      'POST',
      '/api/crops',
      { farmId, name: 'Test Wheat', variety: 'HD-2967' },
      accessToken
    );
    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
  });

  it('POST /api/soil/samples creates sample with code', async () => {
    const res = await apiRequest(
      'POST',
      '/api/soil/samples',
      { farmId, notes: 'Test sample' },
      accessToken
    );
    assert.equal(res.status, 201);
    const data = res.body.data as { sampleCode: string };
    assert.match(data.sampleCode, /^FH-\d{4}-\d{6}$/);
  });

  it('GET /api/labs/nearby returns labs', async () => {
    const res = await apiRequest('GET', '/api/labs/nearby?lat=28.6139&lng=77.2090&radius=50');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    const data = res.body.data as unknown[];
    assert.ok(Array.isArray(data));
  });

  it('POST /api/ai/chat validates and responds', async () => {
    const res = await apiRequest(
      'POST',
      '/api/ai/chat',
      { message: 'My tomato leaves are turning yellow', farmId },
      accessToken
    );
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    const data = res.body.data as { summary: string; confidence: string };
    assert.ok(data.summary);
    assert.ok(['low', 'medium', 'high'].includes(data.confidence));
  });

  it('GET /api/weather returns data', async () => {
    const res = await apiRequest('GET', '/api/weather?lat=28.6139&lng=77.2090');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });
});
