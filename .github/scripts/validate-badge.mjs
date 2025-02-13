#!/usr/bin/env node
import process from 'node:process';
import { execSync } from 'node:child_process';

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
execSync(
  `npx -y genaiscript run "genaisrc/${badgeName}.genai.mjs" -prc --out-trace "${process.env.GITHUB_STEP_SUMMARY}"`,
  { stdio: 'inherit' }
);
