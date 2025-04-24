import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const inputPath = join(__dirname, 'files', 'fileToCompress.txt');
    const outputPath = join(__dirname, 'files', 'archive.gz');

    try {
        await access(inputPath);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        const source = createReadStream(inputPath);
        const destination = createWriteStream(outputPath);
        const gzip = createGzip();

        await pipeline(source, gzip, destination);
    } catch (err) {
        throw new Error('Stream failed');
    }
};

await compress();