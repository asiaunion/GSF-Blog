import { parseArgs } from 'node:util';
import fs from 'node:fs';

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: 'string' }
  }
});

console.log('🖼️ (Stub) Image upload logic skipped for now.');
