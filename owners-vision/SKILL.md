---
name: owners-vision
description: Check project readiness immediately after installing or updating this skill, complete authorized setup, and review implementation against the owner's vision with a subagent whenever supported; append accomplishments only with explicit authorization.
---

# The Hand of the Owner

Protect the owner's fixed product destination and every owner-locked accomplishment. Use before new implementation and when the owner explicitly authorizes an accomplishment addition. This skill grants no authority to implement, commit, publish, or change a project's direction.

**Owner's Vision** is the owner's authoritative destination and recorded accomplishments. **The Hand of the Owner** is the checking role defined here; its reviewer and verdict cannot change that authority.

## Installation, updates, and project readiness

After any agent-managed installation or update, read the installed copy and check this project's readiness before reporting completion. A request to use the skill also starts with this check. Do not wait for the next implementation request to disclose missing setup. File installation alone does not establish the project's vision or mandatory Hand rule.

Inspect the governing rules, approved vision, companion lock, accepted digest, and required Hand instruction. If initial setup is incomplete, follow [setup](references/setup.md) and automatically finish the work covered by existing, applicable owner approval. Handle files and hashes for the owner. If approval is missing or setup was explicitly stopped, report what is missing and ask one short question to authorize or resume it; do not repeat an answered question. An update request alone does not cancel a previous stop, read-only, or explicit install-only restriction.

For a project without a vision, use the [first-use invitation](references/setup.md#first-use-invitation) to gather the desired end result and details, with the option to provide a Markdown (.md) vision or plan. Use information already supplied before asking for more.

Report installation status and project readiness separately and briefly: ready for Hand checks, setup incomplete with its missing prerequisite, or blocked by an established integrity failure. Verify a complete binding without changing it. Never treat a failed established lock as initial setup or regenerate it to obtain readiness. A file-copy installer may not execute these instructions; the agent handling installation or update must perform this handoff.

Incomplete setup does not reopen an owner-approved destination. On a conflicting implementation request, return PAUSE with the conflict and missing prerequisites; do not propose replacement wording. If the owner says wait or stop, preserve the current state. A missing or mismatched previously established lock is a verification failure, not a fresh-setup opportunity.

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
2. Subagent review has priority and is required whenever supported. Check the environment's available or discoverable reviewer capabilities before declaring it unsupported. Launch one fresh read-only reviewer or oracle subagent and wait for its returned review; do not choose same-session review for convenience. Give it a fresh context containing the exact locked vision, digest, proposal, user-visible result, and relevant evidence. It must not edit, implement, invent an exception, or act as owner authority. Discovering a reviewer tool or reusing an earlier review does not complete this step.
3. If subagents are unsupported, perform a dedicated read-only review yourself in this same session. Re-read the verified vision and compare every part of the proposal with its destination, checkpoints, and acceptance limits. This fallback needs no extra owner approval, new session, or separate CLI call. It is a same-agent review, not an independent review.
4. In either mode, answer: **Does every part of the proposed work fit the locked Owner's Vision and preserve its achieved checkpoints without changing or straying from them?** Check the conclusion against the actual proposal and evidence. An unresolved conflict or inconclusive review requires PAUSE. A failed integrity check stops the gate before review. If a supported subagent was launched but its review failed or did not return, PAUSE; do not use the fallback to bypass that failure or an adverse review.

An implementation's success does not justify rewriting the owner's destination or lowering an achieved checkpoint.

On a conflict, report it and stop implementation. Do not offer to replace, weaken, or renegotiate the vision to make the proposed work fit. Record the method and assessment in the session's normal record. For subagent review, also preserve the actual invocation and returned result; never label a same-agent review independent.

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

After a completed addition, subsequent checks read the newly synchronized binding for this same project. Do not ask for the same addition's authorization again or reuse a review of the earlier bytes. Unresolved governing-instruction conflicts still require PAUSE; never substitute another checkout's binding.

Do not append an accomplishment to obtain alignment for conflicting work.

## Gate verdict

Return exactly one banner, followed by one to three short reasons:

```text
THE HAND OF THE OWNER — PASS
```

Use PASS only when integrity verification and the applicable alignment review pass. Within the short reasons, identify a completed review as `Review: fresh subagent` or `Review: same agent, same session (subagents unsupported)`. PASS means only that already-authorized work may continue; it is not owner approval or proof of completion.

```text
THE HAND OF THE OWNER — PAUSE
```

Use PAUSE for a missing or failed lock, ambiguous proposal, failed or inconclusive review, or unresolved vision/checkpoint conflict. Lack of subagent support alone does not require PAUSE; use the same-session review above. Implementation must not begin or continue on PAUSE; report the conflict to the owner.

One optional accomplishment reminder is the only extra recommendation allowed alongside the gate verdict. Do not add another verdict, implementation plan, or unrelated commentary. This verdict format applies to alignment reviews; an authorized append is reported as the bounded addition and its integrity check.
