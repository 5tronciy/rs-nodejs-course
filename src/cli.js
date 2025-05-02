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
    if (line === '.exit') {
      rl.close();
      return;
    }

    try {
      if (line === 'up') {
        currentDir = await navigate('up', currentDir);
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