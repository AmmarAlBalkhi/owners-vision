# Owner's Vision

A reusable Hand of the Owner skill. It checks proposed implementation against the project's exact locked vision and achieved checkpoints. At the next major step, it can remind the owner about a prior verified accomplishment. Adding lines requires explicit owner authorization; existing text stays unchanged.

## Contents

- `SKILL.md`: the role, alignment gate, reminder, and authorized append procedure.
- `references/setup.md`: guided first-use approval, binding, and mandatory project rule.
- `agents/openai.yaml`: discovery metadata; implicit selection uses the host's normal default.
- `scripts/check_vision.py`: a read-only SHA-256 checker using Python's standard library.
- `assets/OWNER_VISION.md`: an unlocked starting template, not project authority.

## Use

Invoke `$owners-vision` with this folder available to the agent, or install the folder as `owners-vision` in a skill location supported by the agent. Owner's Vision is the protected record; the Hand of the Owner is the role that checks proposed work against it.

The project's governing rules must identify the owner, canonical vision file, companion lock, and accepted SHA-256. They must also identify every reference that needs hash synchronization after an authorized append. Existing project filenames are supported; the examples do not replace them.

On first use, the agent follows [setup](references/setup.md): confirm the owner's destination and setup permission, create the approved lock and project binding, and register the mandatory Hand rule. Existing explicit approvals are reused. The owner need not calculate hashes or edit instruction files. An incomplete lock never authorizes replacing an approved destination.

Before implementation, the Hand verifies the binding and reviews alignment. It launches and waits for a fresh read-only reviewer subagent when supported. Otherwise the same agent performs the review in the current session, without additional setup or approval. The verdict identifies the method. A failed integrity check, inconclusive review, or conflict means PAUSE. Setup and PASS grant no new implementation authority.

The digest helper reports integrity, not semantic alignment, owner approval, or implementation permission. A companion lock can contain one digest alone or one standard `digest  filename` record.

Tests and synthetic fixtures are maintained outside this package. Test results establish bounded behavior, not universal reliability.
