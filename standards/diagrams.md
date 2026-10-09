# Diagram rules

Applies to every diagram in this repository. A notation file in [`notations/`](notations/) adds rules for its notation. Where the two conflict, the notation file applies and states the conflict.

## 1. Choosing a diagram

One diagram answers one question at one level of abstraction. Choose by the question.

| Question | Diagram type | Notation |
|---|---|---|
| Who uses the system, and which other systems does it depend on? | System context | [C4](notations/c4.md) |
| Which deployable parts make up the system, and how do they communicate? | Container | [C4](notations/c4.md) |
| What is inside one container? | Component | [C4](notations/c4.md) |
| In what order do the parts interact in one scenario? | Dynamic | [C4](notations/c4.md) |
| Where does each part run? | Deployment | [C4](notations/c4.md) |

Rules:

- Start at the highest level the audience needs. Add a lower level only when a requirement or trade-off cannot be shown above it.
- A notation is usable only if it has a file in `notations/`. A question the table does not cover (for example data model or state lifecycle) needs a new notation file and a new table row first.
- Do not mix levels in one diagram.

## 2. Files

- Location: `designs/<design-name>/diagrams/`.
- Name: `<nn>-<type>[-<subject>]`, lower case, hyphenated. `nn` orders diagrams from the highest level to the lowest. Examples: `01-context`, `02-container`, `03-component-cms`, `04-dynamic-publish`.
- Every diagram has two permanent files with the same base name: the source (`.excalidraw`) and the export (`.svg`). They are committed together.
- Work in progress uses temp files with the same base name. Git ignores them (`*.tmp.*`).

  | Temp file | Content |
  |---|---|
  | `<base>.tmp.json` | Element skeletons, the input to the render tool |
  | `<base>.tmp.excalidraw` | Source, generated from the skeletons |
  | `<base>.tmp.svg` | Export |
  | `<base>.tmp.png` | Preview of the export |

- `node tools/render.mjs <file>` renders a `.tmp.json` or `.excalidraw` file to temp files. It sets the export options: background on, light mode, scene not embedded.
- A diagram is inspected in its preview before it is shown or promoted. A diagram that has not been rendered is not shown and not promoted.
- `node tools/render.mjs --promote <base>` moves the temp source and export to their permanent names and deletes the other temp files. Promote only when the checklist in section 8 passes on the preview and the user has approved the diagram.
- To change a permanent diagram, render its `.excalidraw` file, edit, inspect the preview, and promote again.

## 3. Content

1. Every element on the diagram traces to a requirement or a trade-off in the module README.
2. Every element has a name. An element keeps the same name in every diagram and in the README.
3. The pieces of a composite shape (person, cylinder, bucket, cloud) and its label form one group.
4. Every element type has exactly one shape and one colour, set by the notation file.
5. Colour is never the only carrier of meaning. Shape, line style, text or position relative to a boundary carries it as well.
6. A diagram has at most 15 elements, excluding the legend. Split a larger diagram by subject.
7. Every diagram has a title, at the top left, in the form the notation file sets.
8. A note is used only for information that elements and relationships cannot express. A note has at most two lines.

## 4. Relationships

1. Every relationship is one arrow with one arrowhead. No bidirectional arrows and no unlabelled arrows.
2. Direction:
   - Synchronous request: from the caller to the callee.
   - Asynchronous event: from the producer to the consumer.
3. Line style:
   - Synchronous request: solid line, filled triangle arrowhead.
   - Asynchronous event: dashed line, open arrowhead.
4. The label is a lower-case verb phrase that states what the source does: `reads content`, `publishes change events`. If a caller both reads and writes, use one arrow labelled `reads and writes`.
5. Arrows do not cross elements. Arrow crossings are removed by rearranging elements where possible.
6. All arrows are black (`#1e1e1e`).

## 5. Layout and style

1. The main flow runs left to right or top to bottom. People are at the left or top. A data store is to the right of or below the elements that write to it.
2. Elements of the same type have the same size. Elements align to rows and columns.
3. The gap between elements is at least 60 px. A gap that holds an arrow label is at least the label width plus 40 px.
4. Text sizes: title 28, element name 20, all other text 16. No text is smaller than 16.
5. Text colour is `#1e1e1e` on every fill.
6. Stroke width is 2 for elements and arrows, and 1 for notes, boundaries and the legend. Roughness and font stay at the Excalidraw defaults. A fill piece with no outline, used to build a composite shape, has roughness 0.
7. Do not use emoji or icons from outside the notation file.

## 6. Palette

| Use | Fill | Stroke |
|---|---|---|
| Person | `#a5d8ff` | `#1971c2` |
| In-scope software (system, container, component) | `#d0bfff` | `#6741d9` |
| Data store | `#c3fae8` | `#0d9488` |
| Network edge | `#ffd8a8` | `#e8590c` |
| External system | `#e9ecef` | `#495057` |
| Note | `#fff3bf` | `#b45309` |
| Boundary, legend | none | `#757575` |

A notation file assigns its element types to these rows. It does not add colours.

## 7. Legend

1. Every diagram has a legend, at the bottom, inside a box titled `Legend`.
2. The legend has one entry for each element type and each line style that the diagram uses. It has no entry for anything the diagram does not use.
3. Each entry shows a miniature of the exact shape, fill and stroke, followed by the type name.
4. The legend states the direction rules in one line: `Requests point from caller to callee. Events point from producer to consumer.` Omit the sentence that does not apply.

## 8. Checklist

Run before a diagram is shown for approval and again before it is saved.

- [ ] The diagram answers one question at one level.
- [ ] Every element traces to a requirement or trade-off.
- [ ] Every element has the same name in every diagram and in the README.
- [ ] Each element uses the shape and palette row its notation file assigns.
- [ ] Every arrow has one arrowhead, a verb-phrase label, and the correct direction and line style.
- [ ] No arrow crosses an element or another arrow.
- [ ] Text sizes are 28, 20 and 16 only.
- [ ] The title is present and in the notation's form.
- [ ] The legend lists exactly the element types and line styles in use, with matching shapes.
- [ ] The element count is 15 or fewer.
- [ ] Labels and notes follow the [writing standard](writing.md).
- [ ] The preview has been inspected: no text leaves its shape, no label overlaps an element or another label, and no shape is malformed.
- [ ] After promotion: source and export exist with the same base name, and no temp files remain.
