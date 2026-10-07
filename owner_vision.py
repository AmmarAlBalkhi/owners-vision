"""Portable command-line access to the Owner's Vision skill and integrity helper."""

import argparse
import importlib.util
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SKILL = ROOT / "owners-vision"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("instructions", help="Print the unchanged skill instructions as UTF-8.")
    commands.add_parser("skill-path", help="Print the absolute entry-point path as UTF-8.")
    check = commands.add_parser("check", help="Verify exact vision bytes; print JSON and exit 0 or 1.")
    check.add_argument("--vision", required=True)
    check.add_argument("--lock", required=True)
    check.add_argument("--expected-sha256", required=True)
    args = parser.parse_args()

    try:
        if args.command == "instructions":
            sys.stdout.buffer.write((SKILL / "SKILL.md").read_bytes())
            return 0
        if args.command == "skill-path":
            sys.stdout.buffer.write((str(SKILL / "SKILL.md") + "\n").encode("utf-8"))
            return 0
        spec = importlib.util.spec_from_file_location("owner_vision_integrity", SKILL / "scripts/check_vision.py")
        helper = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(helper)
        result = helper.check_vision(args.vision, args.lock, args.expected_sha256)
    except OSError:
        result = {"ok": False, "reason": "SKILL_RESOURCE_UNREADABLE"}
    print(json.dumps(result, sort_keys=True))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
