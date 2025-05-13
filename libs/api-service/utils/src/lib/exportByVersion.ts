import { join } from 'node:path';
import { readdirSync } from 'fs';

/**
 * Dynamically builds an object with named exports like "login.v1", "login.v2"
 * @param dirPath Path to the directory
 * @param baseName Name to use as the base (e.g. "login")
 * @returns Record<string, unknown>
 */
export function exportByVersion(
  dirPath: string,
  baseName: string
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  const files = readdirSync(dirPath).filter(
    (file) => file.endsWith('.handler.ts') || file.endsWith('.handler.js')
  );

  for (const file of files) {
    const versionMatch = file.match(/(v\d+)\.handler\.(ts|js)$/);
    if (!versionMatch) continue;

    const version = versionMatch[1]; // e.g., "v1"
    const modulePath = join(dirPath, file);
    const mod = require(modulePath);

    result[`${baseName}.${version}`] = mod.default ?? module;
  }

  return result;
}
