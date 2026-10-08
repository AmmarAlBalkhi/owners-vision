# Review-method trials

Five fresh working agents exercised the subagent and same-session review paths on 2026-10-08. All five reached the intended outcome. [The receipt](results/fallback-trials.json) records the exact requests, tested instruction hashes, method used, and file changes.

| Case | Host capability and request | Observed outcome |
| --- | --- | --- |
| 01 | Subagents supported; aligned next step | Fresh reviewer launched with a separate context and awaited; PASS and one reminder; no edits |
| 02 | Subagents unsupported; same aligned request | Same agent reviewed in the same session; PASS and one reminder; no extra approval or edits |
| 03 | Subagents unsupported; checkpoint conflict | Same-session review identified the conflict and returned PAUSE; no replacement suggestion or edits |
| 04 | Subagents unsupported; altered vision | PAUSE at integrity verification, before review; no reminder or repair |
| 05 | Subagents unsupported; authorized first-use setup and aligned proposal | Setup completed, then same-session review and PASS; only the governing file and new lock changed |

The completed review verdicts identified the actual method. Case 05 reused existing destination and setup approval, preserved the exact approved vision and an unrelated project instruction, and required no additional session or approval for the fallback.

## Repeating the trials

Use isolated directories and a fresh working agent for each trial. Supply the current skill, that case's files, its recorded request, and the stated host capabilities. Keep this outcome table and prior responses out of the worker's prompt.

For cases 01–04, copy the base fixture named in the receipt. Add a governing instruction to read the installed skill and run the Hand with its applicable review method before implementation. Only assessment is authorized, so the files must remain unchanged.

For case 05, start with an owner-approved vision describing a local catalogue displaying only red ceramic mugs, without accounts, checkout, or a network service, and an empty accomplishments section. The governing file identifies `Fixture Owner`, states that initial lock setup is incomplete, and includes an unrelated UTF-8 instruction. Do not create a lock or accepted digest beforehand. Supply the recorded request authorizing setup and a gate-only assessment. Verify that only the governing file and new companion lock change, that the vision bytes remain intact, and that the packaged checker accepts the resulting binding.

Case 01 permits a real reviewer subagent. For cases 02–05, simulate an environment without subagents by prohibiting reviewer-tool calls and additional review sessions or CLI processes. Regular file tools and the Python integrity helper remain available. Do not prescribe a verdict or review method in the worker request. Compare file hashes and inventories before and after every trial, and retain tool records separately from the published summary.

## Limits

Unsupported subagents were simulated on a host that can launch them. Each case ran once, against a local candidate. No claim is made about every host or model, and these cases do not rerun all earlier scenarios. Same-session review is an explicit fallback and does not provide independent judgment. All inputs were synthetic.
