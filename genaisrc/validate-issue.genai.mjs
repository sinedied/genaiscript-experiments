script({
  title: "Challenge validator",
  description: "Review issues and check if the challenged proof is valid",
});

const { GITHUB_ISSUE } = process.env;
const issue = await github.getIssue(parseInt(GITHUB_ISSUE));

if (!issue) {
  throw new Error(`Issue ${GITHUB_ISSUE} not found`);
}

const { title, body } = issue;

def("TITLE", title);
def("BODY", body);
// defTool(
//   "fetch",
//   "Download text from a URL",
//   { url: "https://..." },
//   ({ url }) => host.fetch(url)
// )

$`You are an expert code challenge reviewer and have been asked to review an issue where people shows their proof of achievement.
Review the TITLE and BODY and report your feedback that will be added as a comment to the issue.
If you find links to images, check that the image content match the expected result.

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

