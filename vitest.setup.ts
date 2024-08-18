import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vitest } from 'vitest';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vitest.clearAllMocks();
});
