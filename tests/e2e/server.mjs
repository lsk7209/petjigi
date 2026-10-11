// e2e 공용: 격리 빌드 결과(next start)를 띄우고 준비될 때까지 기다린다.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

export const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

export async function startServer(port) {
  const base = `http://127.0.0.1:${port}`;
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], { env: process.env, stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`${base}/about`)).status < 500) return { base, server }; } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  server.kill();
  throw new Error('server not ready');
}

export const launch = () => chromium.launch({ executablePath: CHROME, headless: true });
