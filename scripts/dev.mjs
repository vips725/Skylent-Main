import { spawn } from 'node:child_process';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const backendHealthUrl = process.env.BACKEND_HEALTH_URL || 'http://127.0.0.1:5001/api/health';
const backendReadyTimeoutMs = Number(process.env.BACKEND_READY_TIMEOUT_MS || 30000);
const backendReadyIntervalMs = Number(process.env.BACKEND_READY_INTERVAL_MS || 500);

let shuttingDown = false;
const children = new Map();

function prefixStream(name, stream, writer) {
  const rl = readline.createInterface({ input: stream });

  rl.on('line', (line) => {
    writer.write(`[${name}] ${line}\n`);
  });
}

function runProcess(name, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: options.cwd || root,
    env: {
      ...process.env,
      ...(options.env || {}),
    },
    detached: Boolean(options.detached),
    stdio: options.stdio || [options.stdin || 'ignore', 'pipe', 'pipe'],
  });

  children.set(child, {
    detached: Boolean(options.detached),
    name,
  });
  if (child.stdout) {
    prefixStream(name, child.stdout, process.stdout);
  }

  if (child.stderr) {
    prefixStream(name, child.stderr, process.stderr);
  }

  child.on('exit', (code, signal) => {
    children.delete(child);

    if (shuttingDown) {
      return;
    }

    const reason = signal || code;
    console.error(`[dev] ${name} exited with ${reason}`);
    shutdown(code || 1);
  });

  child.on('error', (error) => {
    console.error(`[dev] failed to start ${name}:`, error);
    shutdown(1);
  });

  return child;
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children.keys()) {
    killChild(child, 'SIGTERM');
  }

  setTimeout(() => {
    for (const child of children.keys()) {
      killChild(child, 'SIGKILL');
    }

    process.exit(exitCode);
  }, 1000).unref();
}

function killChild(child, signal) {
  const metadata = children.get(child);

  try {
    if (metadata?.detached && child.pid) {
      process.kill(-child.pid, signal);
      return;
    }

    child.kill(signal);
  } catch (error) {
    if (error.code !== 'ESRCH') {
      console.error(`[dev] failed to stop ${metadata?.name || 'child'}:`, error.message);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function isBackendReady() {
  try {
    const response = await fetch(backendHealthUrl, {
      cache: 'no-store',
    });

    return response.ok;
  } catch {
    return false;
  }
}

async function waitForBackend() {
  const startedAt = Date.now();

  process.stdout.write(`[dev] waiting for backend at ${backendHealthUrl}\n`);

  while (!shuttingDown) {
    if (await isBackendReady()) {
      process.stdout.write('[dev] backend is ready\n');
      return;
    }

    if (Date.now() - startedAt > backendReadyTimeoutMs) {
      throw new Error(`backend did not become ready within ${backendReadyTimeoutMs}ms`);
    }

    await sleep(backendReadyIntervalMs);
  }
}

async function main() {
  if (await isBackendReady()) {
    process.stdout.write(`[dev] backend is already running at ${backendHealthUrl}\n`);
  } else {
    runProcess('backend', npmCmd, ['run', 'dev'], {
      cwd: path.join(root, 'backend'),
    });

    try {
      await waitForBackend();
    } catch (error) {
      console.error(`[dev] ${error.message}`);
      shutdown(1);
      return;
    }
  }

  if (shuttingDown) {
    return;
  }

  runProcess('frontend', process.execPath, ['frontend/scripts/dev-server.mjs'], {
    cwd: root,
    env: {
      CI: 'true',
    },
    stdio: 'inherit',
  });
}

main().catch((error) => {
  console.error('[dev] failed to start dev servers:', error);
  shutdown(1);
});

process.once('SIGINT', () => shutdown(0));
process.once('SIGTERM', () => shutdown(0));
