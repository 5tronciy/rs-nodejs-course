import { dirname } from 'node:path';

const operations = {
  up: (currentDir) => {
    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      return currentDir;
    }

    return parentDir;
  },
};

export const navigate = async (operation, currentDir) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid navigation operation');
  }

  return handler(currentDir);
};