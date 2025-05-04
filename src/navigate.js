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

    console.log('\nName\tType');
    console.log('-------------------');

    sortedContents.directories.forEach(dir => {
      console.log(`${dir.name}\tdirectory`);
    });

    sortedContents.files.forEach(file => {
      console.log(`${file.name}\tfile`);
    });

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
