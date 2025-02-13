script({
  title: "langchainjs/explorer badge validator",
  temperature: 0,
  system: [],
});

const { GITHUB_ISSUE } = process.env;
const issue = await github.getIssue(parseInt(GITHUB_ISSUE));
if (!issue) {
  throw new Error(`Issue "${GITHUB_ISSUE}" not found`);
}
const { body, user } = issue;

// Extract images URLs from issue content
const { json: images } = await runPrompt(
  `Extract all images links as an array of HTTP links in the content below.
Example output: { "links": ["https://y.com/link1", "https://z.com/link2] }

${body}`,
  {
    temperature: 0,
    responseType: "json_object",
  },
);

def("BODY", body);
def("USER", user);
defImages(images.links, { ignoreEmpty: true });

$`You are an expert code challenge reviewer and have been asked to review an issue where people shows their proof of achievement.
Review the issue BODY and report your feedback that will be added as a comment to the issue.
When required check that images content match the expected result.

## Validation rules

- Fork URL must be like this: https://github.com/<USER login>/genaiscript-experiments/
- Screenshot must show a web browser running on http://localhost:8000

## Feedback

Your feedback must be one of these:
- ✅ Issue valid
- 🛑 Validation failed: <reason>
- ⚠️ Need more details: <explain>

Then add this on a newline after your feedback: "Please edit your issue to fix the problems mentioned above."
`.role("system");

// TODO: action depending on the feedback: set label, call API to issue badge...
