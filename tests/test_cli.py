"""Verify the portable CLI's public commands from unrelated working directories."""

import hashlib
import json
import subprocess
import sys
import unittest
import uuid
from pathlib import Path


ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
CLI = REPO / "owner_vision.py"
RUN = ROOT / "runs" / ("cli-" + uuid.uuid4().hex[:8])


def snapshot(folder):
    return {p.relative_to(folder).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in folder.rglob("*") if p.is_file()}


class CliTests(unittest.TestCase):
    def setUp(self):
        self.folder = RUN / self._testMethodName
        self.folder.mkdir(parents=True)

    def invoke(self, *arguments):
        before = snapshot(self.folder)
        result = subprocess.run([sys.executable, "-B", str(CLI), *arguments], cwd=self.folder,
                                capture_output=True, check=False)
        self.assertEqual(snapshot(self.folder), before, "CLI commands must preserve all input files.")
        return result

    def binding(self, name="VISION.md"):
        vision = self.folder / name
        vision.write_bytes(b"Owner-approved destination.\nCheckpoint 1: stored tasks survive restart.\n")
        digest = hashlib.sha256(vision.read_bytes()).hexdigest()
        lock = self.folder / "VISION.sha256"
        lock.write_text(digest + "  " + name + "\n", encoding="utf-8", newline="\n")
        return vision, lock, digest

    def check_arguments(self, vision, lock, digest):
        return ("check", "--vision", str(vision), "--lock", str(lock), "--expected-sha256", digest)

    def test_instructions_preserve_exact_bytes(self):
        result = self.invoke("instructions")
        self.assertEqual(result.returncode, 0)
        self.assertEqual(result.stdout, (REPO / "owners-vision/SKILL.md").read_bytes())
        self.assertEqual(result.stderr, b"")

    def test_entry_point_is_resolvable(self):
        result = self.invoke("skill-path")
        self.assertEqual(result.returncode, 0)
        self.assertEqual(Path(result.stdout.decode("utf-8").strip()), REPO / "owners-vision/SKILL.md")

    def test_valid_binding_returns_machine_readable_success(self):
        result = self.invoke(*self.check_arguments(*self.binding()))
        self.assertEqual(result.returncode, 0)
        self.assertTrue(json.loads(result.stdout)["ok"])
        self.assertEqual(result.stderr, b"")

    def test_tampering_returns_failure_without_repair(self):
        vision, lock, digest = self.binding()
        vision.write_bytes(vision.read_bytes() + b"Unapproved addition.\n")
        result = self.invoke(*self.check_arguments(vision, lock, digest))
        self.assertEqual(result.returncode, 1)
        self.assertEqual(json.loads(result.stdout)["reason"], "VISION_DIGEST_MISMATCH")
        self.assertEqual(result.stderr, b"")

    def test_non_ascii_paths(self):
        result = self.invoke(*self.check_arguments(*self.binding("Vision-\u00e9.md")))
        self.assertEqual(result.returncode, 0)
        self.assertTrue(json.loads(result.stdout)["ok"])

    def test_invalid_arguments_have_distinct_exit_code(self):
        result = self.invoke("check")
        self.assertEqual(result.returncode, 2)
        self.assertEqual(result.stdout, b"")
        self.assertNotIn(b"Traceback", result.stderr)


if __name__ == "__main__":
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(CliTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    report = {"tests_run": result.testsRun, "passed": result.wasSuccessful(),
              "failures": len(result.failures), "errors": len(result.errors),
              "scope": "portable CLI commands on the current host; no universal compatibility claim"}
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results/cli.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    raise SystemExit(0 if result.wasSuccessful() else 1)
