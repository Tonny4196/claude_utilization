#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import unzipper from 'unzipper';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const DEFAULT_REPO_URL = 'https://github.com/Tonny4196/claude_utilization/archive/refs/heads/main.zip';
const DEFAULT_TARGET_DIR = '.claude';
const TEMP_DIR = path.join(__dirname, '..', 'temp');
const TEMP_ZIP = path.join(TEMP_DIR, 'repo.zip');

function showHelp() {
  console.log(`
Usage: npx @tonny4196/claude-agents-setup [options]

Options:
  --help              Show this help message
  --url <url>         GitHub repository URL (default: ${DEFAULT_REPO_URL})
  --target <dir>      Target directory name (default: ${DEFAULT_TARGET_DIR})
  --dry-run           Show what would be done without making changes

Examples:
  npx @tonny4196/claude-agents-setup
  npx @tonny4196/claude-agents-setup --url https://github.com/user/repo/archive/main.zip
  npx @tonny4196/claude-agents-setup --target custom-dir
  npx @tonny4196/claude-agents-setup --dry-run
  `);
}

function parseArgs(args) {
  const options = {
    help: false,
    url: DEFAULT_REPO_URL,
    targetDir: DEFAULT_TARGET_DIR,
    dryRun: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--url' && i + 1 < args.length) {
      options.url = args[++i];
    } else if (arg === '--target' && i + 1 < args.length) {
      options.targetDir = args[++i];
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    }
  }

  return options;
}

async function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destination);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        file.close();
        fs.unlinkSync(destination);
        downloadFile(response.headers.location, destination)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destination);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      pipeline(response, file)
        .then(() => {
          console.log('Download completed');
          resolve();
        })
        .catch(reject);
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destination)) {
        fs.unlinkSync(destination);
      }
      reject(err);
    });
  });
}

async function listZipContents(zipPath) {
  const directory = await unzipper.Open.file(zipPath);
  return directory.files.map(file => file.path);
}

async function copyDirectoryRecursive(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

async function extractAndCopy(zipPath, targetDir, dryRun = false) {
  console.log('Listing zip contents...');
  const files = await listZipContents(zipPath);

  // Find the .claude directory in the zip
  const claudeDirPattern = /^[^\/]+\/\.claude\//;
  const claudeFiles = files.filter(file => claudeDirPattern.test(file));

  if (claudeFiles.length === 0) {
    throw new Error('No .claude directory found in the repository');
  }

  console.log(`Found ${claudeFiles.length} files in .claude directory`);

  if (dryRun) {
    console.log('\nDry run - would copy the following files:');
    claudeFiles.forEach(file => console.log(`  ${file}`));
    return;
  }

  // Extract to temp directory
  const extractDir = path.join(TEMP_DIR, 'extracted');
  if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true });
  }
  fs.mkdirSync(extractDir, { recursive: true });

  console.log('Extracting archive...');
  const directory = await unzipper.Open.file(zipPath);
  await directory.extract({ path: extractDir });

  // Find the extracted .claude directory
  const extractedDirs = fs.readdirSync(extractDir);
  if (extractedDirs.length === 0) {
    throw new Error('Failed to extract archive');
  }

  const repoDir = path.join(extractDir, extractedDirs[0]);
  const sourceClaude = path.join(repoDir, '.claude');

  if (!fs.existsSync(sourceClaude)) {
    throw new Error('.claude directory not found in extracted files');
  }

  // Copy to target location
  const targetPath = path.join(process.cwd(), targetDir);
  console.log(`Copying to ${targetPath}...`);
  copyDirectoryRecursive(sourceClaude, targetPath);

  console.log('Setup completed successfully!');
}

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function checkExistingClaudeDir(targetDir) {
  const targetPath = path.join(process.cwd(), targetDir);

  if (fs.existsSync(targetPath)) {
    console.log(`\nWarning: ${targetDir} directory already exists.`);
    const answer = await promptUser('Do you want to overwrite it? (yes/no): ');

    if (answer !== 'yes' && answer !== 'y') {
      console.log('Setup cancelled.');
      return false;
    }

    console.log(`Removing existing ${targetDir} directory...`);
    fs.rmSync(targetPath, { recursive: true });
  }

  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    showHelp();
    return;
  }

  console.log('Claude Code setup tool');
  console.log(`Repository: ${options.url}`);
  console.log(`Target directory: ${options.targetDir}`);

  if (options.dryRun) {
    console.log('\n*** DRY RUN MODE ***\n');
  }

  try {
    // Check for existing directory
    if (!options.dryRun) {
      const shouldContinue = await checkExistingClaudeDir(options.targetDir);
      if (!shouldContinue) {
        return;
      }
    }

    // Create temp directory
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    // Download the repository
    console.log('\nDownloading repository...');
    await downloadFile(options.url, TEMP_ZIP);

    // Extract and copy
    await extractAndCopy(TEMP_ZIP, options.targetDir, options.dryRun);

    // Cleanup
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true });
    }

    if (!options.dryRun) {
      console.log(`\n✓ Successfully set up ${options.targetDir} directory!`);
    }
  } catch (error) {
    // Cleanup on error
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true });
    }
    throw error;
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
