# Use with agents and command-line tools

The skill follows the [Agent Skills directory format](https://agentskills.io/specification). Its instructions are plain Markdown, and its integrity helper needs only Python 3's standard library.

**Every route needs** file access to the project, Python 3 for the integrity check, and a way to launch a fresh independent read-only reviewer. If no reviewer is available, the gate returns PAUSE. No loading route relaxes the authorization rules.

## One-command installation

From your project directory, use the [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add AmmarAlBalkhi/owners-vision --skill owners-vision --copy
```

The installer currently requires Node.js 22.20 or newer. Select your agent if prompted. `--copy` installs the complete skill without requiring symlinks. To choose an agent directly, add its `--agent` value from the table below. Keep the project scope; omit `--global` unless you want an installation shared across projects.

Then ask your agent to use `owners-vision` in this project. It follows [first-use setup](../owners-vision/references/setup.md), obtains any missing destination/setup approval, creates the approved binding, and registers the mandatory Hand rule. You need not calculate hashes or write project instructions. Installation alone does not establish authority or supply an independent reviewer. [Manual binding instructions](../README.md#bind-your-project) are also available.

The standalone skill and integrity helper need Python, not Node.js. Use the manual copy or ZIP route if you do not want the Node-based installer.

### Installation evidence

Tested on Windows with PowerShell, Node.js 24.19.0, and Skills CLI 1.7.1 on 2026-10-07. The test installed the public repository into an isolated project, selected the four targets below, and compared all six skill files byte for byte. Both installed copies' integrity helpers accepted the intact fixture and rejected the tampered fixture without changing either input. [Machine-readable receipt](../tests/results/installation.json).

| Target | `--agent` value | Project destination | File installation | Full agent workflow |
| --- | --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/owners-vision/` | Verified on Windows | Not tested |
| Gemini CLI | `gemini-cli` | `.agents/skills/owners-vision/` | Verified on Windows | Not tested |
| OpenCode | `opencode` | `.agents/skills/owners-vision/` | Verified on Windows | Not tested |
| Shared skill directory | `universal` | `.agents/skills/owners-vision/` | Verified on Windows | Depends on the client |

Several targets share one installed copy. These results verify the installer's file placement and the Python helper; they do not establish that each agent discovers the skill, launches an independent reviewer, or follows every authorization rule. Linux, macOS, global installations, and other targets have not been tested here. The README's synthetic behavioral trials are separate evidence.

On 2026-10-08, the revised seven-file package was also installed from a local candidate repository into a disposable shared skill directory using the same installer. All seven files matched, including the new setup reference; the installed helper again accepted intact input and rejected tampered input without edits. This was a local installation check with telemetry disabled. [Receipt](../tests/results/setup-workflow.json).

To repeat the installation check with the same installer version, use `skills@1.7.1` in place of `skills`, select the targets above, and use a disposable project. The unversioned command resolves the current installer release. Either command fetches the repository's current default branch; the receipt records the source commit tested here.

## Agents with skill discovery

Install the entire `owners-vision/` folder in your agent's skill directory. Keep the folder name and its relative resources. From the repository root, these examples copy it into a project-local `.agents/skills/` directory. For another project, use that project's destination path.

In Bash:

```bash
mkdir -p .agents/skills && cp -r owners-vision .agents/skills/
```

In PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills | Out-Null
Copy-Item -LiteralPath owners-vision -Destination .agents/skills/ -Recurse
```

Use a fresh destination. If the skill is already installed, preserve local changes before replacing it.

Then select the skill by its `owners-vision` name. Environments that don't use the optional interface metadata in `agents/` can ignore it.

## Agents that read files

Point the agent at `owners-vision/SKILL.md`, and supply the project's governing rules, locked vision, companion lock, and proposed work. Relative resource paths resolve from `owners-vision/`.

> Read owners-vision/SKILL.md and use the Hand of the Owner to assess my proposed next step against this project's locked vision and checkpoints. Perform the gate before implementation.

## CLIs that accept instruction text

From the repository root:

```bash
python owner_vision.py instructions
```

```bash
python owner_vision.py skill-path
```

`instructions` prints the exact skill bytes as UTF-8. `skill-path` prints the absolute path of the entry point. Both commands work when the wrapper is called by absolute path from another working directory. If an agent CLI reads instruction text from stdin, pass the `instructions` output through its documented input option, and provide `owners-vision/` as the resource base. Input conventions vary by tool.

## Sandboxed or remote agents

Transfer the complete skill folder, or [the self-contained ZIP](../dist/owners-vision.zip), along with the relevant project files, into the agent's filesystem. Keep relative paths, and use that environment's actual project binding.

## Integrity check reference

```bash
python owner_vision.py check --vision PROJECT_VISION --lock PROJECT_LOCK --expected-sha256 ACCEPTED_DIGEST
```

If only the skill folder is installed, `python owners-vision/scripts/check_vision.py` accepts the same flags. The accepted digest comes from the project's governing rules, independently of the companion lock. The check only reads files: it never repairs, appends, or grants a gate PASS.

| Exit code | Meaning |
| --- | --- |
| `0` | The vision bytes, the companion lock, and the accepted digest all agree. |
| `1` | Verification failed, or a required skill resource could not be read. The JSON output gives the `reason`. |
| `2` | The command arguments are invalid. Usage goes to stderr, and stdout is empty. |

| `reason` | Cause |
| --- | --- |
| `INVALID_ACCEPTED_DIGEST` | The accepted digest is not 64 hexadecimal characters. |
| `VISION_UNREADABLE` | The vision file is missing or unreadable. |
| `LOCK_UNREADABLE` | The lock file is missing, unreadable, or not UTF-8 text. |
| `INVALID_LOCK` | The lock is not exactly one line in the form `digest` or `digest  filename`. |
| `LOCK_TARGET_MISMATCH` | The lock names a different file than the vision. |
| `VISION_DIGEST_MISMATCH` | The vision bytes don't match the accepted digest. |
| `LOCK_DIGEST_MISMATCH` | The lock's digest doesn't match the accepted digest. |
| `SKILL_RESOURCE_UNREADABLE` | `owner_vision.py` only: the skill folder beside the wrapper can't be read. |

Most failures also include the vision's actual `vision_sha256`.

Successful behavior on every agent and operating system has not been established. Each host must still provide the required file access and an independent reviewer.
