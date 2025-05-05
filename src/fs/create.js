import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const fileContent = 'I am fresh and young';

    try {
        await writeFile(filePath, fileContent, { flag: 'wx' });
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await create();