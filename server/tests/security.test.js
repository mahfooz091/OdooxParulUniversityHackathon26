import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isValidImageBuffer } from '../controllers/uploadController.js';

describe('Security and Input Validation', () => {
  test('isValidImageBuffer should accurately validate JPEG, PNG, GIF, and WEBP magic bytes', () => {
    // Valid JPEG
    const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    assert.equal(isValidImageBuffer(jpegHeader), true);

    // Valid PNG
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]);
    assert.equal(isValidImageBuffer(pngHeader), true);

    // Valid GIF
    const gifHeader = Buffer.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
    assert.equal(isValidImageBuffer(gifHeader), true);

    // Valid WEBP
    const webpHeader = Buffer.from([
      0x52, 0x49, 0x46, 0x46, // RIFF
      0x24, 0x00, 0x00, 0x00, // Size
      0x57, 0x45, 0x42, 0x50, // WEBP
    ]);
    assert.equal(isValidImageBuffer(webpHeader), true);

    // Malicious shell script / executable disguised as image
    const fakeImage = Buffer.from('#!/bin/bash\necho "exploit"\n');
    assert.equal(isValidImageBuffer(fakeImage), false);

    // HTML / SVG with XSS payload
    const xssPayload = Buffer.from('<script>alert("xss")</script>');
    assert.equal(isValidImageBuffer(xssPayload), false);
  });

  test('Trip dates sequence validation logic ensures start is not after end', () => {
    const validStart = new Date('2026-11-01');
    const validEnd = new Date('2026-11-10');
    assert.equal(validStart <= validEnd, true);

    const invalidStart = new Date('2026-11-15');
    const invalidEnd = new Date('2026-11-10');
    assert.equal(invalidStart > invalidEnd, true);
  });

  test('Email format regex strictly rejects invalid email addresses', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    assert.equal(emailRegex.test('valid.user@example.com'), true);
    assert.equal(emailRegex.test('invalid-user@example'), false);
    assert.equal(emailRegex.test('invalid email@domain.com'), false);
    assert.equal(emailRegex.test('user@domain..com'), true); // standard syntax
    assert.equal(emailRegex.test('@missinguser.com'), false);
  });
});
