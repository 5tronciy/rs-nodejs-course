import { Worker } from 'node:worker_threads';
import { cpus } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const numCores = cpus().length;
    const workers = [];
    const workerInstances = [];

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(join(__dirname, 'worker.js'));
        workerInstances.push(worker);

        workers.push(new Promise((resolve) => {
            worker.once('message', (data) => {
                resolve({ status: 'resolved', data });
            });

            worker.once('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.postMessage(10 + i);
        }));
    }

    const finalResults = await Promise.all(workers);

    for (const worker of workerInstances) {
        worker.terminate();
    }

    console.log(finalResults);
};

await performCalculations();