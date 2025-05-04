import { createReadStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';

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
};

export const file = async (operation, currentDir, path) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid file operation');
  }

  return handler(currentDir, path);
};
