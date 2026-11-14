import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  bytesToBase64Url,
  randomBase64Url,
  sha256Base64Url,
} from '../src/lib/crypto.ts';

test('base64url replaces reserved characters and removes padding', () => {
  assert.equal(bytesToBase64Url(new Uint8Array([251, 255])), '-_8');
  assert.equal(bytesToBase64Url(new Uint8Array()), '');
});

test('PKCE S256 matches the RFC 7636 Appendix B example', async () => {
  const verifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
  assert.equal(
    await sha256Base64Url(verifier),
    'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
  );
});

test('32 bytes of entropy produce a verifier with the PKCE length and alphabet', () => {
  assert.match(randomBase64Url(32), /^[A-Za-z0-9_-]{43}$/);
});
