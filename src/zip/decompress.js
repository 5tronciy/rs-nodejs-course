import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const inputPath = join(__dirname, 'files', 'archive.gz');
    const outputPath = join(__dirname, 'files', 'fileToCompress.txt');

    try {
        await access(inputPath);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        const source = createReadStream(inputPath);
        const gunzip = createGunzip();
        const destination = createWriteStream(outputPath);

        await pipeline(source, gunzip, destination);
    } catch (err) {
        throw new Error('Stream failed');
    }
};

await decompress();