script({
  title: "langchainjs/explorer badge validator",
  temperature: 0,
  system: []
});

const { GITHUB_ISSUE } = process.env;
const issue = await github.getIssue(parseInt(GITHUB_ISSUE));
if (!issue) {
  throw new Error(`Issue ${GITHUB_ISSUE} not found`);
}
const { body } = issue;

// Extract images URLs from issue content
const { json: images } = await runPrompt(
  `Extract all images links as an array of HTTP links in the content below: ${body}`,
  { temperature: 0, responseType: "json" }
);

def("TITLE", title);
def("BODY", body);
defImages("IMAGES", images);

$`You are an expert code challenge reviewer and have been asked to review an issue where people shows their proof of achievement.
Review the issue BODY and report your feedback that will be added as a comment to the issue.
When required check that images content match the expected result.

## Validation rules

- Fork URL must be a fork of https://github.com/microsoft/JavaScript-AI-Azure-Adventures/
- Screenshot must show a web browser running on http://localhost:4043

## Feedback

Your feedback must be one of these:
- ✅ Issue valid
- 🛑 Validation failed: <reason>
- ⚠️ Need more details: <explain>
`.role("system");

// TODO: create tool to send in the badge

