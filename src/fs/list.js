import { access, readdir } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const folderPath = join(__dirname, 'files');

    try {
        await access(folderPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    try {
        const files = await readdir(folderPath);
        console.log(files);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await list();