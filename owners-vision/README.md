# Owner's Vision

A reusable Hand of the Owner skill. It checks proposed implementation against the project's exact locked vision and achieved checkpoints. At the next major step, it can remind the owner about a prior verified accomplishment. Adding lines requires explicit owner authorization; existing text stays unchanged.

## Contents

- `SKILL.md`: the role, alignment gate, reminder, and authorized append procedure.
- `agents/openai.yaml`: discovery metadata; implicit selection uses the host's normal default.
- `scripts/check_vision.py`: a read-only SHA-256 checker using Python's standard library.
- `assets/OWNER_VISION.md`: an unlocked starting template, not project authority.

## Use

Invoke `$owners-vision` with this folder available to the agent, or install the folder as `owners-vision` in a skill location supported by the agent. This package does not install itself or modify any project.

The project's governing rules must identify the owner, canonical vision file, companion lock, and accepted SHA-256. They must also identify every reference that needs hash synchronization after an authorized append. Existing project filenames are supported; the examples do not replace them.

For a new project, use the template only when asked to prepare a vision. The owner approves the initial destination and its lock before it becomes authority. No accepted lock or independent reviewer means PAUSE; the skill never invents either.

The digest helper reports integrity, not semantic alignment, owner approval, or implementation permission. A companion lock can contain one digest alone or one standard `digest  filename` record.

Tests and synthetic fixtures are maintained outside this package. Test results establish bounded behavior, not universal reliability.
