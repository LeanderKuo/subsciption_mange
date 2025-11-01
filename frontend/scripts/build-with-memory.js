#!/usr/bin/env node

/**
 * Ensures the build runs with enough memory headroom for ForkTsChecker
 * and the Node process. Useful on CI or constrained environments.
 */
const { spawn } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const isWin = process.platform === 'win32';

const env = {
  ...process.env,
  FORK_TS_CHECKER_MEMORY_LIMIT:
    process.env.FORK_TS_CHECKER_MEMORY_LIMIT || '12288',
  NODE_OPTIONS: [
    process.env.NODE_OPTIONS?.trim() || '',
    '--max-old-space-size=4096',
  ]
    .filter(Boolean)
    .join(' ')
    .trim(),
};

const command = isWin ? 'react-scripts.cmd' : 'react-scripts';
const args = ['build'];

const child = spawn(command, args, {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
