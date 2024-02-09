import fs from 'fs';

import { glob } from 'glob';

export const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

export const scanner = async (globString: string) => {
  return glob(globString);
};
