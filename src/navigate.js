import { dirname } from 'node:path';
import { readdir } from 'node:fs/promises';

const operations = {
  up: (currentDir) => {
    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      return currentDir;
    }

    return parentDir;
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

export const navigate = async (operation, currentDir) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid navigation operation');
  }

  return handler(currentDir);
};

const sortDirectoryContents = (entries) => {
  const directories = [];
  const files = [];
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      directories.push(entry);
    } else if (entry.isFile()) {
      files.push(entry);
    }
  }
  
  directories.sort((a, b) => a.name.localeCompare(b.name));
  
  files.sort((a, b) => a.name.localeCompare(b.name));
  
  return { directories, files };
};