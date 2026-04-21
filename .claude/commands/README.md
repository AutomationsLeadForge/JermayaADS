# `.claude/commands/` — Jermaya's command library

Every `.md` file here is a Claude Code slash command. Drop it into any Claude Code session in this repo and type `/filename <args>` to run it.

## How it works

- The filename is the command name (`update-cv.md` → `/update-cv`).
- The file's body is the prompt Claude receives.
- `$ARGUMENTS` is replaced with whatever you typed after the slash.
- Attached files (drag-drop, paste) are visible to Claude in the same turn — commands can copy them into the repo.
- Front-matter (`description`, `argument-hint`) shows up in the command picker.

## Current commands

| Command | Purpose | Typical use |
|---|---|---|
| `/update-cv` | Add/update an entry in `src/lib/cv.ts` | After finishing a gig, changing a period, or adding education. Drop the logo in the chat if you have one. |

## Adding a new command

1. Create `.claude/commands/<name>.md`.
2. Start with YAML front-matter:
   ```
   ---
   description: one-liner shown in the picker
   argument-hint: "[what the user should type after the slash]"
   ---
   ```
3. Write the prompt body — treat it like a brief for a smart contractor. Include:
   - **Input format** — what `$ARGUMENTS` will look like
   - **Steps** — numbered, with the exact files/tools to touch
   - **Rules** — "never do X", "always preserve Y"
   - **Output** — what to report back when done
4. Commit. No build step needed — Claude Code reads the file live.

## Ideas to add next

- `/new-case-study` — scaffold a new case study in `src/lib/case-studies.ts` from a short prompt + optional screenshot.
- `/new-blog-post` — draft a post in `src/lib/blog.ts` from a topic, in Jermaya's voice.
- `/linkedin-post` — pull a recent win from the CV + stats and turn it into a ready-to-paste LinkedIn post.
- `/cover-letter <job-description>` — read `src/lib/cv.ts`, match relevant roles, draft a tailored cover letter.
- `/publish-site` — typecheck → build → `vercel --prod`, with a preview URL printed.

When in doubt, prefer a single `.md` command over a full skill. Promote to `.claude/skills/<name>/` only when the workflow needs real scripts or multi-file setup (like `clone-website` does).
