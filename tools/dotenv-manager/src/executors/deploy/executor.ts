import { PromiseExecutor } from '@nx/devkit';
import { DeployExecutorSchema } from './schema';
import { join, resolve } from 'path';
import { statSync } from 'fs';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<DeployExecutorSchema> = async (options) => {
  const {
    scope,
    environment = 'development',
    type = 'app',
    projectName = `${scope}-service`,
  } = options;

  // define the .env file to decrypt inside local vault
  const encryptedEnvFile =
    environment === 'development' ? '.env' : `.env.${environment}`;

  // Source
  const vaultPath = resolve(`libs/${scope}/env`);
  const envKeys = join(vaultPath, '.env.keys');
  const encryptedEnvFilePath = join(vaultPath, encryptedEnvFile);

  // Destination
  const distPath = resolve(`dist/${type}s/${projectName}`);
  const outputPath = join(distPath, '.env');

  try {
    console.log(`🔐 Decrypting ${scope}'s ${encryptedEnvFile}...`);

    // Check if target env file exists
    const statEnvFile = statSync(encryptedEnvFilePath);

    if (statEnvFile.isDirectory()) {
      console.error(`❌ ${encryptedEnvFile} exists but is a directory`);
      return { success: false };
    }

    // Check if .env.keys is there
    const statEnvKeys = statSync(envKeys);

    if (statEnvKeys.isDirectory()) {
      console.error(`❌ .env.keys exists but is a directory`);
      return { success: false };
    }

    // Check if the destination folder exists
    const statDistPath = statSync(distPath);

    if (!statDistPath.isDirectory()) {
      console.error('❌ Path exists but is not a directory');
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
