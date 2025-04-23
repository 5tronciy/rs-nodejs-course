import { access, rename as fsRename } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const folder = join(__dirname, 'files');
    const oldPath = join(folder, 'wrongFilename.txt');
    const newPath = join(folder, 'properFilename.md');

    try {
        await access(oldPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }

    try {
        await access(newPath);
        throw new Error('FS operation failed'); // new file already exists
    } catch (err) {
        if (err.code !== 'ENOENT') throw new Error('FS operation failed');
    }

    try {
        await fsRename(oldPath, newPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();