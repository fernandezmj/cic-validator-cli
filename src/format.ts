import type { FileReport, LineResult } from './types.js';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function formatLine(result: LineResult, color: boolean): string {
  const mark = result.passed ? (color ? `${GREEN}PASS${RESET}` : 'PASS') : (color ? `${RED}FAIL${RESET}` : 'FAIL');
  const header = `Line ${String(result.lineNumber).padStart(3)} [${result.recordType}] ${mark}`;
  if (result.passed) return header;
  const reasons = result.errors.map((e) => `    - ${e.message}`).join('\n');
  return `${header}\n${reasons}`;
}

export function formatReport(report: FileReport, options: { color?: boolean } = {}): string {
  const color = options.color ?? true;
  const lines: string[] = [];
  for (const r of report.lines) lines.push(formatLine(r, color));
  lines.push('');
  lines.push(color ? `${DIM}${'─'.repeat(60)}${RESET}` : '─'.repeat(60));
  const summary = `${BOLD}Total:${RESET} ${report.totalLines}   ${GREEN}Passed:${RESET} ${report.passed}   ${RED}Failed:${RESET} ${report.failed}`;
  lines.push(color ? summary : summary.replace(/\x1b\[\d+m/g, ''));
  return lines.join('\n');
}
