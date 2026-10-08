# Installation and readiness trials

Six fresh working agents exercised installation, updates, and review on isolated synthetic projects on 2026-10-08. All six reached the intended outcome. The [receipt](results/readiness-trials.json) records the exact requests, tested instruction hashes, observed behavior, and independently checked file changes.

| Case | Starting state and request | Observed outcome |
| --- | --- | --- |
| 01 | Incomplete setup with existing explicit approval; update the skill | Completed initial lock and mandatory Hand rule automatically; immediately reported readiness; preserved approved vision and unrelated instructions |
| 02 | Approved destination without setup permission; install the skill | Installed all seven files; immediately reported missing setup and asked one short authorization question |
| 03 | Previously approved setup explicitly stopped; update the skill | Updated the skill, preserved paused setup, and immediately asked one short resume question |
| 04 | Established binding with altered vision bytes; update the skill | Updated the skill and immediately reported the integrity failure; preserved vision, lock, and governing rules |
| 05 | Valid established binding; update and assess an aligned next step; subagents supported | Reported readiness, launched and awaited a fresh reviewer, returned PASS with its method and one reminder; preserved all project files outside the installed skill |
| 06 | Current skill and valid binding; assess an aligned next step; subagents unsupported | Verified readiness, performed same-session review, and returned PASS with its method and one reminder; changed no files |

Setup-only requests did not produce an alignment PASS. The failed integrity check stopped before review. In case 05, the working agent actually launched a reviewer with a fresh context and received its result. In case 06, the working agent used no reviewer, additional session, or CLI review process.

## Repeating the trials

Use a fresh isolated directory and working agent for each case. Begin at the repository README and supply the conversation recorded in the receipt, the project files, and host capabilities. Keep this outcome table and earlier responses out of the worker's prompt. Map the repository URL to a frozen local candidate for a prepublication evaluation; record that mapping explicitly. The simulated host reads `AGENTS.md`.

For cases 01–03, use an approved vision for a local catalogue displaying only red ceramic mugs, without accounts, checkout, or a network service, and an empty accomplishments section. Start without a lock or accepted digest. The governing file identifies `Fixture Owner`, records that initial setup is incomplete, and includes an unrelated UTF-8 instruction. The conversation supplies the differing setup permissions and, for case 03, the later stop.

For case 04, copy [the altered-vision fixture](fixtures/04-tampered-vision). For cases 05–06, copy [the aligned fixture](fixtures/01-aligned-prior-accomplishment). In these three cases, add a governing instruction that the binding is established and that implementation requires reading the installed skill and running the Hand with its applicable review method. Replace each fixture's request with the conversation in the receipt.

Cases 01, 03, 04, and 05 began with the seven-file skill from the prior commit recorded in the receipt; case 02 began without an installed skill. Case 06 already had the candidate. Use the project-local `.agents/skills/owners-vision/` destination. Permit actual subagents in cases 01–05. For case 06, simulate an unsupported host by prohibiting reviewer-tool calls, extra review sessions, and CLI review processes while retaining file tools and the Python checker.

Compare file inventories and SHA-256 hashes before and after each run. Verify all seven installed files against the candidate. For case 01, additionally check the new binding with the packaged helper and confirm preservation of the approved vision and unrelated rule. Retain the actual reviewer invocation and returned result for case 05.

## Limits

Each case ran once in one environment. The repository URL resolved to a local candidate, so these trials test agent-managed installation and its readiness handoff, not a remote installer or automatic host discovery. Unsupported capability was simulated on a host that supports subagents. Same-session review supplies no independent judgment. Earlier behavioral scenarios were not all rerun against this revision.
