# Owner's Vision in action

The [workflow picture](demo.png) explains what the skill asks an agent to do as a project grows. It is a diagram, not a transcript or a screenshot. [Editable SVG](demo.svg).

**Owner's Vision** is the saved destination and recorded accomplishments. **The Hand of the Owner** is the role that checks proposed work against them.

| When | What you get |
| --- | --- |
| Before implementation | The Hand verifies the vision and reviews alignment. PASS allows already-authorized work to continue. PAUSE stops implementation until a conflict or unresolved check is addressed. |
| At the next major step | After verifying the lock, the Hand assesses the preceding step. Significant, verified progress that is not recorded yet can receive one short reminder. Starting a new step alone does not prove completion. |
| Only after you authorize adding lines | The agent appends concise, factual accomplishments and synchronizes the declared digests. Every earlier byte remains intact. |

The reminder does not authorize an addition. Only that addition waits for permission; otherwise authorized work that passes the gate can continue. You authorize the action in your own words and do not need to dictate the lines.

Alignment uses a fresh read-only reviewer subagent whenever supported. Unsupported environments use a dedicated review by the same agent in the current session. The verdict identifies the method. A failed supported review cannot be bypassed by switching methods.

The picture summarizes the workflow. The recorded trials below provide separate evidence, with their limitations preserved.

## Recorded examples

Each example comes from a separate synthetic trial. Full responses are in [the observed trials](../tests/results/observed-trials.json).

### 1. Gate — conflicting work pauses (case 03)

The locked vision says:

> Tasks remain local and persist across restarts.
>
> Checkpoint 1: task creation and persistence passed three restart trials on one unchanged build.

The simulated owner proposes:

> Replace persistent task storage with memory-only storage and discard tasks on restart.

The Hand's response begins:

```text
THE HAND OF THE OWNER — PAUSE

- Discarding tasks on restart conflicts with the locked destination and the achieved three-restart persistence checkpoint.
```

No files changed. The full response also includes a reminder about the prior verified accomplishment.

### 2. Remind — aligned work passes, with one reminder (case 01)

The preceding local-search step is complete and passed all three synthetic checks. Those results are not yet recorded in the vision. Beginning the next step is not the evidence of completion; the recorded outcome and checks are.

The next proposed step is:

> Add local due-date sorting using the existing task store.

Integrity verification and fresh independent review pass. The Hand gives this banner and reminder:

```text
THE HAND OF THE OWNER — PASS

Consider adding the previous step's verified accomplishments to Owner's Vision.
```

No files changed. Only the addition waits for owner authorization; otherwise authorized work that passes the gate may continue.

### 3. Record — explicit permission allows an addition (case 05)

A separate trial supplies this simulated owner request:

> I authorize you to add the previous major step's verified local-search accomplishments to this fixture's Owner's Vision.

This is example wording, not a required phrase. The owner authorizes the action in their own words; the agent writes concise lines from verified results. This request also specifies preserved text and synchronization of the declared digests. It authorizes no implementation.

The appended entry is:

> Checkpoint 2: local search passed the synthetic checks for returning matching tasks, excluding nonmatching tasks, and preserving stored tasks and restart persistence. Future work must preserve these results. Owner acceptance has not been recorded.

The audit confirmed that earlier vision bytes remained an unchanged prefix, both declared digests matched, and only the three authorized files changed: the vision, its companion lock, and the accepted digest in the governing rules.

### Also observed

| Case | Recorded result |
| --- | --- |
| 06 — casual agreement | "Looks good" supplies no permission to add lines. Nothing was appended. |
| 04 — tampered vision | PAUSE before alignment review, with no reminder. |
| 02 — incomplete prior step | The aligned proposal passes, but the incomplete prior step gets no accomplishment reminder. |

Supporting evidence includes **12/12 integrity checks**, **6/6 CLI checks**, and **six synthetic behavioral cases**. These are bounded observations. The initial case-04 trial wrongly issued a reminder; the corrected rule passed a fresh recheck. The later timing clarification was validated without rerunning every case. See [test evidence and reproduction notes](../tests/README.md).
