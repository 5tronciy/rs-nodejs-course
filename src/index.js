import { parseArgs } from 'node:util';
import { homedir } from 'node:os';
import { startCLI } from './cli.js';

const parseCommandLineArgs = () => {
  const { values } = parseArgs({
    options: {
      username: { type: 'string' }
    },
    strict: false
  });

  return values.username || 'Anonymous';
};

const main = async () => {
  const username = parseCommandLineArgs();
  console.log(`Welcome to the File Manager, ${username}!`);

  const currentDir = homedir();
  console.log(`You are currently in ${currentDir}`);

  await startCLI(currentDir);

  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});