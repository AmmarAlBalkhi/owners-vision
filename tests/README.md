# Tests

All fixtures and owner requests here are synthetic. No live project is needed.

From the repository root, run:

```text
python -B tests/run_tests.py
python -B tests/test_cli.py
```

The runner exercises the real digest helper through its command line. The twelve checks cover valid bindings, altered vision bytes, altered locks, independently accepted digests, missing inputs, ambiguous records, wrong filenames, invalid digests, standard binary records, exact line-ending bytes, and an append with synchronized digests. Each run creates fresh inputs under `runs/` and writes `results/automated.json`.

The six CLI checks cover exact instruction export, a resolvable entry-point path, machine-readable success, tampering without repair, non-ASCII filenames, and invalid-argument exit codes. They invoke the wrapper from unrelated working directories and verify that input files stay unchanged. Their results are in `results/cli.json`.

## Behavioral cases

The [installation and readiness trials](readiness-trials.md) cover immediate readiness after agent-managed installation or update, automatic completion of authorized setup, missing approval, a previous stop, an established broken lock, and both review methods. The earlier [review-method trials](fallback-trials.md) also cover conflict and first-use behavior with unsupported subagents. Earlier [first-use and reviewer workflow trials](workflow-trials.md) cover nine cases from before the fallback was introduced, including actual nested reviewer calls and the next gate after an authorized addition. Each receipt identifies its tested instruction hashes and evaluation limits.

The six supplied fixtures cover:

1. An aligned next step with a verified prior accomplishment.
2. A prior step that remains incomplete.
3. Work that conflicts with a locked persistence checkpoint.
4. Vision bytes that no longer match their accepted lock.
5. Explicit authorization for a concise accomplishment addition.
6. Casual agreement that supplies no append authorization.

Use a fresh agent for each trial. Give it the skill, that case's `REQUEST.md`, and the case's own files. Keep expected outcomes and prior conclusions out of its task. Use the review method required by the skill and the trial's stated host capabilities. Only case 5 permits changes to its three declared files; copy the fixtures before testing it.

The included fixtures are fresh starting inputs. Recorded outputs in [results/observed-trials.json](results/observed-trials.json) come from the earlier six-case evaluation, with the failed-lock correction independently rechecked. Local paths and reviewer identifiers have been omitted; response text is preserved. The final wording clarifies reminder timing and was validated afterward, without rerunning every earlier behavioral case.

The twelve executable checks verify the helper. They do not automatically run agents or establish cross-environment behavioral reliability.

To prepare another fresh fixture set, copy `run_tests.py` to a separate sibling `tests/` folder alongside a copy of `owners-vision/`, then run it with `--prepare`. Preparation refuses to overwrite existing fixtures.

Repository references in historical receipts were updated to [ammarbalkhi/owners-vision](https://github.com/ammarbalkhi/owners-vision) on 2026-10-08. Recorded commands and requests reflect the account rename and are no longer verbatim. Test results, dates, tested commits, and digests are unchanged. The [original receipts](https://github.com/ammarbalkhi/owners-vision/tree/6eb1438b7c52194422d5cf5fd81e78d9a40f5cf0/tests/results) remain in Git history.

## Historical result summaries

These sets describe earlier instruction versions. They are preserved as historical evidence; the [readiness trials](readiness-trials.md) cover the latest behavior evaluated here.

| Check | Result | What it covers |
| --- | --- | --- |
| [Earlier review-method trials](fallback-trials.md) | 5/5 intended outcomes observed | Actual fresh subagent review, same-session review, conflict, failed integrity, and first-use setup; unsupported capability simulated |
| [Earlier first-use and reviewer trials](workflow-trials.md) | 9/9 intended outcomes observed | Historical setup and review trials before the same-session fallback; the old unavailable-reviewer outcome is identified in the record |
| [Earlier behavioral cases](results/observed-trials.json) | 6/6 reached the intended outcome | Historical recorded responses to synthetic fixtures; see the evaluation notes above. |

| Earlier synthetic case | Situation | Recorded outcome |
| --- | --- | --- |
| [01](fixtures/01-aligned-prior-accomplishment) | Aligned next step after a verified prior step | PASS, one reminder, no files changed |
| [02](fixtures/02-incomplete-prior-step) | Prior step is incomplete | PASS, no reminder |
| [03](fixtures/03-checkpoint-conflict) | Proposal discards tasks on restart | PAUSE: conflicts with the persistence checkpoint |
| [04](fixtures/04-tampered-vision) | Vision bytes altered | PAUSE before review, no reminder |
| [05](fixtures/05-authorized-append) | Owner explicitly authorizes an addition | One checkpoint appended, earlier bytes unchanged, only the 3 declared files changed |
| [06](fixtures/06-casual-agreement) | Owner replies "Looks good" | PASS, no addition |
