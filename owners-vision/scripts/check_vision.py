"""Read-only, exact-byte verification of an owner-approved vision binding."""

import argparse
import hashlib
import json
import re
from pathlib import Path


def check_vision(vision, lock, expected_sha256):
    expected = expected_sha256.strip().lower()
    if not re.fullmatch(r"[0-9a-f]{64}", expected):
        return {"ok": False, "reason": "INVALID_ACCEPTED_DIGEST"}
    try:
        vision_bytes = Path(vision).read_bytes()
    except OSError:
        return {"ok": False, "reason": "VISION_UNREADABLE"}
    actual = hashlib.sha256(vision_bytes).hexdigest()
    try:
        records = Path(lock).read_text(encoding="utf-8-sig").splitlines()
    except (OSError, UnicodeError):
        return {"ok": False, "reason": "LOCK_UNREADABLE", "vision_sha256": actual}
    if len(records) != 1:
        return {"ok": False, "reason": "INVALID_LOCK", "vision_sha256": actual}
    match = re.fullmatch(r"([0-9a-fA-F]{64})(?:[ \t]+\*?(.+))?", records[0])
    if not match:
        return {"ok": False, "reason": "INVALID_LOCK", "vision_sha256": actual}
    locked = match.group(1).lower()
    if match.group(2) is not None and match.group(2) != Path(vision).name:
        return {"ok": False, "reason": "LOCK_TARGET_MISMATCH", "vision_sha256": actual}
    if actual != expected:
        return {"ok": False, "reason": "VISION_DIGEST_MISMATCH", "vision_sha256": actual}
    if locked != expected:
        return {"ok": False, "reason": "LOCK_DIGEST_MISMATCH", "vision_sha256": actual}
    return {"ok": True, "vision_sha256": actual}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--vision", required=True)
    parser.add_argument("--lock", required=True)
    parser.add_argument("--expected-sha256", required=True)
    args = parser.parse_args()
    result = check_vision(args.vision, args.lock, args.expected_sha256)
    print(json.dumps(result, sort_keys=True))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
