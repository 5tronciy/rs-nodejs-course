import { spawn } from 'node:child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const childPath = join(__dirname, 'files', 'script.js');

    const child = spawn('node', [childPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2']);
