#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateFile } from './validator.js';
import { formatReport } from './format.js';

function main(): void {
  const args = process.argv.slice(2);
  const noColor = args.includes('--no-color');
  const filtered = args.filter((a) => a !== '--no-color');

  if (filtered.length === 0) {
    console.error('Usage: cic-validate <path-to-file> [--no-color]');
    process.exit(2);
  }

  const filePath = resolve(filtered[0]!);
  let text: string;
  try {
    text = readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  } catch (err) {
    console.error(`Error reading file: ${(err as Error).message}`);
    process.exit(2);
  }

  const report = validateFile(text);
  const useColor = !noColor && process.stdout.isTTY === true;
  console.log(formatReport(report, { color: useColor }));
  process.exit(report.failed === 0 ? 0 : 1);
}

main();
