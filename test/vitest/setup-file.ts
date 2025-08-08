// This file will be run before each test file
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { Notify } from 'quasar';

// Mock browser globals that Quasar expects
Object.defineProperty(global, 'navigator', {
  value: {
    userAgent: 'node.js',
    platform: 'node',
  },
  writable: true,
});

Object.defineProperty(global, 'document', {
  value: globalThis.document || {},
  writable: true,
});

Object.defineProperty(global, 'window', {
  value: globalThis.window || global,
  writable: true,
});

installQuasarPlugin({ plugins: { Notify } });
