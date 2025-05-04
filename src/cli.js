import { createInterface } from 'node:readline/promises';
import { file } from './file.js';
import { hash } from './hash.js';
import { navigate } from './navigate.js';
import { systemInfo } from './systemInfo.js';

function completer(line) {
  var completions = ['.exit', 'up', 'cd', 'ls', 'cat', 'add', 'mkdir', 'rn', 'cp', 'mv', 'rm', 'os', 'hash'];
  var hits = completions.filter((c) => { return c.indexOf(line) == 0 })
  return [hits.length ? hits : completions, line]
}

export const startCLI = async (currentDir) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    completer,
  });

  const commandHandlers = {
    up: async () => {
      currentDir = await navigate('up', currentDir);
    },
    cd: async ([path]) => {
      if (!path) return console.log('Invalid input');

      currentDir = await navigate('cd', currentDir, path);
    },
    ls: async () => {
      await navigate('ls', currentDir);
    },
    cat: async ([path]) => {
      if (!path) return console.log('Invalid input');

      await file('cat', currentDir, path);
    },
    add: async ([fileName]) => {
      if (!fileName) return console.log('Invalid input');

      await file('add', currentDir, fileName);
    },
    mkdir: async ([dirName]) => {
      if (!dirName) return console.log('Invalid input');

      await file('mkdir', currentDir, dirName);
    },
    rn: async ([path, newFileName]) => {
      if (!path || !newFileName) return console.log('Invalid input');

      await file('rn', currentDir, path, newFileName);
    },
    cp: async ([pathToFile, pathToDirectory]) => {
      if (!pathToFile || !pathToDirectory) return console.log('Invalid input');

      await file('cp', currentDir, pathToFile, pathToDirectory);
    },
    mv: async ([pathToFile, pathToDirectory]) => {
      if (!pathToFile || !pathToDirectory) return console.log('Invalid input');

      await file('mv', currentDir, pathToFile, pathToDirectory);
    },
    rm: async ([path]) => {
      if (!path) return console.log('Invalid input');

      await file('rm', currentDir, path);
    },
    os: async ([flag]) => {
      if (!flag || !flag.startsWith('--')) return console.log('Invalid input');

      await systemInfo(flag);
    },
    hash: async ([path]) => {
      if (!path) return console.log('Invalid input');

      await hash(currentDir, path);
    },
  }

  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');

    if (command === '.exit') {
      rl.close();
      return;
    }

    try {
      const handler = commandHandlers[command];
      if (handler) {
        await handler(args);
        console.log(`\nYou are currently in ${currentDir}`);
      } else {
        console.log('Invalid input');
      }
    } catch (error) {
      console.log('Operation failed');
    }

    rl.prompt();
  });

  return new Promise((resolve) => {
    rl.on('close', () => {
      resolve();
    });
  });
};