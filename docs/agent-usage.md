# Use with agents and command-line tools

The skill follows the [Agent Skills directory format](https://agentskills.io/specification). Its instructions are plain Markdown, and its integrity helper needs only Python 3's standard library.

**Every route needs** file access to the project, Python 3 for the integrity check, and a way to launch a fresh independent read-only reviewer. If no reviewer is available, the gate returns PAUSE. No loading route relaxes the authorization rules.

## Agents with skill discovery

Install the entire `owners-vision/` folder in your agent's skill directory. Keep the folder name and its relative resources. For example, with a project-local `.agents/skills/` directory:

```bash
mkdir -p .agents/skills && cp -r owners-vision .agents/skills/
```

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
| `1` | Verification failed. The JSON output gives the `reason`. |
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
