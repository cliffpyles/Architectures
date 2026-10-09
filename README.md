# Architectures

System designs, one module per design. Each module states its requirements, shows the design in diagrams, and records how the design meets each requirement.

## Layout

```
designs/<design-name>/     One module per system design
  README.md                Requirements, design, trade-offs, open questions
  diagrams/                Diagram sources (.excalidraw) and exports (.svg)
standards/                 Rules every module follows
  writing.md               Writing standard
  readme-format.md         Module README format
  diagrams.md              Diagram rules and diagram selection
  notations/               One file per notation (C4, ...)
templates/
  design-README.md         Starting point for a module README
.claude/skills/            Project skills
```

## Skills

| Skill | Use |
|---|---|
| `/new-design` | Create a module from functional and non-functional requirements |
| `/add-diagram` | Add or revise one diagram in a module |
| `/review-design` | Check a module against its requirements and the standards |

## Standards

- [Writing](standards/writing.md)
- [README format](standards/readme-format.md)
- [Diagrams](standards/diagrams.md)
- [C4 notation](standards/notations/c4.md)

A standard changes before the work that depends on the change. A module never deviates from a standard silently; it records the deviation in its Trade-offs section.
