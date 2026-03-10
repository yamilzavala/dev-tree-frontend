import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import server from './mocks/server';
import { resetMockData } from './mocks/handlers';

// Extend Jest's matchers with Testing Library's matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
  resetMockData();
});

// Start server before all tests
beforeAll(() => {
  server.listen();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

// Reset handlers after each test (important for test isolation)
afterEach(() => {
  server.resetHandlers();
});
