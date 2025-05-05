import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolvePath } from './utils.js';

export const hash = async (currentDir, path) => {
  const filePath = resolvePath(currentDir, path);

  try {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    await pipeline(stream, hash);

    const fileHash = hash.digest('hex');

    console.log(`Hash for ${path}: ${fileHash}`);
  } catch (error) {
    throw new Error(`Failed to calculate hash: ${error.message}`);
  }
};
