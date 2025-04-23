import { access, readFile } from 'node:fs/promises';
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
        const content = await readFile(filePath, 'utf-8');
        console.log(content);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await read();