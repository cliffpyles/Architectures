# Commit message convention

Applies to every commit in this repository. Messages also follow the [writing standard](writing.md).

## Format

```
<type>[(<design-name>)]: <summary>

[- <change>]
[- <change>]
```

## Types

| Type | Use for |
|---|---|
| `design` | A change to a module under `designs/`. The design name follows in parentheses. |
| `standards` | A change to `standards/` or `templates/` |
| `skills` | A change to `.claude/skills/` |
| `chore` | Any other change: repository configuration, root `README.md`, `CLAUDE.md` |

A commit that spans types uses the type of its main change.

## Rules

1. The summary is a lower-case imperative phrase: `add container diagram`, not `Added` or `Adds`.
2. The first line is at most 72 characters and has no full stop.
3. The body is optional. It is a list with one item per change. State the reason where the change does not make it evident.
4. A diagram's source and export are in the same commit.

## Examples

```
chore: add .gitignore
```

```
design(content-platform): add container diagram

- add 02-container source and export
- fill Met by for FR-1 to FR-4
```

```
standards: require a cost in every trade-off row
```
