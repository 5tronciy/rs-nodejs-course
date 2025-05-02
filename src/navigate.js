import { dirname } from 'node:path';

export const navigate = async (operation, currentDir) => {
  if (operation === 'up') {
    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      return currentDir;
    }

    return parentDir;
  }
};