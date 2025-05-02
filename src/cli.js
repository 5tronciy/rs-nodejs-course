import { createInterface } from 'node:readline/promises';

function completer(line) {
  var completions = ['.exit'];
  var hits = completions.filter((c) => { return c.indexOf(line) == 0 })
  return [hits.length ? hits : completions, line]
}

export const startCLI = async () => {
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
      // here will be operations
      console.log('Invalid input');
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