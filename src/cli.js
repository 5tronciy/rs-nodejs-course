import { createInterface } from 'node:readline/promises';
import { navigate } from './navigate.js';

function completer(line) {
  var completions = ['.exit'];
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