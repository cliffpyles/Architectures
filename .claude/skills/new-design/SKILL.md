---
name: new-design
description: Create a new system design module under designs/ from functional and non-functional requirements. Use when the user wants to start, create or scaffold a system design or architecture in this repository.
---

# New design

Creates `designs/<design-name>/` with a README in the standard format and the diagrams the design needs.

Read these first. They are binding:

- `standards/writing.md`
- `standards/readme-format.md`
- `standards/diagrams.md`

## Steps

### 1. Name and summary

Get the system's name, its users, the problem it solves and what is out of scope. The module folder is the name in lower-case, hyphenated form. Stop if `designs/<design-name>/` exists and ask whether to revise it.

### 2. Requirements

Collect requirements before any design work.

- Write each functional requirement as one testable behaviour.
- Ask which non-functional properties apply: availability, performance, scalability, durability, consistency, security, privacy, compliance, cost, operability. For each that applies, get a target: a number, a unit and a condition.
- Do not invent a requirement or a target. If the user has no number, propose one, label it as a proposal, and list it under Open questions as an assumption until the user accepts it.
- Ask about one topic at a time.

Show the Requirements table with the `Met by` column empty. Get the user's confirmation before step 3.

### 3. Scaffold

- Copy `templates/design-README.md` to `designs/<design-name>/README.md`.
- Create `designs/<design-name>/diagrams/`.
- Fill the title, summary and Requirements.

### 4. Design

- Derive the elements from the requirements. Add no element that no requirement or trade-off needs.
- Where an NFR sets a number, show the estimate that the design meets it (load, storage, latency budget).
- For each choice with more than one workable option, present the options with what each provides and what each costs. Recommend one. Record the outcome as a Trade-offs row.
- Get the user's agreement on the element list before drawing.

### 5. Diagrams

Choose diagram types with the table in `standards/diagrams.md`, section 1. Start at the highest level the design needs. Use the `add-diagram` skill for each diagram.

### 6. Met by

Fill the `Met by` column for every requirement. Mark a requirement the design does not meet as `Not met` and add it to Open questions.

### 7. Review

Run the `review-design` skill. Fix its Blocking findings. Report the rest to the user.

### 8. Finish

Commit only when the user asks.
