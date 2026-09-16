// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom no expone Web Crypto API por defecto y MSAL la requiere (PKCE).
if (!global.crypto || !global.crypto.subtle) {
  global.crypto = require('node:crypto').webcrypto;
}
