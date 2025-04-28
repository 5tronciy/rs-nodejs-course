import { parentPort } from 'node:worker_threads';

if (!parentPort) {
    throw new Error('Not running inside a worker thread');
}

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (n) => {
    const result = nthFibonacci(n);
    parentPort.postMessage(result);
};

parentPort.once('message', (n) => {
    sendResult(n);
});