# Owner's Vision: PASS / FAIL in 24 seconds

Created by AmmarAlBalkhi.

[Download the video](owners-vision-linkedin.mp4) · [Copy the LinkedIn post](linkedin-post.txt) · [Cover image](owners-vision-cover.png)

The animation explains the decision before new implementation:

- **PASS:** the proposed work fits the owner's vision and preserves verified accomplishments. Vision integrity and alignment review must both pass. The review uses a fresh subagent when supported, or the same agent in the current session otherwise. Work that the owner has already authorized may continue.
- **FAIL → PAUSE:** a conflict, missing integrity evidence, an ambiguous proposal, or a failed or inconclusive review stops implementation. The agent reports the blocker to the owner. The issue must be resolved and the check repeated before work can proceed.

The skill's literal verdicts are `THE HAND OF THE OWNER — PASS` and `THE HAND OF THE OWNER — PAUSE`. The video's **FAIL** describes a failed or incomplete check; **PAUSE** is the resulting action. PASS does not grant owner authorization.

This is an animated explanation of the decision rules. The [full workflow](../demo.md) also covers the accomplishment reminder and additions made only with the owner's explicit permission.

The silent MP4 is 24 seconds, 1080 × 1350, 24 fps, H.264. Text, decision symbols, and connecting lines carry the explanation. Its format falls within [LinkedIn's published video requirements](https://www.linkedin.com/help/linkedin/answer/a548372).

## Edit the animation

`render-demo.js` contains the complete editable vector scenes and timing. It requires Node.js, the `sharp` package, and FFmpeg. Set `VISION_FFMPEG` to the FFmpeg executable, then run `node render-demo.js`. Add `--stills` to render only the SVG and PNG artwork, or `--out PATH` to choose an output directory.

`verification.json` records export checks.
