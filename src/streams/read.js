import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    try {
        const stream = createReadStream(filePath);

        stream.pipe(process.stdout);

        stream.on('end', () => {
            process.stdout.write('\n');
        });
    } catch (err) {
        throw new Error('Stream failed');
    }
};

await read();