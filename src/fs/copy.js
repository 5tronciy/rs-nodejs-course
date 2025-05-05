import { access, cp } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const src = join(__dirname, 'files');
    const dest = join(__dirname, 'files_copy');

    try {
        await access(src);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    try {
        await access(dest);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw new Error('FS operation failed');
        }
    }

    try {
        await cp(src, dest, { recursive: true });
    } catch (err) {
        throw new Error('FS operation failed');
    }

};

await copy();
