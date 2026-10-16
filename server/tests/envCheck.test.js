import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnv } from '../config/envCheck.js';

describe('Environment Validator (validateEnv)', () => {
  const origEnv = { ...process.env };

  test('should pass with valid MONGO_URI and 32+ character JWT_SECRET', () => {
    process.env.NODE_ENV = 'production';
    process.env.MONGO_URI = 'mongodb+srv://user:pass@cluster.mongodb.net/colombiator';
    process.env.JWT_SECRET = 'a_very_secure_long_secret_key_exceeding_32_characters';

    const result = validateEnv();
    assert.equal(result.isValid, true);
    assert.equal(result.errors.length, 0);
  });

  test('should report error in production when MONGO_URI is missing', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.MONGO_URI;
    process.env.JWT_SECRET = 'a_very_secure_long_secret_key_exceeding_32_characters';

    assert.throws(() => {
      validateEnv();
    }, /Production environment configuration failed/);
  });

  test('should report error in production when JWT_SECRET is too short (<32 chars)', () => {
    process.env.NODE_ENV = 'production';
    process.env.MONGO_URI = 'mongodb+srv://user:pass@cluster.mongodb.net/colombiator';
    process.env.JWT_SECRET = 'short_secret';

    assert.throws(() => {
      validateEnv();
    }, /JWT_SECRET should be at least 32 characters/);
  });

  // Restore env
  process.env = origEnv;
});
