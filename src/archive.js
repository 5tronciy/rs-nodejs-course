import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolvePath } from './utils.js';

const operations = {
  compress: async (readStream, writeStream) => {
    const brotliCompress = createBrotliCompress();
    await pipeline(readStream, brotliCompress, writeStream);
  },
};

export const archive = async (operation, currentDir, sourcePath, destPath) => {
  const sourceFullPath = resolvePath(currentDir, sourcePath);
  const destFullPath = resolvePath(currentDir, destPath);

  try {
    const readStream = createReadStream(sourceFullPath);
    const writeStream = createWriteStream(destFullPath);

    const handler = operations[operation];
    if (!handler) {
      throw new Error('Invalid compression operation');
    }

    await handler(readStream, writeStream);
    console.log(`File ${operation}ed: ${sourcePath} → ${destPath}`);
  } catch (error) {
    throw new Error(`Compression operation failed: ${error.message}`);
  }
};
