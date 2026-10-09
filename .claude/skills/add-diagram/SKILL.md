---
name: add-diagram
description: Add a new diagram to a design module, or revise an existing one, following the repository's diagram rules and notation files. Use when the user asks to draw, add, change or redraw an architecture diagram for a design in designs/.
---

# Add diagram

Produces one diagram in `designs/<design-name>/diagrams/` as a source file and an export, and updates the module README.

Read these first. They are binding:

- `standards/diagrams.md`
- The notation file in `standards/notations/` for the chosen notation
- `standards/writing.md`

## Steps

### 1. Choose the diagram

State the one question the diagram answers. Choose the type and notation with the table in `standards/diagrams.md`, section 1. If the table has no row for the question, stop and propose a new notation file. Do not draw in an undocumented notation.

### 2. List the content

Before drawing, write two tables and get the user's agreement:

| Element | Type | Technology | Traces to |
|---|---|---|---|

| Source | Target | Label | Synchronous or asynchronous |
|---|---|---|---|

Each element traces to a requirement ID or a Trade-offs row in the module README. Remove any that does not.

### 3. Draw

- Write the diagram as Excalidraw element skeletons to `designs/<design-name>/diagrams/<nn>-<type>[-<subject>].tmp.json`. The skeleton format is the one `mcp__excalidraw__read_me` documents. Give every label an explicit `strokeColor` of `#1e1e1e`; a label otherwise takes its container's stroke colour.
- Apply the shapes, palette rows, label format, title form and sizes from the standards. Do not choose a shape, colour, size or line style that the standards do not set. If the standards do not cover a case, stop and propose a rule.
- Build the legend from the element types and line styles in use.
- To change an existing diagram, start from its `.excalidraw` file.

### 4. Render and inspect

- Run `node tools/render.mjs <file>`. It finishes in under 15 seconds or stops itself.
- Read `<base>.tmp.png`. Run the checklist in `standards/diagrams.md`, section 8, against what the image shows.
- Fix every failure and render again. Repeat until the checklist passes.
- Show the preview to the user. State any deviation from the agreed content.

### 5. Iterate

Apply the user's changes to the temp file, then repeat step 4. Report any rule a requested change would break before making the change.

### 6. Promote

After the checklist passes and the user approves the diagram, run `node tools/render.mjs --promote designs/<design-name>/diagrams/<base>`. Confirm that `<base>.excalidraw` and `<base>.svg` exist and that no `<base>.tmp.*` file remains.

### 7. Update the README

- Add or update the `### 2.<n>` subsection for the diagram, in level order.
- Check that element names in the Requirements `Met by` column and the Trade-offs table match the diagram labels exactly.
