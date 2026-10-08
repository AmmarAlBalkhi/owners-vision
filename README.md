# Owner's Vision

**Keep AI work tied to what you asked for and what already works.**

Owner's Vision is a set of instructions for AI coding tools. Before new work starts, it tells the agent to compare the plan with your saved requirements and completed work. Conflicts pause implementation. Only you can authorize adding accomplishments to the record.

Created by [Ammar Al Balkhi](https://github.com/ammarbalkhi) · MIT license · Python 3 standard library · [Agent Skills](https://agentskills.io/specification) format

[Give feedback or suggest an improvement](https://github.com/ammarbalkhi/owners-vision/issues/new/choose)

Watch the [24-second PASS / FAIL overview](docs/linkedin/README.md): what gets checked, when authorized work can continue, and when implementation must pause.

![Owner's Vision working flow: before implementation, the Hand returns PASS for aligned work or PAUSE for a checkpoint conflict. At the next major step it can remind the owner about verified accomplishments. After explicit authorization, the agent adds concise checkpoint lines and preserves all earlier text.](docs/demo.svg)

<sub>Illustrative workflow. [Text version and recorded examples](docs/demo.md) · [PNG for sharing](docs/demo.png).</sub>

## The problem

Over a long project, an agent can drift. A reasonable-looking change might break something the owner already accepted, such as data that must survive a restart. The record of what is done can also get rewritten along the way.

Owner's Vision gives the agent one fixed reference: the owner's vision file, locked by SHA-256. Before new implementation, the agent runs a short gate against it. The vision changes only by appending, and only when the owner says so.

## How it works

1. **Verify.** The vision's exact bytes must match its companion lock and the accepted digest in the project's rules. A mismatch, missing file, or ambiguous lock returns PAUSE. A small script does this check deterministically.
2. **Review.** A fresh read-only subagent is required whenever supported to check the proposed work against the vision and checkpoints. Same-session review is reserved for environments without subagent support. The verdict identifies the method. Conflicts and inconclusive reviews return PAUSE.
3. **Verdict.** The agent returns a one-line banner (`THE HAND OF THE OWNER — PASS` or `— PAUSE`) and one to three reasons. PASS only lets work that is already authorized continue.
4. **Remind.** When a new major step begins and the previous step has verified results that aren't recorded yet, the agent adds one line: *Consider adding the previous step's verified accomplishments to Owner's Vision.*
5. **Record.** Only after the owner explicitly authorizes it, the agent appends concise checkpoint lines. Every earlier byte stays unchanged, and only the declared digests are updated to match.

Starting the next step, a gate PASS, silence, and "looks good" are not authorization. A pending reminder does not block otherwise authorized work that passes the gate.

## Try it in one minute

You need Python 3 and nothing else. Use `python3` if that is how Python 3 is named on your system.

```bash
git clone https://github.com/ammarbalkhi/owners-vision.git
```

```bash
cd owners-vision
```

Check an intact synthetic vision against its lock and accepted digest:

```bash
python owner_vision.py check --vision tests/fixtures/01-aligned-prior-accomplishment/OWNER_VISION.md --lock tests/fixtures/01-aligned-prior-accomplishment/OWNER_VISION.sha256 --expected-sha256 268e3c977418d1c58a9c4df669ffbd89c6d9e48822864f37493a45cd37f62a13
```

```json
{"ok": true, "vision_sha256": "268e3c977418d1c58a9c4df669ffbd89c6d9e48822864f37493a45cd37f62a13"}
```

Now check a copy where one sentence was changed. *No remote account or upload is required* became *A remote account and upload are required*:

```bash
python owner_vision.py check --vision tests/fixtures/04-tampered-vision/OWNER_VISION.md --lock tests/fixtures/04-tampered-vision/OWNER_VISION.sha256 --expected-sha256 268e3c977418d1c58a9c4df669ffbd89c6d9e48822864f37493a45cd37f62a13
```

```json
{"ok": false, "reason": "VISION_DIGEST_MISMATCH", "vision_sha256": "7261fe2151d08fe9688d0d73e028b4bc973c258a810011ef7987693a33109541"}
```

The second command exits with code `1` and changes no files. At this point an agent using the skill returns PAUSE and does not start implementation.

## Use it with your agent

From the project where you want to use the skill, install it with the [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add ammarbalkhi/owners-vision --skill owners-vision --copy
```

This route needs Node.js 22.20 or newer. Select your agent if prompted, then [bind your project](#bind-your-project). The installer copies the whole skill and its resources into the agent's project skill directory. The manual and ZIP routes below need no Node.js.

When an agent handles installation or updates, it must immediately read the installed `SKILL.md` and check project readiness. It completes initial setup covered by existing approval, or promptly asks for the missing approval or permission to resume. Its completion message distinguishes the installed skill from a project ready for Hand checks. A file-copy installer alone does not run this check; after a manual or CLI-only install, invoke the skill in your agent.

File installation for Claude Code, Gemini CLI, OpenCode, and the shared skill directory was checked on Windows with Skills CLI 1.7.1. Every packaged file remained byte-identical, and the installed integrity helper passed valid and tampered-input checks. Agent execution on those hosts has not been tested. See [installation evidence and support limits](docs/agent-usage.md#installation-evidence).

| Your setup | What to do |
| --- | --- |
| Agent with skill discovery | Copy the `owners-vision/` folder into the agent's skill directory, such as `.agents/skills/owners-vision/`, then select `owners-vision`. |
| Agent that reads files | Ask: *Read owners-vision/SKILL.md and run the Hand of the Owner on my proposed next step before implementing it.* |
| CLI that accepts instruction text | `python owner_vision.py instructions` prints the exact `SKILL.md` bytes. Pass them through the CLI's documented input option. |
| No clone | Download the [self-contained skill ZIP](dist/owners-vision.zip) and extract `owners-vision/`. |

Every route needs file access to the project and Python 3 for the integrity check. Subagent support enables a fresh independent review; without that support, the same agent reviews in the current session. No additional session or CLI is required. [Agent and CLI usage](docs/agent-usage.md) covers each route, sandboxed agents, and the check's exit and reason codes.

## Bind your project

The agent follows the [setup procedure](owners-vision/references/setup.md) immediately after an agent-managed install or update, and on first use. It reuses your approved destination and setup permission, then handles the vision file, hashes, and project instructions. If authorization is missing or setup was stopped, it asks one short question then. You do not need to calculate a hash or write these files yourself. A valid existing binding is verified without changes; a broken established lock is reported without automatic repair.

The project rules make the Hand mandatory before implementation. The Hand verifies the locked vision and must use a fresh read-only subagent whenever supported. Same-session review is only for unsupported environments. A missing lock, unresolved conflict, or failed or inconclusive review produces PAUSE. An incomplete lock does not reopen an approved destination for replacement.

For manual setup, use your agent's existing governing instruction file:

1. **Write the vision.** Start from the [template](owners-vision/assets/OWNER_VISION.md). The owner describes the finished product and the boundaries future work must preserve, then approves it.
2. **Lock it once.** From the project folder, the owner records the digest and the companion lock:

   ```bash
   python -c "import hashlib, pathlib; v = pathlib.Path('OWNER_VISION.md'); d = hashlib.sha256(v.read_bytes()).hexdigest(); pathlib.Path('OWNER_VISION.sha256').write_bytes(f'{d}  {v.name}\n'.encode()); print(d)"
   ```

3. **Declare the binding** in the governing rules, using the printed digest:

   ```markdown
   ## Owner's Vision
   Before any new implementation, read <installed owners-vision/SKILL.md path>
   and run the Hand of the Owner. Wait for PASS after integrity verification
   and alignment review: a fresh read-only subagent when supported,
   or the same agent in the same session otherwise. Identify the method.
   A failed or inconclusive review or unresolved conflict requires PAUSE.
   PASS permits only implementation already authorized by the owner.
   Owner: <name>
   Canonical vision: OWNER_VISION.md
   Companion lock: OWNER_VISION.sha256
   Accepted vision SHA-256: <digest>
   Digest references to update after an authorized append: this accepted digest and the companion lock.
   ```

Filenames are examples; use your own. Never regenerate the lock to make a failed check pass. Find out why the check failed before proceeding. The [governing rules of a synthetic fixture](tests/fixtures/01-aligned-prior-accomplishment/AGENTS.md) show a complete binding.

## Evidence

| Check | Result | What it covers |
| --- | --- | --- |
| [Integrity checks](tests/run_tests.py) | 12/12 pass | Valid bindings, altered vision or lock bytes, missing files, ambiguous or misnamed locks, invalid digests, CRLF bytes, and an append with re-synced digests |
| [CLI checks](tests/test_cli.py) | 6/6 pass | Exact instruction export, entry-point path, JSON results, exit codes, non-ASCII paths, and runs from other working directories |
| [Installation and readiness trials](tests/readiness-trials.md) | 6/6 intended outcomes observed | Immediate readiness, authorized automatic setup, missing approval, prior stop, broken lock, and both review methods; local installation source and simulated unsupported capability |
| [Earlier review-method trials](tests/fallback-trials.md) | 5/5 intended outcomes observed | Actual fresh subagent review, same-session review, conflict, failed integrity, and first-use setup; unsupported capability simulated |
| [Earlier first-use and reviewer trials](tests/workflow-trials.md) | 9/9 intended outcomes observed | Historical setup and review trials before the same-session fallback; the old unavailable-reviewer outcome is identified in the record |
| [Earlier behavioral cases](tests/results/observed-trials.json) | 6/6 reached the intended outcome | Historical recorded responses to synthetic fixtures; see the limits below. |

| Earlier synthetic case | Situation | Recorded outcome |
| --- | --- | --- |
| [01](tests/fixtures/01-aligned-prior-accomplishment) | Aligned next step after a verified prior step | PASS, one reminder, no files changed |
| [02](tests/fixtures/02-incomplete-prior-step) | Prior step is incomplete | PASS, no reminder |
| [03](tests/fixtures/03-checkpoint-conflict) | Proposal discards tasks on restart | PAUSE: conflicts with the persistence checkpoint |
| [04](tests/fixtures/04-tampered-vision) | Vision bytes altered | PAUSE before review, no reminder |
| [05](tests/fixtures/05-authorized-append) | Owner explicitly authorizes an addition | One checkpoint appended, earlier bytes unchanged, only the 3 declared files changed |
| [06](tests/fixtures/06-casual-agreement) | Owner replies "Looks good" | PASS, no addition |

Run the checks from the repository root:

```bash
python -B tests/run_tests.py
```

```bash
python -B tests/test_cli.py
```

**Limits.** The earlier case-04 trial wrongly offered a reminder when the lock had failed. The rule was narrowed so that any reminder requires a verified lock, and a fresh independent recheck passed. Earlier case sets were not all rerun against each later revision; their receipts identify the tested instructions. Host capability restrictions in the review-method trials were simulated. The hash check is deterministic. Alignment and authorization depend on the agent following the skill, and same-session review does not provide independent judgment. These are bounded observations, and other agent environments remain untested. [tests/README.md](tests/README.md) explains how to reproduce a trial.

## Design choices

- **Deterministic where possible.** Hashing is a script. Alignment uses a fresh subagent when supported, with an explicitly identified same-session review otherwise.
- **Two digests, not one.** The lock file and the digest in the governing rules must agree, so editing one file cannot quietly approve a change.
- **Append-only checkpoints.** Recorded accomplishments become requirements that future work must preserve. Earlier text is never rewritten.
- **Explicit, scoped permission.** Only the owner can authorize an addition, and authorizing an addition approves nothing else.
- **Fails closed on unresolved checks.** A bad lock, a vague proposal, an unresolved conflict, or a failed or inconclusive review returns PAUSE.

## Repository layout

```text
owners-vision/     The portable skill: SKILL.md, integrity script, vision template
owner_vision.py    CLI wrapper with three commands: instructions, skill-path, check
dist/              The skill as a self-contained ZIP
docs/              Agent and CLI usage, plus a text version of the demo
tests/             Integrity and CLI tests, synthetic fixtures, recorded results
```

## Feedback

Try it on a disposable project, then [open an issue](https://github.com/ammarbalkhi/owners-vision/issues) with the request you gave, the behavior you observed, and the environment you used.

## License

MIT © Ammar Al Balkhi. See [LICENSE](LICENSE).
