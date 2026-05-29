# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts as `## Project Standards (auto-resolved)`.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Create Gentle AI pull requests with issue-first checks. Trigger: creating, opening, or preparing PRs for review. | branch-pr | `/home/guill3/.gemini/skills/branch-pr/SKILL.md` |
| Trigger: PRs over 400 lines, stacked PRs, review slices. Split oversized changes into chained PRs that protect review focus. | chained-pr | `/home/guill3/.gemini/skills/chained-pr/SKILL.md` |
| Design docs that reduce cognitive load. Trigger: writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs. | cognitive-doc-design | `/home/guill3/.gemini/skills/cognitive-doc-design/SKILL.md` |
| Write warm, direct collaboration comments. Trigger: PR feedback, issue replies, reviews, Slack messages, or GitHub comments. | comment-writer | `/home/guill3/.gemini/skills/comment-writer/SKILL.md` |
| Trigger: Go tests, go test coverage, Bubbletea teatest, golden files. Apply focused Go testing patterns. | go-testing | `/home/guill3/.gemini/skills/go-testing/SKILL.md` |
| Create Gentle AI issues with issue-first checks. Trigger: creating GitHub issues, bug reports, or feature requests. | issue-creation | `/home/guill3/.gemini/skills/issue-creation/SKILL.md` |
| Trigger: judgment day, dual review, adversarial review, juzgar. Run blind dual review, fix confirmed issues, then re-judge. | judgment-day | `/home/guill3/.gemini/skills/judgment-day/SKILL.md` |
| Trigger: new skills, agent instructions, documenting AI usage patterns. Create LLM-first skills with valid frontmatter. | skill-creator | `/home/guill3/.gemini/skills/skill-creator/SKILL.md` |
| Trigger: improve skills, audit skills, refactor skills, skill quality. Audit and upgrade existing LLM-first skills. | skill-improver | `/home/guill3/.gemini/skills/skill-improver/SKILL.md` |
| Plan commits as reviewable work units. Trigger: implementation, commit splitting, chained PRs, or keeping tests and docs with code. | work-unit-commits | `/home/guill3/.gemini/skills/work-unit-commits/SKILL.md` |

**Nota:** rutas bajo el perfil de usuario de Linux; en otro entorno, repetir `sdd-init`.

## Project Conventions

| File | Path |
|------|------|
| README del repo | `README.md` |

No se encontró `AGENTS.md`, `.cursorrules` ni `CLAUDE.md` en la raíz del proyecto.

## Compact Rules

### branch-pr
- Crear Gentle AI pull requests con chequeos previos (issue-first).
- Cada PR debe tener una etiqueta `type:*`.

### chained-pr
- Dividir cambios de más de 400 líneas en PRs encadenados para proteger el foco de revisión.
- Organizar el flujo con branches tracker o stacked branches.

### cognitive-doc-design
- Diseñar documentación de manera clara y jerárquica para guías, READMEs y RFCs, reduciendo la carga cognitiva.

### comment-writer
- Escribir comentarios de colaboración cálidos, directos y constructivos.

### go-testing
- *No aplica al stack Vite/React de este repo salvo que se añada Go.*

### issue-creation
- Crear Gentle AI issues con chequeos previos (issue-first).

### judgment-day
- Realizar revisiones ciegas en paralelo, corregir problemas confirmados y volver a juzgar (máx. 2 iteraciones).

### skill-creator
- Crear nuevas skills LLM-first siguiendo la estructura de frontmatter y bloques contractuales.

### skill-improver
- Auditar y refinar la observabilidad y los contratos de las skills existentes.

### work-unit-commits
- Planificar commits como unidades de trabajo atómicas y autocontenidas (manteniendo código, tests y documentación juntos).

## Registry Metadata

- **Proyecto**: rgg-capital-landing
- **Generado**: 2026-05-29 (sdd-init)
- **Fuentes escaneadas**: `/home/guill3/.gemini/skills/` (excl. `sdd-*`, `_shared`, `skill-registry` como fuente lógica)
