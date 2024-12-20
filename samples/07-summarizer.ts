// This example demonstrates how to summarize a large text.
//
// NOTE: This example requires more time to run, as the context size is very
// large.

import process from "node:process";
import fs from "node:fs";
import { OpenAI } from "openai";

const systemPrompt = `Rewrite this text into a very brief summary.`;

// Load a large text
const text = fs.readFileSync("./data/gh_wikipedia.txt", "utf8");

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const result = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: text },
  ],
});
const summary = result.choices[0].message.content ?? "";

console.log(`Original text: ${text.length} chars`);
console.log(`Summarized text (${summary.length} chars):`);
console.log(summary);
