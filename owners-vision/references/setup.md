# First-use setup

Run this procedure immediately after an agent-managed install or update, and when asked to use Owner's Vision. Inspect even when only the skill files were updated. Setup establishes the record and mandatory Hand rule; it grants no implementation authority.

1. **Inspect the current project.** Read its governing instruction file and any existing vision, lock, accepted-digest references, and required Hand instruction. Distinguish incomplete initial setup, a complete verified binding, and a failed established binding. Verify a complete binding without changing it; report an established failure without reinitializing it. Use the instruction file this agent actually follows; create `AGENTS.md` only when the host reads it and none exists. Preserve unrelated instructions. Keep the installed skill as the single instruction source, referenced by its actual path. Never borrow another project's vision or hashes.
2. **Resolve the owner's destination and permission.** Read an existing vision completely and preserve already approved wording. If no destination exists, use the [first-use invitation](#first-use-invitation) to gather the intended result, then present a concise draft that preserves the owner's requirements for approval. Obtain one clear approval covering that destination and creation of its protected record and project rule. The owner may authorize this in their own words and need not supply a digest. If those approvals already exist for this exact project and scope, finish authorized initial setup without asking again. If an earlier stop, read-only instruction, or explicit install-only restriction still applies, preserve the project and ask once to resume or expand setup. Installing or updating alone does not revoke that restriction. Approval of a destination alone does not authorize creating its lock or changing project rules. A later conflicting feature request is not approval to replace that destination.
3. **Initialize only the approved binding.** With setup authorization, save the approved vision if needed, calculate SHA-256 from its exact bytes, write its companion lock, and add the binding below to the governing instruction file. Use the current owner and actual paths, and declare every existing accepted-digest reference that future additions must synchronize. This initial digest is accepted under the owner's approval of these bytes and setup; merely calculating a digest supplies no authority. Recheck the inspected state immediately before writing. If files changed, an established binding conflicts, or a declared reference cannot be synchronized within scope, stop and report it rather than overwrite or repair it automatically.
4. **Verify and report readiness now.** Run the packaged read-only integrity helper with the accepted digest from the governing rules. Confirm the saved vision matches the approved wording, every declared digest agrees, the mandatory Hand instruction points to the installed skill, and unrelated instructions remain unchanged. Briefly report installation status separately from project readiness. If setup cannot finish, name the missing permission or prerequisite and ask once in this same response if an owner decision is needed. Do not leave the owner to discover the gap on a later request. Then run the Hand for any already-authorized proposed implementation, using a fresh subagent whenever supported or the same-agent review only when unsupported. Setup alone does not produce a gate PASS.

## First-use invitation

Start with details already supplied and read any provided vision or plan completely. When the intended result is missing or unclear, invite the owner to describe the audience, essential capabilities, what a successful finished result looks like, and important limits or things to avoid. Offer writing in chat or sharing a Markdown (.md) file, as an attachment where supported or by its file path. Neither a file nor a polished specification is required. Help with rough ideas and ask focused follow-up questions only about important gaps.

Use a friendly invitation such as:

> What would you like the finished project to achieve? Describe who it's for, what people should be able to do, what must work for you to consider it complete, and any important limits.
>
> You can describe it here or share a Markdown (.md) file with your full vision or plan. Rough notes are fine; I'll help organize them into a clear vision for your approval.

## Project binding

Adapt this block to the governing instruction file; replace placeholders with verified values:

```markdown
## Owner's Vision and the Hand of the Owner

Before any new implementation, read <installed skill's SKILL.md path> and run
the Hand of the Owner. Do not begin or continue implementation without PASS.
The Hand must verify the vision and review alignment using a fresh read-only
subagent whenever supported; same-session review is only for unsupported hosts.
Identify the review method. A failed or inconclusive review or unresolved
conflict requires PAUSE.
PASS permits only work the owner has already authorized.

Owner: <project owner>
Canonical vision: <vision path relative to this project>
Companion lock: <lock path relative to this project>
Accepted vision SHA-256: <digest of the approved exact bytes>
Digest references to synchronize after an authorized append: <this rule's
accepted digest, the companion lock, and any other declared references>.

Preserve the approved destination and every existing vision byte. Add concise
verified accomplishment lines only after explicit owner authorization;
synchronize the declared hashes as part of that authorized addition.
```

Until setup is complete, implementation remains paused. A blocked gate reports only its reasons; setup discussion stays separate from the gate verdict. Do not keep suggesting vision changes or repeatedly asking for approvals already supplied. A failed or missing previously established lock requires investigation under the existing authority, never this initialization procedure to obtain a pass.
