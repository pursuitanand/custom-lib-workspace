#!/usr/bin/env node
/**
 * Claude Code status line for custom-lib-workspace.
 *
 * Displays: model display name  |  context usage progress bar + percentage
 *           |  session cost  |  session duration
 *
 * Runs under Node.js so it behaves identically whether Claude Code invokes it
 * from PowerShell, cmd.exe, or Git Bash on Windows.
 *
 * Wired up via .claude/settings.json:
 *   "statusLine": { "type": "command", "command": "node .claude/statusline.cjs" }
 */

'use strict';

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    // If stdin is not piped (e.g. manual run), don't hang forever.
    if (process.stdin.isTTY) resolve('');
  });
}

function buildBar(usedPct, width) {
  const clamped = Math.max(0, Math.min(100, usedPct));
  const filledCount = Math.round((clamped / 100) * width);
  const emptyCount = width - filledCount;
  return '█'.repeat(filledCount) + '░'.repeat(emptyCount);
}

function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${mins}m ${secs}s`;
}

(async () => {
  const raw = await readStdin();

  let input = {};
  try {
    input = raw ? JSON.parse(raw) : {};
  } catch {
    input = {};
  }

  const modelName =
    (input.model && input.model.display_name) ||
    (input.model && input.model.id) ||
    'Unknown model';

  const ctx = input.context_window || {};
  const usedPct = typeof ctx.used_percentage === 'number' ? ctx.used_percentage : null;

  const BAR_WIDTH = 10;
  let contextSegment;
  if (usedPct !== null) {
    const bar = buildBar(usedPct, BAR_WIDTH);
    contextSegment = `[${bar}] ${usedPct.toFixed(0)}%`;
  } else {
    contextSegment = '[' + '░'.repeat(BAR_WIDTH) + '] --%';
  }

  // ANSI color codes (dim-friendly since the status line renders dimmed).
  const dim = '\x1b[2m';
  const cyan = '\x1b[36m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const red = '\x1b[31m';
  const reset = '\x1b[0m';

  let barColor = green;
  if (usedPct !== null) {
    if (usedPct >= 80) barColor = red;
    else if (usedPct >= 50) barColor = yellow;
  }

  const cost = (input.cost && input.cost.total_cost_usd) || 0;
  const durationMs = (input.cost && input.cost.total_duration_ms) || 0;
  const costSegment = `$${cost.toFixed(2)}`;
  const durationSegment = formatDuration(durationMs);

  const line =
    `${cyan}${modelName}${reset}` +
    `${dim} | ${reset}` +
    `${barColor}${contextSegment}${reset}` +
    `${dim} | ${reset}` +
    `${yellow}${costSegment}${reset}` +
    `${dim} | ${reset}` +
    `${cyan}${durationSegment}${reset}`;

  process.stdout.write(line + '\n');
})();
