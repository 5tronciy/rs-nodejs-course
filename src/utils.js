import { resolve, isAbsolute } from 'node:path';

export const resolvePath = (currentDir, targetPath) => {
  return isAbsolute(targetPath) ? targetPath : resolve(currentDir, targetPath);
};

export const sortDirectoryContents = (entries) => {
  const directories = [];
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      directories.push(entry);
    } else if (entry.isFile()) {
      files.push(entry);
    }
  }

  directories.sort((a, b) => a.name.localeCompare(b.name));

  files.sort((a, b) => a.name.localeCompare(b.name));

  return { directories, files };
};