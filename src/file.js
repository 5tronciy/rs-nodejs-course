import { createReadStream } from 'node:fs';
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
};

export const file = async (operation, currentDir, path) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid file operation');
  }

  return handler(currentDir, path);
};
