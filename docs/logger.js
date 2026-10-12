'use strict';
/** logger.js — Logging simples com timestamp (sem dependências). */
const fmt = (level, args) =>
  `[${new Date().toISOString()}] [${level}] ${args.map((a) => (a instanceof Error ? a.stack || a.message : typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}`;

module.exports = {
  info: (...a) => console.log(fmt('INFO', a)),
  warn: (...a) => console.warn(fmt('WARN', a)),
  error: (...a) => console.error(fmt('ERROR', a)),
};
