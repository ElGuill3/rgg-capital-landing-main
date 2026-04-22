# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts as `## Project Standards (auto-resolved)`.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | `C:\Users\guill\.codex\skills\branch-pr\SKILL.md` |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | `C:\Users\guill\.codex\skills\issue-creation\SKILL.md` |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | `C:\Users\guill\.codex\skills\go-testing\SKILL.md` |
| Analytical artifacts, data-heavy deliverables, MCP tool results, .canvas.tsx | canvas | `C:\Users\guill\.cursor\skills-cursor\canvas\SKILL.md` |
| When user says "judgment day", dual review, juzgar | judgment-day | `C:\Users\guill\.cursor\skills\judgment-day\SKILL.md` |
| When creating a hook, hooks.json, agent automation | create-hook | `C:\Users\guill\.cursor\skills-cursor\create-hook\SKILL.md` |
| Cursor rules, RULE.md, .cursor/rules/, AGENTS.md | create-rule | `C:\Users\guill\.cursor\skills-cursor\create-rule\SKILL.md` |
| New agent skill, SKILL.md authoring | create-skill | `C:\Users\guill\.cursor\skills-cursor\create-skill\SKILL.md` |
| status line, CLI status bar | statusline | `C:\Users\guill\.cursor\skills-cursor\statusline\SKILL.md` |
| settings.json, editor preferences | update-cursor-settings | `C:\Users\guill\.cursor\skills-cursor\update-cursor-settings\SKILL.md` |
| PR merge-ready, CI, review comments | babysit | `C:\Users\guill\.cursor\skills-cursor\babysit\SKILL.md` |
| skill registry, update skills (this file) | skill-registry | `C:\Users\guill\.codex\skills\skill-registry\SKILL.md` |

**Nota:** rutas bajo el perfil de usuario; en otro entorno, ajustar o repetir `sdd-init` / «update skills».

## Project Conventions

| File | Path |
|------|------|
| README del repo | `README.md` |

No se encontró `AGENTS.md`, `.cursorrules` ni `CLAUDE.md` en la raíz del proyecto.

## Compact Rules

### branch-pr
- Cada PR debe enlazar un issue aprobado (issue-first).
- Exactamente una etiqueta `type:*` por PR.
- Los checks automáticos deben pasar antes de merge.

### issue-creation
- Usar plantilla; issues en blanco deshabilitados.
- Añadir `status:approved` antes de abrir PR (flujo del equipo).

### go-testing
- Table-driven tests en Go; teatest para Bubble Tea; golden files cuando aplique.
- *No aplica al stack Vite/React de este repo salvo que se añada Go.*

### canvas
- Usar canvas para análisis autónomos, datos denso, tablas sustitutas; leer la skill al editar `.canvas.tsx`.

### judgment-day
- Lanzar dos reseñas ciegas en paralelo, sintetizar, corregir y re-juzgar (máx. 2 iteraciones).

### create-hook / create-rule / create-skill
- Seguir estructura del skill `create-skill` y convenciones de Cursor en cada caso.

### babysit
- Bucle: comentarios de PR, conflictos, CI verde, hasta merge-ready.

## Registry Metadata

- **Proyecto**: rgg-capital-landing
- **Generado**: 2026-04-22 (sdd-init)
- **Fuentes escaneadas**: `~/.codex/skills/`, `~/.cursor/skills/`, `~/.cursor/skills-cursor/` (excl. `sdd-*`, `_shared`, `skill-registry` como fuente lógica)
