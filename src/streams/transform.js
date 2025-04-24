import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const reverseTransform = new Transform({
    transform(chunk, _encoding, callback) {
        const input = chunk.toString().trim();
        const reversed = input.split('').reverse().join('');
        this.push(reversed + '\n');
        callback();
    }
});

const transform = async () => {
    try {
        await pipeline(
            process.stdin,
            reverseTransform,
            process.stdout
        );
    } catch {
        throw new Error('Stream failed');
    }
};

await transform();