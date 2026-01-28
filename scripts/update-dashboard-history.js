#!/usr/bin/env node
/**
 * Reads Playwright test results and appends run summary to dashboard history.
 * Run after tests: npm run test && npm run dashboard:update
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RESULTS_FILE = path.join(ROOT, 'test-results', 'results.json');
const LAST_RUN_FILE = path.join(ROOT, 'test-results', '.last-run.json');
const HISTORY_DIR = path.join(ROOT, 'dashboard-data');
const HISTORY_FILE = path.join(HISTORY_DIR, 'history.json');
const LATEST_RUN_FILE = path.join(HISTORY_DIR, 'latest-run.json');

function extractTestCases(data) {
  const cases = [];
  if (!data || !Array.isArray(data.suites)) return cases;
  for (const suite of data.suites) {
    if (!Array.isArray(suite.specs)) continue;
    for (const spec of suite.specs) {
      if (!Array.isArray(spec.tests)) continue;
      for (const test of spec.tests) {
        const results = Array.isArray(test.results) ? test.results : [];
        const result = results.length ? results[results.length - 1] : {};
        const status = result.status || 'unknown';
        const duration = typeof result.duration === 'number' ? result.duration : 0;
        cases.push({
          title: spec.title || test.title || 'Unknown',
          project: test.projectName || test.projectId || 'Unknown',
          status,
          duration: Math.round(duration / 1000)
        });
      }
    }
  }
  return cases;
}

function countFromJsonReport(data) {
  let passed = 0;
  let failed = 0;
  function visit(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.status === 'string') {
      if (obj.status === 'passed') passed++;
      else if (obj.status === 'failed' || obj.status === 'timedOut') failed++;
    }
    for (const key of ['results', 'suites', 'specs', 'tests']) {
      if (Array.isArray(obj[key])) obj[key].forEach(visit);
    }
  }
  visit(data);
  return { passed, failed, total: passed + failed };
}

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

let passed = 0, failed = 0, total = 0;
let testCases = [];

if (fs.existsSync(RESULTS_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    const counts = countFromJsonReport(data);
    passed = counts.passed;
    failed = counts.failed;
    total = counts.total;
    testCases = extractTestCases(data);
  } catch (e) {
    console.warn('Could not parse results.json:', e.message);
  }
}

if (total === 0 && fs.existsSync(LAST_RUN_FILE)) {
  try {
    const last = JSON.parse(fs.readFileSync(LAST_RUN_FILE, 'utf8'));
    failed = (last.failedTests || []).length;
    passed = last.status === 'passed' ? 1 : 0;
    total = passed + failed || 1;
  } catch (e) {
    console.warn('Could not parse .last-run.json:', e.message);
  }
}

if (total === 0) {
  console.warn('No test results found. Run tests first.');
  process.exit(0);
}

const entry = { date: getToday(), passed, failed, total };

if (!fs.existsSync(HISTORY_DIR)) fs.mkdirSync(HISTORY_DIR, { recursive: true });

let history = [];
if (fs.existsSync(HISTORY_FILE)) {
  try {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  } catch (e) {
    history = [];
  }
}

const last = history[history.length - 1];
if (last && last.date === entry.date) {
  history[history.length - 1] = entry;
} else {
  history.push(entry);
}

const keepDays = 90;
if (history.length > keepDays) history = history.slice(-keepDays);

fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');

const latestRun = { date: getToday(), passed, failed, total, testCases };
fs.writeFileSync(LATEST_RUN_FILE, JSON.stringify(latestRun, null, 2), 'utf8');

console.log('Dashboard history updated:', entry);
if (testCases.length) console.log('Current run test cases:', testCases.length);
process.exit(0);
