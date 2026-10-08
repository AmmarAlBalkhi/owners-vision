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

The latest [first-use and reviewer workflow trials](workflow-trials.md) cover nine additional cases against the revised setup instructions, including actual nested reviewer calls and the next gate after an authorized addition. Their [receipt](results/setup-workflow.json) records the tested instruction hashes and the limits of the evaluation.

The six supplied fixtures cover:

1. An aligned next step with a verified prior accomplishment.
2. A prior step that remains incomplete.
3. Work that conflicts with a locked persistence checkpoint.
4. Vision bytes that no longer match their accepted lock.
5. Explicit authorization for a concise accomplishment addition.
6. Casual agreement that supplies no append authorization.

Use a fresh agent for each trial. Give it the skill, that case's `REQUEST.md`, and the case's own files. Keep expected outcomes and prior conclusions out of its task. Launch a fresh read-only reviewer when the skill requires alignment review. Only case 5 permits changes to its three declared files; copy the fixtures before testing it.

The included fixtures are fresh starting inputs. Recorded outputs in [results/observed-trials.json](results/observed-trials.json) come from the earlier six-case evaluation, with the failed-lock correction independently rechecked. Local paths and reviewer identifiers have been omitted; response text is preserved. The final wording clarifies reminder timing and was validated afterward, without rerunning every earlier behavioral case.

The twelve executable checks verify the helper. They do not automatically run agents or establish cross-environment behavioral reliability.

To prepare another fresh fixture set, copy `run_tests.py` to a separate sibling `tests/` folder alongside a copy of `owners-vision/`, then run it with `--prepare`. Preparation refuses to overwrite existing fixtures.
