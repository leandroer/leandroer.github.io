import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Guardrails that can say no: OPA policy enforcement for AI agents", description: "A practical architecture for enforcing independent policy decisions at AI agent tool boundaries." };

export default function Article() { return <main className="article-page">
  <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
  <section className="article-head"><p className="eyebrow">FIELD NOTE 006 · AI SECURITY · 31 JUL 2026</p><h1>Guardrails that can say no: OPA policy enforcement for AI agents</h1><p className="dek">Let the agent propose an action. Let independent policy decide whether the system may execute it.</p></section>
  <div className="article-body"><aside className="toc"><b>IN THIS NOTE</b>01 / Execution boundary<br/>02 / Structured facts<br/>03 / Decision contract<br/>04 / Rego guardrail<br/>05 / Approval binding<br/>06 / Failure behavior<br/>07 / Audit and testing</aside><article className="prose">
    <p>AI agent guardrails often begin as instructions: do not access sensitive data, do not execute destructive actions, and ask for approval before high-impact changes. Those instructions are useful, but they are not a security boundary.</p>
    <p>A model can misinterpret an instruction. Retrieved content can compete with it. An application can assemble context incorrectly. A tool can be invoked through a path the prompt did not anticipate. If the same reasoning system decides what to do and whether it is allowed to do it, the control is not independent of the behavior it governs.</p>
    <p>Open Policy Agent provides a different model: the application sends structured facts to an external policy decision point, and the enforcement layer acts on the decision. OPA separates policy decision-making from enforcement and evaluates declarative Rego policies against structured input. <a href="https://www.openpolicyagent.org/docs" rel="noopener noreferrer">OPA documentation ↗</a></p>
    <div className="callout"><strong>Operating principle:</strong> Let the agent propose an action. Let policy decide whether the system may execute it.</div>
    <h2>1. Put policy at the execution boundary</h2><p>OPA becomes useful when the application asks for a decision where an agent crosses a meaningful boundary: sensitive retrieval, external communication, code execution, cloud changes, privileged identity operations, or delegation.</p><p>The policy check should happen after the proposed action and arguments are known, but before credentials are attached or the action is executed.</p>
    <figure className="architecture-flow"><img src="/diagrams/agent-opa-policy-flow.svg" alt="Architecture flow showing an agent proposal passing through trusted context normalization and OPA policy evaluation before tool credentials are attached and the action executes"/><figcaption>REFERENCE ARCHITECTURE / OPA AS AN INDEPENDENT POLICY DECISION POINT</figcaption></figure>
    <p>A policy decision that the application does not enforce is merely advice. The tool gateway—not the model—must own the final allow, deny, or approval behavior.</p>
    <h2>2. Give OPA facts, not prose</h2><p>A useful request includes authenticated actor and tenant, agent identity and version, normalized tool and operation, target resource, environmental risk, approval state, and an immutable action digest. Trust those attributes only when they come from identity, inventory, approval, or control-plane systems—not from the model&apos;s own description.</p>
    <pre><code>{`{
  "actor": {"user_id":"user-1842","tenant_id":"blue","roles":["analyst"]},
  "agent": {"id":"incident-response-agent","version":"2026.07.3"},
  "action": {"tool":"identity_admin","operation":"revoke_sessions",
             "resource":"user-9281","effect":"write"},
  "context": {"environment":"production","human_approval":false}
}`}</code></pre>
    <h2>3. Return a decision contract</h2><p>Agent workflows need more than a boolean. Use explicit states such as <code>allow</code>, <code>deny</code>, <code>require_approval</code>, and <code>allow_with_constraints</code>. Return a reason, policy identifier, risk, and enforceable obligations. Unknown or malformed decisions should fail closed for privileged actions.</p>
    <h2>4. Express the guardrail in Rego</h2><pre><code>{`package agents.guardrails

import rego.v1

default decision := {"decision":"deny", "reason":"No policy permits action"}

decision := {"decision":"allow", "reason":"Authorized read"} if {
  input.action.effect == "read"
  input.actor.tenant_id == input.action.tenant_id
  input.action.tool in data.approved_read_tools
}

decision := {"decision":"require_approval", "risk":"high"} if {
  input.context.environment == "production"
  input.action.effect == "write"
  not input.context.human_approval
}

decision := {"decision":"allow", "reason":"Approved production write"} if {
  input.context.environment == "production"
  input.action.effect == "write"
  input.context.human_approval
  input.context.approved_action_digest == input.action.digest
}`}</code></pre><p>Rego is declarative and supports schemas that improve type checking and expose incorrect input references before deployment. <a href="https://www.openpolicyagent.org/docs/policy-language" rel="noopener noreferrer">Rego policy-language documentation ↗</a></p>
    <h2>5. Bind approval to the exact action</h2><p>“Human approved” is not enough. Bind the reviewer, tool, normalized arguments, target, authority, policy revision, expiration, and action digest. If the agent changes an argument after approval, the digest changes and the approval becomes invalid.</p>
    <h2>6. Define failure behavior</h2><table className="decision-table"><thead><tr><th>ACTION CLASS</th><th>RECOMMENDED FAILURE BEHAVIOR</th></tr></thead><tbody><tr><td>Public read-only lookup</td><td>Consider bounded fail-open only when justified</td></tr><tr><td>Sensitive retrieval</td><td>Fail closed or return reduced data</td></tr><tr><td>External communication</td><td>Fail closed</td></tr><tr><td>Production write</td><td>Fail closed</td></tr><tr><td>Identity, code, or command action</td><td>Fail closed</td></tr></tbody></table><p>A timeout should not silently become permission. Benchmark real policies and data; OPA documents optimization and partial evaluation for latency-sensitive paths. <a href="https://www.openpolicyagent.org/docs/policy-performance" rel="noopener noreferrer">Policy-performance guidance ↗</a></p>
    <h2>7. Distribute, audit, and test safely</h2><p>Record the policy path, bundle revision, input schema, decision ID, result, enforcement outcome, and approval reference. OPA decision logs support bundle and trace metadata, but sensitive fields require deliberate redaction. <a href="https://www.openpolicyagent.org/docs/management-decision-logs" rel="noopener noreferrer">Decision-log documentation ↗</a></p><p>Test missing identity, cross-tenant access, unknown tools, altered arguments, expired approvals, malformed input, stale bundles, timeouts, and conflicting rules. OPA provides a policy test framework through <code>opa test</code>. <a href="https://www.openpolicyagent.org/docs/policy-testing" rel="noopener noreferrer">Policy-testing documentation ↗</a></p>
    <h2>Field checklist</h2><ul><li>Every privileged tool call passes through an enforcement point.</li><li>The model cannot directly access tool credentials.</li><li>Authorization input has identified trust sources.</li><li>Deny is the default for unknown privileged actions.</li><li>Approval is bound to the exact action.</li><li>Policy and schema revisions are recorded.</li><li>Sensitive decision-log fields are redacted.</li><li>Failure paths and misuse cases have tests.</li><li>Bundle rollout, rollback, availability, and latency are monitored.</li></ul>
    <h2>Closing position</h2><p>OPA should not decide whether an agent&apos;s reasoning is good. It should decide whether a proposed action is permitted under explicit organizational policy.</p><div className="callout"><strong>The boundary:</strong> Prompts can guide behavior. Policy can constrain authority. Secure agent design needs both—but should never confuse one for the other.</div>
  </article></div>
</main>; }
