import { dirname } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { resolvePath, sortDirectoryContents } from './utils.js';

const operations = {
  up: (currentDir) => {
    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      return currentDir;
    }

    return parentDir;
  },
  cd: async (currentDir, targetPath) => {
    const newPath = resolvePath(currentDir, targetPath);

    const stats = await stat(newPath);
    if (!stats.isDirectory()) {
      throw new Error('Not a directory');
    }
    return newPath;
  },
  ls: async (currentDir) => {
    const entries = await readdir(currentDir, { withFileTypes: true });
    const sortedContents = sortDirectoryContents(entries);

    const formattedEntries = [
      ...sortedContents.directories.map((dir) => ({
        Name: dir.name,
        Type: 'directory'
      })),
      ...sortedContents.files.map((file) => ({
        Name: file.name,
        Type: 'file'
      }))
    ];

    console.table(formattedEntries);
    return currentDir;
  }
};

export const navigate = async (operation, currentDir, targetPath) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid navigation operation');
  }
  return operation === 'cd' ? handler(currentDir, targetPath) : handler(currentDir);
};
