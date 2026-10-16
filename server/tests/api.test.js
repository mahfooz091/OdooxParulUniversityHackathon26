import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

// Set test environment before importing server
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/test_colombiator';
process.env.JWT_SECRET = 'test_jwt_secret_key_exceeding_32_characters_for_unit_tests';

const { default: app } = await import('../server.js');

describe('API Routing and Health Probes', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = http.createServer(app);
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('GET /api/health returns 200 with ok status and service name', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.status, 'ok');
    assert.equal(data.service, 'colombiator-api');
    assert.ok(data.timestamp);
  });

  test('GET /api/index.js returns 200 health check response', async () => {
    const res = await fetch(`${baseUrl}/api/index.js`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'ok');
  });

  test('GET /api/nonexistent-route returns 404 with structured JSON envelope', async () => {
    const res = await fetch(`${baseUrl}/api/nonexistent-route`);
    assert.equal(res.status, 404);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.message, 'API route not found');
  });
});
