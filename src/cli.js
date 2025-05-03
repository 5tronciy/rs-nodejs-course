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

  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');

    if (command === '.exit') {
      rl.close();
      return;
    }

    try {
      if (command === 'up') {
        currentDir = await navigate('up', currentDir);
        console.log(`\nYou are currently in ${currentDir}`);
      } else if (command === 'ls') {
        await navigate('ls', currentDir);
        console.log(`\nYou are currently in ${currentDir}`);
      } else if (command === 'cd') {
        currentDir = await navigate('cd', currentDir, args[0]);
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