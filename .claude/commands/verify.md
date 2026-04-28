---
description: "Three-check verification before merging code that touches packages or APIs. Run on every Lane 3 change."
---

You are verifying that the latest code changes do not introduce hallucinated packages or invented API endpoints. Run all three checks and report results.

**Check 1: Package check.**
For every new line in the diff that adds an import or a `pip install` / `npm install` command:
- Take the package name.
- Search npm (https://www.npmjs.com/package/PACKAGENAME) or PyPI (https://pypi.org/project/PACKAGENAME) for it.
- Confirm it exists and has sane download counts (at least a few hundred per week for an established package).
- If the package does not exist or has suspicious metadata, flag it and ask for a real one.

**Check 2: API endpoint check.**
For every new fetch, axios call, or HTTP request in the diff:
- Take the URL.
- Search the official docs of that service for the exact path.
- If the docs do not have it, the endpoint may be invented. Flag and ask.

**Check 3: Behavior check.**
- Run the changed code with one real input.
- Compare the output shape to what the code expects.
- If output looks plausible but the wrong shape, do not assume the model knows the schema. Ask Claude: "Show me the raw response from this API for input X. Do not summarize."

Report:
- Packages checked, status of each
- Endpoints checked, status of each
- Behavior check: passed / failed, with the test input and actual output

If any check fails, do not merge. Surface the failure clearly. Propose the smallest fix.
