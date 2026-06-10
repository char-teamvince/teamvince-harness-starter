---
name: verify
description: "Four-check verification before merging code that touches packages, APIs, or untrusted input. Run on every change that adds a dependency or pulls in outside content."
---

You are verifying that the latest code changes do not introduce hallucinated packages, invented API endpoints, or an unsafe data flow. Run all four checks and report results.

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

**Check 4: Untrusted-content check.**
If the change pulls in content the user did not write (web pages, files, emails, API responses, pasted text) and then acts on it or passes it to another tool:
- Confirm the content is treated as data, not as instructions. It must not be able to choose which tool runs or what gets sent.
- Check for the lethal trifecta: private-data access, untrusted content, and a way to send data outward, all in one flow. If all three are present, flag it and break one leg before merging (see the `security` skill).

Report:
- Packages checked, status of each
- Endpoints checked, status of each
- Behavior check: passed / failed, with the test input and actual output
- Untrusted content: present or not. If present, is it confined to data, and is the trifecta avoided?

If any check fails, do not merge. Surface the failure clearly. Propose the smallest fix.
