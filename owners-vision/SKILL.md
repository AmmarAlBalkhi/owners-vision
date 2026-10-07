---
name: owners-vision
description: Run the Hand of the Owner before new project implementation against the owner's locked vision and achieved checkpoints; remind the owner about prior accomplishments and append them only with explicit authorization.
---

# The Hand of the Owner

Protect the owner's fixed product destination and every owner-locked accomplishment. Use before new implementation and when the owner explicitly authorizes an accomplishment addition. This skill grants no authority to implement, commit, publish, or change a project's direction.

## Project authority and lock

Read the current project's governing rules to identify its owner, exact vision file, companion SHA-256 lock, and independently accepted digest. Use that project's binding; never substitute another project's vision, a template, or remembered wording. Names such as `OWNER_VISION.md` and `OWNER_VISION.sha256` are examples, not mandatory filenames.

Read the entire vision, including appended checkpoints. Verify its exact bytes against both the companion lock and the accepted digest in the project's governing rules. Missing, unreadable, ambiguous, or inconsistent authority requires PAUSE. Never regenerate a lock to make a failed check pass.

For a read-only integrity check, use [scripts/check_vision.py](scripts/check_vision.py):

```text
python check_vision.py --vision VISION_FILE --lock LOCK_FILE --expected-sha256 ACCEPTED_DIGEST
```

The helper verifies integrity only. It cannot grant a Hand PASS or owner authorization.

## Required alignment review

Before implementation:

1. Verify the current vision and lock. Read the exact proposed work, what the user will do before and after it, and what the user will see when it finishes. A proposal too vague to compare requires PAUSE.
2. Launch one fresh read-only reviewer or oracle. Give it the exact locked vision, digest, proposal, and user-visible result. It must not edit, implement, invent an exception, or act as owner authority. If independent review is unavailable or inconclusive, return PAUSE.
3. Ask it: **Does every part of the proposed work fit the locked Owner's Vision and preserve its achieved checkpoints without changing or straying from them?**
4. Independently compare the proposal with the vision and the review. Preserve every checkpoint's verified behavior and acceptance limits. An unresolved conflict requires PAUSE.

An implementation's success does not justify rewriting the owner's destination or lowering an achieved checkpoint.

## Accomplishment reminder

At the beginning of a new major step, assess the preceding step's recorded outcome and evidence. Do not infer completion or owner acceptance merely because another step is starting.

Offer the reminder only after the current vision's lock has verified. A failed or missing lock requires PAUSE without an append recommendation. When a significant, verified accomplishment from the preceding step is not already recorded in the verified vision, give one short reminder:

> Consider adding the previous step's verified accomplishments to Owner's Vision.

The reminder is advisory. Await authorization only for the addition; otherwise authorized work that passes the current vision gate may continue. A pending or declined reminder does not itself cause PAUSE. The owner need not dictate the lines or use a prescribed sentence.

A preceding milestone is assessed when the Hand is invoked to begin the following major step. A final milestone can receive the same assessment through an owner-requested closing review.

## Owner-authorized additions

Append only after the owner explicitly authorizes adding those accomplishments. Milestone completion, reviewer PASS, silence, casual agreement, or approval of the next step does not authorize an addition. If the action or its scope is unclear, leave the addition pending.

After authorization:

- Write concise, factual accomplishment lines from verified results, within the authorized scope. Include essential evidence or acceptance limits when they define what future work must preserve. Do not claim acceptance the owner has not given.
- Reverify the current lock immediately before writing. Append while preserving every existing byte; never rewrite, delete, reformat, narrow, or replace existing vision text or checkpoint entries.
- Synchronize only the existing lock and accepted-digest references declared by the project's governing rules. Authorization for the accomplishment addition covers its necessary hash synchronization, not unrelated governance edits.
- Confirm that the previous bytes remain an unchanged prefix, every declared digest matches the resulting file, and no unrelated file changed. Report the added lines and verification. If synchronization is incomplete, report PAUSE and do not treat the resulting state as locked.

Do not append an accomplishment to obtain alignment for conflicting work.

## Gate verdict

Return exactly one banner, followed by one to three short reasons:

```text
THE HAND OF THE OWNER — PASS
```

Use PASS only when integrity verification and independent alignment review pass. PASS means only that already-authorized work may continue; it is not owner approval or proof of completion.

```text
THE HAND OF THE OWNER — PAUSE
```

Use PAUSE for a missing or failed lock, ambiguous proposal, unavailable independent review, or unresolved vision/checkpoint conflict. Implementation must not begin or continue on PAUSE; report the conflict to the owner.

One optional accomplishment reminder is the only extra recommendation allowed alongside the gate verdict. Do not add another verdict, implementation plan, or unrelated commentary. This verdict format applies to alignment reviews; an authorized append is reported as the bounded addition and its integrity check.
