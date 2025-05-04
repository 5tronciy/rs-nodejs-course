import { createReadStream } from 'node:fs';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve, isAbsolute } from 'node:path';

const operations = {
  cat: async (currentDir, path) => {
    const newPath = isAbsolute(path) ? path : resolve(currentDir, path);
    const stream = createReadStream(newPath);

    stream.pipe(process.stdout);

    stream.on('end', () => {
      process.stdout.write('\n');
    });
  },
  add: async (currentDir, fileName) => {
    const path = resolve(currentDir, fileName);

    await writeFile(path, '', { flag: 'wx' });
  },
  mkdir: async (currentDir, dirName) => {
    const path = resolve(currentDir, dirName);
    await mkdir(path);
  },
  rn: async (currentDir, path, newFileName) => {
    const oldPath = isAbsolute(path) ? path : resolve(currentDir, path);
    const newPath = resolve(dirname(oldPath), newFileName);

    await rename(oldPath, newPath);
  },
};

export const file = async (operation, currentDir, path, newFileName) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid file operation');
  }

  return operation === 'rn' ? handler(currentDir, path, newFileName) : handler(currentDir, path);
};
