import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const systemInfoHandlers = {
  '--EOL': () => {
    console.log('System EOL:');
    console.log(JSON.stringify(EOL));
  },

  '--cpus': () => {
    const cpuInfo = cpus();
    console.log(`Overall amount of CPUs: ${cpuInfo.length}`);
    console.log('CPU Details:');
    cpuInfo.forEach((cpu, index) => {
      const clockRateGHz = cpu.speed / 1000;
      console.log(`CPU ${index + 1}: ${cpu.model} (Clock Rate: ${clockRateGHz.toFixed(2)} GHz)`);
    });
  },

  '--homedir': () => {
    console.log(`Home Directory: ${homedir()}`);
  },

  '--username': () => {
    const user = userInfo();
    console.log(`System Username: ${user.username}`);
  },

  '--architecture': () => {
    console.log(`CPU Architecture: ${arch()}`);
  }
};

export const systemInfo = async (option) => {
  const handler = systemInfoHandlers[option];
  if (!handler) {
    throw new Error('Invalid OS info option');
  }

  handler();
};