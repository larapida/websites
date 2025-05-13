import {
  createProjectGraphAsync,
  PromiseExecutor,
  readCachedProjectGraph,
  workspaceRoot,
} from '@nx/devkit';
import { DeployExecutorSchema } from './schema';
import { join, resolve } from 'path';
import { statSync } from 'fs';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<DeployExecutorSchema> = async (options) => {
  const {
    scope,
    environment = 'development',
    type = 'app',
    preBuild = false,
    projectName = preBuild ? scope : `${scope}-service`,
  } = options;

  // define the .env file to decrypt inside local vault
  const encryptedEnvFile =
    environment === 'development' ? '.env' : `.env.${environment}`;

  // Source
  const vaultPath = resolve(workspaceRoot, `config/${scope}-ecosystem`);
  const envKeys = join(vaultPath, '.env.keys');
  const encryptedEnvFilePath = join(vaultPath, encryptedEnvFile);

  // Destination
  const outputRoot = preBuild ? '' : 'dist/';
  const distPath = resolve(
    workspaceRoot,
    `${outputRoot}${type}s/${projectName}`
  );
  const outputPath = join(distPath, '.env');

  const safeStat = (
    path: string
  ): { exists: boolean; isFile: boolean; isDir: boolean } => {
    try {
      const stat = statSync(path);
      return {
        exists: true,
        isFile: stat.isFile(),
        isDir: stat.isDirectory(),
      };
    } catch {
      return { exists: false, isFile: false, isDir: false };
    }
  };

  try {
    try {
      readCachedProjectGraph();
    } catch {
      console.log('📦 No cached project graph. Creating it...');
      await createProjectGraphAsync();
    }

    console.log(`🔐 Decrypting ${scope}'s ${encryptedEnvFile}...`);

    // Check encrypted env file
    const envFileStat = safeStat(encryptedEnvFilePath);
    if (!envFileStat.exists) {
      console.error(`❌ Encrypted env file not found: ${encryptedEnvFilePath}`);
      return { success: false };
    }
    if (!envFileStat.isFile) {
      console.error(`❌ Encrypted env file is not a regular file`);
      return { success: false };
    }

    // Check .env.keys
    const keysStat = safeStat(envKeys);
    if (!keysStat.exists) {
      console.error(`❌ .env.keys not found: ${envKeys}`);
      return { success: false };
    }
    if (!keysStat.isFile) {
      console.error(`❌ .env.keys is not a regular file`);
      return { success: false };
    }

    // Check output directory
    const distStat = safeStat(distPath);
    if (!distStat.exists || !distStat.isDir) {
      console.error(
        `❌ dist path does not exist or is not a directory: ${distPath}`
      );
      return { success: false };
    }

    // Decrypt target env file
    execSync(`dotenvx decrypt ${encryptedEnvFile} --stdout > ${outputPath}`, {
      cwd: vaultPath,
      stdio: 'inherit',
    });

    console.log(`✅ Decrypted .env written to ${outputPath}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to decrypt env file:', error);
    return { success: false };
  }
};

export default runExecutor;
