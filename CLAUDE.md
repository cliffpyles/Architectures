# Architectures

This repository holds system designs. Each design is a module under `designs/`.

## Rules

- Read the relevant files in `standards/` before creating or editing a module. They are binding.
- Use the project skills for module work: `new-design`, `add-diagram`, `review-design`.
- A design starts from written functional and non-functional requirements. Do not invent requirements. Record anything assumed under Open questions and confirm it with the user.
- Designs are technology-neutral. Name elements by role (Database, Object Storage, CDN). Name a product, vendor or protocol only when a requirement fixes it.
- Every element of a design traces to a requirement or to a row in the module's Trade-offs section.
- Every diagram has a source file (`.excalidraw`) and an export (`.svg`) with the same base name. Update both together.
- Work on a diagram in temp files (`<base>.tmp.*`), render it with `node tools/render.mjs`, and read the preview image before showing or promoting it. Never report on a diagram you have not seen rendered.
- Use only notations that have a file in `standards/notations/`. To use a new notation, add its file first.
- All text follows `standards/writing.md`, including diagram labels and commit messages.
- Every commit message follows `standards/commits.md`.
- If a standard blocks a good design, propose a change to the standard. Do not work around it.
