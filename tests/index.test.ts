import { getEnv, setEnv, removeEnv, listEnv, numberEnv, validateEnv } from '../src/index';

// Mock process.env to prevent real environment modification
const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv }; // Reset the environment before each test
});

afterAll(() => {
  process.env = originalEnv; // Restore original environment
});

test('getEnv returns default if env var is not set', () => {
    setEnv('TEST_VAR', '12345');
    expect(getEnv('TEST_VAR')).toBe('12345');
  expect(getEnv('NON_EXISTENT_VAR', 'default')).toBe('default');
});

test('setEnv sets and updates environment variables', () => {
  setEnv('TEST_VAR', '12345');
  expect(getEnv('TEST_VAR')).toBe('12345');
  setEnv('TEST_VAR', '54321');
  expect(getEnv('TEST_VAR')).toBe('54321');
});

test('numberEnv converts environment variable to number', () => {
  setEnv('TEST_VAR', '54321');
  expect(numberEnv('TEST_VAR')).toBe(54321);
});

test('removeEnv removes environment variables', () => {
  setEnv('TO_REMOVE', 'value');
  expect(getEnv('TO_REMOVE')).toBe('value');
  removeEnv('TO_REMOVE');
  expect(getEnv('TO_REMOVE', 'defaultvalue')).toBe("defaultvalue");
});

test('listEnv returns all environment variables', () => {
  setEnv('LIST_VAR', 'list_value');
  const envVars = listEnv();
  expect(envVars.LIST_VAR).toBe('list_value');
});

test('validateEnv validates required environment variables', () => {
  setEnv('TEST_VAR', '54321');   
  setEnv('LIST_VAR', 'list_value');
  expect(validateEnv(['TEST_VAR', 'LIST_VAR'])).toBe(true);
});
