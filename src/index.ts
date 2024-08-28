import fs from 'fs';
import path from 'path';

const DEFAULT_ENV_FILE_PATH = path.resolve(process.cwd(), '.env');
let envLoaded = false;

// Function to ensure .env file exists or create it
const ensureEnvFileExists = (filePath: string = DEFAULT_ENV_FILE_PATH): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', { flag: 'wx' }); // Create .env if it doesn't exist
  }
};

// Function to manually load environment variables from the .env file
const loadEnv = (filePath: string = DEFAULT_ENV_FILE_PATH): void => {
  if (!envLoaded) {
    if (fs.existsSync(filePath)) {
      const envContent = fs.readFileSync(filePath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const delimiterIndex = trimmedLine.indexOf('=');
          if (delimiterIndex !== -1) {
            const key = trimmedLine.substring(0, delimiterIndex).trim();
            const value = trimmedLine.substring(delimiterIndex + 1).trim();
            if (key) {
              process.env[key] = value;
            }
          }
        }
      });
    }
    envLoaded = true;
  }
};

// Function to get an environment variable
export const getEnv = (key: string, defaultValue: string | null = null): string | null => {
  if (!key) {
    throw new Error(`Missing key parameter, please add a key to get an env variable.`);
  } else {
    loadEnv();
    if (!process.env[key] && defaultValue === null) {
      throw new Error(`Missing key ${key}, please add it to .env or use a default value.`);
    } else {
      return process.env[key] || defaultValue;
    }
  }
};

// Function to set or update an environment variable
export const setEnv = (key: string, value: string, filePath: string = DEFAULT_ENV_FILE_PATH): void => {
  loadEnv();
  process.env[key] = value;

  ensureEnvFileExists(filePath);
  let envContent = fs.readFileSync(filePath, 'utf-8');
  const envRegex = new RegExp(`^${key}=.*`, 'm');

  if (envRegex.test(envContent)) {
    envContent = envContent.replace(envRegex, `${key}=${value}`);
  } else {
    envContent += `\n${key}=${value}`;
  }

  fs.writeFileSync(filePath, envContent.trim() + '\n');
};

// Function to remove an environment variable
export const removeEnv = (key: string, filePath: string = DEFAULT_ENV_FILE_PATH): void => {
  loadEnv();
  delete process.env[key];

  ensureEnvFileExists(filePath);
  let envContent = fs.readFileSync(filePath, 'utf-8');
  const envRegex = new RegExp(`^${key}=.*`, 'm');

  if (envRegex.test(envContent)) {
    envContent = envContent.replace(envRegex, '').trim();
    fs.writeFileSync(filePath, envContent + '\n');
  }
};

// Function to convert environment variable to number
export const numberEnv = (key: string): number => {
    if (!key) {
        throw new Error(`Missing key parameter, please add a key to get an env variable.`);
      } else {
          loadEnv();
        if (!process.env[key]) {
            throw new Error(`Missing key ${key}, please add it to .env`);
          } else {
              return Number(process.env[key]);
          }
      }
};

// Function to list all environment variables loaded from .env
export const listEnv = (): { [key: string]: string | undefined } => {
  loadEnv();
  return { ...process.env };
};

// Validate required environment variables
export const validateEnv = (keys: string[] = []): boolean => {
  const missingKeys = keys.filter(key => !process.env[key]);
  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
  } else {
    return true;
  }
};
