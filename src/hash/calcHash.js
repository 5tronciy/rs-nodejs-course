import { createHash } from 'crypto';
import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        await access(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    const hash = createHash('sha256');

    try {
        const stream = createReadStream(filePath);

        await pipeline(stream, hash);

        const result = hash.digest('hex');

        console.log(result);
    } catch (err) {
        throw new Error('Stream failed');
    }
};

await calculateHash();