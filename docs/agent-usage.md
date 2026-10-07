# Use with agents and command-line tools

The skill follows the [Agent Skills directory format](https://agentskills.io/specification). Its instructions are plain Markdown and its integrity helper needs only Python 3's standard library.

## Agents with skill discovery

Install the entire `owners-vision/` folder in the skill directory supported by your agent. Preserve that folder name and its relative resources. Select the skill by its `owners-vision` name. Optional interface metadata may be ignored by other environments.

## Agents that read files

Point the agent at `owners-vision/SKILL.md` and supply the current project's governing rules, locked vision, companion lock, and proposed work. Relative resource paths resolve from `owners-vision/`.

Example request:

> Read owners-vision/SKILL.md and use the Hand of the Owner to assess my proposed next step against this project's locked vision and checkpoints. Perform the gate before implementation.

The agent still needs a fresh independent read-only reviewer. Plain-file loading does not relax the authorization rules or permit a substitute PASS.

## CLI instruction input

From the repository root:

```text
python owner_vision.py instructions
python owner_vision.py skill-path
```

`instructions` emits the exact skill bytes as UTF-8. `skill-path` emits the absolute entry-point path. Both commands work when the wrapper is invoked by absolute path from another working directory.

If an agent CLI accepts instruction text through stdin, use its documented input option with the `instructions` output. Also provide `owners-vision/` as the resource base and supply the project artifacts. CLI input conventions vary by tool.

## Machine-readable integrity check

```text
python owner_vision.py check --vision PROJECT_VISION --lock PROJECT_LOCK --expected-sha256 ACCEPTED_DIGEST
```

The output is JSON. Exit `0` means the supplied bytes and declared digests agree; exit `1` means verification failed; exit `2` means the command arguments are invalid. The accepted digest comes from the project's governing rules, independently of the companion lock.

The original `owners-vision/scripts/check_vision.py` remains directly callable with the same check flags. The CLI verifies integrity; the agent performs alignment review and obtains owner authorization for accomplishment additions. No command automatically appends or grants a gate PASS.

## Sandboxed or remote agents

Transfer the complete skill folder and the relevant project artifacts into the agent's accessible filesystem. Preserve relative paths and use that environment's actual project binding. The repository also includes a self-contained skill archive for this purpose.

The portable file format supports these loading routes. Each host must still provide the required file access and independent reviewer; successful behavior on every agent or operating system has not been established.
