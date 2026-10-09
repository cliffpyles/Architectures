# Module README format

Every `designs/<design-name>/README.md` uses the sections below, in this order, with these headings. Start from [`templates/design-README.md`](../templates/design-README.md).

A section with no content stays in the file and contains the single word `None.`

## Sections

### Title and summary

`# <Design name>` followed by two or three sentences: what the system does, for whom, and what is out of scope.

### 1. Requirements

One table. Every functional and non-functional requirement has one row.

| ID | Requirement | Target | Met by |
|---|---|---|---|
| FR-1 | One testable behaviour, written as "<Actor> can <action>" or "The system <action> when <condition>" | `n/a` | The elements and the mechanism that meet it |
| NFR-1 | One property | A number, a unit and the condition under which it holds | The elements and the mechanism that meet it, or `Not met` |

Rules:

- `FR-` marks a functional requirement and `NFR-` a non-functional one. Functional rows come first.
- IDs are never reused or renumbered. A removed requirement keeps its row, struck through, with the reason.
- An NFR without a target is not accepted. List it under Open questions until it has one.
- Element names in `Met by` match the diagram labels exactly.
- A `Not met` requirement has an entry under Open questions.

### 2. Design

One paragraph that describes how the system works end to end.

Then one subsection per diagram, ordered from the highest level to the lowest:

```
### 2.<n> <Diagram title>

![<Diagram title>](diagrams/<file>.svg)

<One paragraph: what the diagram shows and the question it answers.>
```

### 3. Trade-offs

One row per choice that had more than one workable option.

| Choice | Over | Gains | Costs | Driven by |
|---|---|---|---|---|
| What was chosen | What was rejected | What the choice provides | What the choice gives up | The requirement IDs that drive it |

Rules:

- Every row has a cost. A choice with no cost is not a trade-off and has no row.
- Where two requirements conflict, `Driven by` lists both and `Costs` states which one gives way and by how much.
- A choice that needs more explanation gets one paragraph under the table, headed by the choice in bold.
- Every element on a diagram traces to a `Met by` cell in section 1 or a row here.
- A deviation from a repository standard is recorded as a row here.

### 4. Open questions

A bullet list of unconfirmed assumptions, unmet requirements and unresolved questions. Each bullet states what is unknown and what would resolve it. An assumption starts with `Assumption:`.
