// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom no expone Web Crypto API por defecto y MSAL la requiere (PKCE).
if (!global.crypto || !global.crypto.subtle) {
  global.crypto = require('node:crypto').webcrypto;
}

// jsdom no implementa ResizeObserver; lo usa PointerHighlight (Home).
if (!global.ResizeObserver) {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom no implementa matchMedia; lo usa SqueezeCarousel (prefers-reduced-motion).
if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}
