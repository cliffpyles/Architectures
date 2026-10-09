---
name: review-design
description: Check a design module against its own requirements and the repository standards (README format, diagram rules, writing standard) and report findings. Use when the user asks to review, check, validate or audit a design in designs/, and as the last step of new-design.
---

# Review design

Checks one module in `designs/` and reports findings. It changes no file unless the user asks.

Read `standards/writing.md`, `standards/readme-format.md`, `standards/diagrams.md` and each notation file the module's diagrams use.

## Checks

### Requirements

- Every FR is one testable behaviour.
- Every NFR has a target with a number, a unit and a condition.
- Every requirement has a `Met by` entry.
- Each `Met by` entry names elements that appear on a diagram, with matching names.
- The stated mechanism meets the target. Check the arithmetic of each estimate.
- Each `Not met` requirement has an entry under Open questions.

### Trade-offs

- Every row has all five columns filled, including a cost.
- `Driven by` cites requirement IDs that exist.
- Where a row cites conflicting requirements, `Costs` states which one gives way and by how much.
- Every element on a diagram traces to a `Met by` cell or a Trade-offs row. Report elements that do not.

### README format

- All sections are present, in order, with the standard headings.
- Tables have the standard columns.
- Every diagram in `diagrams/` has a subsection under Design, in level order.

### Diagrams

For each diagram, run the checklist in `standards/diagrams.md`, section 8, and the rules of its notation file. Read the `.excalidraw` source to check shapes, colours, text sizes, arrow styles and the legend. Confirm that the export exists and is not older than the source.

### Writing

Check README text and diagram labels against `standards/writing.md`. Quote each violation.

## Report

Reply with a table, ordered by severity:

| Severity | Location | Finding | Rule |
|---|---|---|---|

- `Blocking`: a requirement is unmet or has no `Met by` entry, a required section or file is missing, or a diagram breaks a rule that changes its meaning (direction, line style, shape, legend).
- `Concern`: a rule is broken without changing meaning.
- `Note`: an observation that breaks no rule.

`Location` is a file and line, or a diagram file and element name. `Rule` cites the standard and section.

State the count of findings at each severity. If there are none, say so in one sentence.
