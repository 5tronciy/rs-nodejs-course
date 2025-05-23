import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rename, writeFile, unlink } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { resolvePath } from './utils.js';

const operations = {
  cat: async (currentDir, path) => {
    const newPath = resolvePath(currentDir, path);
    const stream = createReadStream(newPath);

    stream.pipe(process.stdout);

    stream.on('end', () => {
      process.stdout.write('\n');
    });
  },
  add: async (currentDir, fileName) => {
    const path = resolve(currentDir, fileName);

    await writeFile(path, '', { flag: 'wx' });
  },
  mkdir: async (currentDir, dirName) => {
    const path = resolve(currentDir, dirName);
    await mkdir(path);
  },
  rn: async (currentDir, path, newFileName) => {
    const oldPath = resolvePath(currentDir, path);
    const newPath = resolve(dirname(oldPath), newFileName);

    await rename(oldPath, newPath);
  },
  cp: async (currentDir, pathToFile, pathToDirectory) => {
    const sourcePath = resolvePath(currentDir, pathToFile);
    const targetDir = resolvePath(currentDir, pathToDirectory);
    const fileName = basename(sourcePath);
    const destinationPath = resolve(targetDir, fileName);

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    await pipeline(readStream, writeStream);
  },
  mv: async (currentDir, pathToFile, pathToDirectory) => {
    const sourcePath = resolvePath(currentDir, pathToFile);
    const targetDir = resolvePath(currentDir, pathToDirectory);
    const fileName = basename(sourcePath);
    const destinationPath = resolve(targetDir, fileName);

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    await pipeline(readStream, writeStream);
    await unlink(sourcePath);
  },
  rm: async (currentDir, path) => {
    const newPath = resolvePath(currentDir, path);

    await unlink(newPath);
  }
};

export const file = async (operation, currentDir, path, newFileName) => {
  const handler = operations[operation];

  if (!handler) {
    throw new Error('Invalid file operation');
  }

  return ['rn', 'cp', 'mv'].includes(operation) ? handler(currentDir, path, newFileName) : handler(currentDir, path);
};
