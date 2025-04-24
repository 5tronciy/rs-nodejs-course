import { createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const dirPath = join(__dirname, 'files');

    try {
      await access(dirPath);
    } catch {
      throw new Error('FS operation failed');
    }
  
    try {
      const stream = createWriteStream(filePath);

      await pipeline(process.stdin, stream);
    } catch {
      throw new Error('Stream failed');
    }
};

await write();