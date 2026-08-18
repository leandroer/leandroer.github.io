# LR InfoSec Lab

The source for [lrinfosec.com](https://lrinfosec.com): open field
notes, tested playbooks, and technical analysis for AI security and incident
response practitioners.

## Capabilities

- Incident detection, triage, investigation, containment, eradication, and recovery
- Evidence preservation, forensic scoping, and hypothesis-driven investigation
- Detection engineering and security telemetry
- Secure code review and repository-compromise response
- **AI Security Incident Response** for LLMs, agents, retrieval systems, models, tools, and delegated identities

The dedicated `/ai-security-ir` guide covers prompt injection and tool abuse,
sensitive-data disclosure, agent and model/API credential compromise, poisoned
retrieval sources, excessive agency, malicious model/tool behavior, AI-specific
telemetry and evidence, explicit response decision gates, rollback safeguards,
and the `AI-IR-01` first-15-minutes playbook.

The `/repository-compromise` guide covers malicious commits, workflow and
dependency modifications, credentials, persistence, evidence preservation,
secret rotation, trusted rebuilds, and validation with code scanning, secret
scanning, dependency review, and post-remediation monitoring.

## Operational playbooks

The site exposes seven playbooks: ransomware, business email compromise, cloud
identity compromise, data exfiltration, repository compromise, malware
outbreak, and AI/LLM incident response.

## Security posture

The site remains statically exported and dependency-light. Content additions
must not weaken Content Security Policy or introduce unnecessary third-party
JavaScript, analytics, or browser-side trackers.

## Local development

```sh
pnpm install
pnpm dev
```

The site is statically exported and deployed through GitHub Actions. Changes
merged into `main` are published automatically to GitHub Pages.

Repository-response controls align with GitHub's official guidance for
[responding to a security incident](https://docs.github.com/en/code-security/tutorials/secure-your-organization/respond-to-a-security-incident)
and [common investigation areas](https://docs.github.com/en/code-security/reference/security-incident-response/investigation-areas).
