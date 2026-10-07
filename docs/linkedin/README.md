# Owner's Vision in 27 seconds

Created by AmmarAlBalkhi.

[Download the video](owners-vision-linkedin.mp4) · [Copy the LinkedIn post](linkedin-post.txt) · [Cover image](owners-vision-cover.png)

The video introduces the skill with one simple example: you ask for an offline app, the AI proposes requiring internet, and Owner's Vision tells it to check that change against your saved requirement. It then shows verified, finished work being added to the project record only with explicit permission. Earlier lines stay unchanged.

This is an illustrated example with simplified messages and an imagined task app, not a recorded agent session. The full skill also requires file-integrity verification and a fresh independent reviewer. Its short reminder at the next major step is covered in the accompanying post and [full workflow](../demo.md).

The silent MP4 is 27 seconds, 1080 × 1350, 24 fps, H.264. It uses large, typeset text and simple app drawings. No people or faces appear. The format falls within [LinkedIn's published video requirements](https://www.linkedin.com/help/linkedin/answer/a548372).

## Edit the animation

`render-demo.js` contains the complete editable vector scenes and timing. It requires Node.js, the `sharp` package, and FFmpeg. Set `VISION_FFMPEG` to the FFmpeg executable, then run `node render-demo.js`. Add `--stills` to render only the SVG and PNG artwork.

The video, post, cover, and renderer are presentation assets. They do not change the skill instructions or project authorization rules. `verification.json` records export checks.
