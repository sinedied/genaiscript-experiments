#!/usr/bin/env node
import process from 'node:process';
import { run } from 'genaiscript/api';

const issueContent = process.argv[2];

if (!issueContent) {
  console.error('Issue content not provided.');
  process.exit(1);
}

const badgeRegex = /<!--(?:.*?)badge:(.*?) -->/;
const [_, badgeName] = issueContent.match(badgeRegex);

if (!badgeName) {
  console.error('No badge name found in issue.');
  process.exit(1);
}

console.log(`Validating badge ${badgeName}`);
const results = await run(`${badgeName}.genai.mjs`, ['-prc', '--out-trace', process.env.GITHUB_STEP_SUMMARY]);
console.log(results);
