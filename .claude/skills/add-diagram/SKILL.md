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

- Call `mcp__excalidraw__read_me` once per session, then draw with `mcp__excalidraw__create_view`.
- Apply the shapes, palette rows, label format, title form and sizes from the standards. Do not choose a shape, colour, size or line style that the standards do not set. If the standards do not cover a case, stop and propose a rule.
- Build the legend from the element types and line styles in use.
- Run the checklist in `standards/diagrams.md`, section 8, before showing the diagram.

### 4. Iterate

Revise from the returned checkpoint. Re-run the checklist after each revision. Report any rule a requested change would break before making the change.

### 5. Save

After the user approves the diagram:

- Write the source to `designs/<design-name>/diagrams/<nn>-<type>[-<subject>].excalidraw` as an Excalidraw file: `{"type": "excalidraw", "version": 2, "source": "architectures", "elements": [...], "appState": {"viewBackgroundColor": "#ffffff"}, "files": {}}`.
  - Omit camera, checkpoint and delete pseudo-elements.
  - Write each shape label and arrow label as a separate `text` element with `containerId` set to the shape or arrow, and list it in that element's `boundElements`.
- Produce the export with the same base name and the `.svg` extension, using the export settings in `standards/diagrams.md`, section 2. If the session has no tool that exports an Excalidraw file, ask the user to export it from Excalidraw and save it at that path. Do not embed a missing image in the README.

### 6. Update the README

- Add or update the `### 2.<n>` subsection for the diagram, in level order.
- Check that element names in the Requirements `Met by` column and the Trade-offs table match the diagram labels exactly.
