import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The first 60 minutes of an AI security incident",
  description: "A commander-and-operator timeline for stopping autonomous activity, revoking unsafe authority, preserving AI evidence, and bounding downstream impact.",
};

const timeline = [
  ["00–05", "Recognize", "Confirm the boundary crossing"],
  ["05–10", "Command", "Declare, assign owners, freeze changes"],
  ["10–20", "Suspend", "Stop runs, queues and handoffs"],
  ["20–30", "Revoke", "Contain identities, sessions and tools"],
  ["30–45", "Preserve", "Capture state and reconstruct actions"],
  ["45–60", "Scope", "Hunt downstream and issue the update"],
];

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav aria-label="Primary navigation"><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 008 · AI SECURITY · 28 AUG 2026</p><h1>The first 60 minutes of an AI security incident</h1><p className="dek">Stop additional autonomous actions, remove unsafe authority, preserve the decision trail, and establish a defensible scope.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Recognition<br/>02 / Incident command<br/>03 / Agent suspension<br/>04 / Credential revocation<br/>05 / Evidence<br/>06 / Downstream hunting<br/>07 / Communications<br/>08 / Exit criteria</aside>
      <article className="prose">
        <p>An AI incident does not begin and end with a suspicious response. The systems around the model—identities, tools, retrieval pipelines, memory, queues, and downstream applications—determine the real blast radius.</p>
        <p>The first hour is not about proving root cause. It is about stopping additional autonomous actions, removing unsafe authority, preserving the decision trail, and establishing a defensible scope.</p>
        <div className="callout"><strong>Operating principle:</strong> Stop new authority first. Preserve enough state to explain how that authority was previously used.</div>

        <h2>When unexpected behavior becomes an incident</h2>
        <p>Not every hallucination is a security incident. Escalate when the agent has crossed, or attempted to cross, a security or authorization boundary.</p>
        <ul><li>Executing a tool without the expected approval.</li><li>Accessing data outside the user&apos;s tenant, role, case, or assigned scope.</li><li>Disclosing sensitive retrieval results in a prompt, response, trace, or external message.</li><li>Using a delegated credential for an unintended operation.</li><li>Writing poisoned or unauthorized content into long-term memory.</li><li>Modifying cloud resources, identities, repositories, tickets, or production systems.</li><li>Spawning subagents, workflows, or tool calls that responders cannot account for.</li><li>Continuing to operate after the initiating user session has ended.</li></ul>
        <p>The incident threshold should be based on what the system attempted and what authority it possessed—not only on the final text shown to the user. Current NIST guidance treats incident response as part of broader cybersecurity risk management rather than an isolated forensic activity. <a href="https://csrc.nist.gov/pubs/sp/800/61/r3/final" rel="noopener noreferrer">NIST SP 800-61 Rev. 3 ↗</a></p>

        <h2>The first-hour operating timeline</h2>
        <figure className="ir-timeline" aria-label="The first 60 minutes of an AI security incident">
          <div className="timeline-track">{timeline.map(([time, title, detail], index) => <div className="timeline-step" key={time}><span>{time}</span><i>{index + 1}</i><strong>{title}</strong><small>{detail}</small></div>)}</div>
          <div className="timeline-lanes"><span>PARALLEL / EVIDENCE: freeze → export → correlate</span><span>PARALLEL / COMMAND: assign → track → update</span></div>
          <figcaption>FIRST-HOUR CONTROL SEQUENCE / WINDOWS ARE OPERATIONAL TARGETS, NOT RIGID DEADLINES</figcaption>
        </figure>

        <h2>1. 0–5 minutes: recognize and declare</h2>
        <p>Start with an authoritative signal: a cloud audit event, successful tool response, identity event, data-access record, repository commit, delivered message, policy-engine denial, or retrieval event outside the expected boundary.</p>
        <p>A chat transcript can support the investigation, but it is not authoritative proof. It may omit retries, hidden tool calls, system instructions, retrieval context, memory operations, or subagent activity.</p>
        <table className="decision-table"><thead><tr><th>FIELD</th><th>MINIMUM RECORD</th></tr></thead><tbody><tr><td>Detection</td><td>UTC timestamp, reporter, alert, and affected environment</td></tr><tr><td>Agent</td><td>Agent ID, deployment, alias, version, and initiating trigger</td></tr><tr><td>Action</td><td>Attempted, successful, failed, or unknown</td></tr><tr><td>Boundary</td><td>Identity, tenant, data, tool, environment, or approval</td></tr><tr><td>Continuing risk</td><td>Whether the agent can still accept or execute work</td></tr><tr><td>Evidence risk</td><td>Which logs, memory, or session state may expire</td></tr></tbody></table>
        <p>Do not wait for attribution, a complete record count, or a confirmed prompt-injection path before declaring the incident.</p>

        <h2>2. 5–10 minutes: establish command</h2>
        <p>AI incidents cross control planes quickly. Assign one incident commander before teams independently change the environment.</p>
        <ul><li><strong>Incident commander:</strong> priorities, scope, decisions, and update cadence.</li><li><strong>Agent-platform lead:</strong> deployments, aliases, queues, sessions, and subagents.</li><li><strong>Identity lead:</strong> principals, tokens, secrets, and session revocation.</li><li><strong>Evidence lead:</strong> traces, configuration, memory, and target-system logs.</li><li><strong>Tool owners:</strong> cloud, code, messaging, ticketing, and business-system validation.</li><li><strong>Communications, privacy, and legal:</strong> engaged according to potential impact.</li></ul>
        <pre><code>{`UTC time | responder | target | previous state | action
reason | expected effect | validation | rollback path`}</code></pre>
        <p>Freeze unapproved changes to prompts, models, guardrails, policy bundles, tools, retrieval indexes, memory, aliases, and trace configuration. Emergency changes remain possible, but the commander should authorize and record them.</p>

        <h2>3. 10–20 minutes: suspend execution</h2>
        <ol><li>Stop new requests at the agent gateway or API route.</li><li>Pause production aliases, schedules, event triggers, and message consumers.</li><li>Hold queued tasks and agent-to-agent handoffs.</li><li>Terminate in-flight work when continued execution is riskier than the evidence it contains.</li><li>Disable fallback routes to alternate deployments.</li><li>Keep telemetry and administrative access readable.</li></ol>
        <p>For example, Amazon Bedrock supports pausing an agent alias with <code>REJECT_INVOCATIONS</code> without changing its underlying IAM policy. <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-agent.html" rel="noopener noreferrer">Amazon Bedrock deployment guidance ↗</a></p>
        <p>Validate the effect: new-run count is zero, queue depth is stable, no new tool proposals or subagents appear, alternate aliases are not reachable, and logs remain available. Do not delete the agent, deployment, prompt, memory, index, traces, or policy configuration.</p>

        <h2>4. 20–30 minutes: revoke authority and contain tools</h2>
        <p>Pausing orchestration does not invalidate previously issued credentials or downstream sessions. Inventory delegated OAuth tokens, workload identities, service principals, managed identities, API keys, certificates, cloud role sessions, tool-specific cookies, and downstream credentials returned by tools.</p>
        <ol><li>Block new authentication for the agent principal.</li><li>Revoke refresh and delegated tokens.</li><li>Disable affected workload identities or service principals.</li><li>Revoke application-managed sessions.</li><li>Disable exposed keys, secrets, and certificates.</li><li>Remove high-impact roles, grants, and OAuth consent.</li><li>Rotate credentials whose confidentiality cannot be established.</li></ol>
        <p>Identity-provider revocation is not always the end of a session. Microsoft documents that access tokens can remain usable until expiration and that applications must revoke the session tokens they issue. Validate revocation at both layers. <a href="https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access" rel="noopener noreferrer">Microsoft Entra emergency revocation guidance ↗</a></p>
        <table className="decision-table"><thead><tr><th>TOOL CLASS</th><th>IMMEDIATE STATE</th><th>PRESERVE</th></tr></thead><tbody><tr><td>Shell, code, browser automation</td><td>Deny</td><td>Commands, arguments, output, process IDs</td></tr><tr><td>Cloud and identity administration</td><td>Deny</td><td>Audit events, roles, token IDs, changes</td></tr><tr><td>Email, chat, ticketing</td><td>Hold outbound</td><td>Drafts, recipients, message and delivery IDs</td></tr><tr><td>Source control and CI/CD</td><td>Disable write and execution</td><td>Commits, workflows, artifacts, runner logs</td></tr><tr><td>Sensitive retrieval</td><td>Disable or known read-only scope</td><td>Queries, filters, labels, result IDs</td></tr><tr><td>Agent memory</td><td>Disable writes; quarantine</td><td>Reads, writes, owners, prior versions</td></tr><tr><td>Security telemetry</td><td>Preserve read access</td><td>Queries, exports, responder activity</td></tr></tbody></table>
        <p>The tool gateway is usually the strongest enforcement point: it can stop an action even if the model, prompt, or runtime remains compromised.</p>

        <h2>5. 30–45 minutes: preserve the decision trail</h2>
        <p>Collect the agent version and alias; effective prompts and hashes; model and inference configuration; request, trace, span, and session IDs; retrieval queries, filters, results, source versions, and ACL decisions; memory reads and writes; guardrail and policy inputs and versions; tool arguments, approvals, results, retries, and handoffs; identity claims and token identifiers; queue state; target-system audit logs; clock status; and every responder action.</p>
        <p>Google describes an agent trace as a request timeline composed of spans for operations such as LLM interactions and function calls. That structure is useful for reconstruction, but its content must be treated as sensitive evidence. <a href="https://cloud.google.com/agent-builder/agent-engine/manage/tracing" rel="noopener noreferrer">Google Cloud agent tracing ↗</a></p>
        <h3>Collect in order of volatility</h3>
        <ol><li>In-flight tasks, queues, and session state.</li><li>Ephemeral traces, gateway events, and temporary tool results.</li><li>Provider and application session records.</li><li>Memory and retrieval state.</li><li>Agent configuration, policies, and prompt versions.</li><li>Durable identity, cloud, and target-system audit logs.</li></ol>
        <p>For each export, retain timestamps and timezone, calculate a hash, record collector and source, preserve access controls, and avoid unnecessarily duplicating secrets or regulated data. NIST recommends integrating forensic collection with incident response across application, operating-system, file, and network sources. <a href="https://csrc.nist.gov/pubs/sp/800/86/final" rel="noopener noreferrer">NIST SP 800-86 ↗</a></p>

        <h2>6. 30–60 minutes: hunt downstream</h2>
        <p>This work runs in parallel with evidence preservation. Start with what the agent <strong>could reach</strong>, not only what the transcript says it reached.</p>
        <figure className="action-graph" aria-label="Downstream action graph for an AI security incident">
          <div className="graph-origin"><small>INCIDENT RUN</small><strong>Agent</strong><span>identity · retrieval · tools · handoffs</span></div>
          <div className="graph-bus" />
          <div className="graph-targets"><div><b>IAM</b><span>tokens · grants</span></div><div><b>DATA</b><span>queries · exports</span></div><div><b>CLOUD</b><span>resources · audit</span></div><div><b>CODE</b><span>commits · CI/CD</span></div><div><b>COMMS</b><span>messages · tickets</span></div><div><b>STATE</b><span>memory · queues</span></div></div>
          <div className="graph-ledger"><small>CORRELATE IN TARGET SYSTEMS</small><strong>Attempted · Succeeded · Failed · Unknown</strong></div>
          <figcaption>BLAST-RADIUS METHOD / AUTHORITATIVE TARGET EVENTS OVERRIDE NATURAL-LANGUAGE TOOL RESPONSES</figcaption>
        </figure>
        <p>For every action, find the corresponding resource change, audit event, message ID, commit, transaction, or object version. Hunt for new identities and grants, created secrets, data reads and exports, cloud changes, commits and workflow runs, delivered or queued messages, webhooks, memory writes, vector updates, subagents, asynchronous jobs, and credentials copied downstream.</p>

        <h2>7. 45–60 minutes: communicate facts</h2>
        <pre><code>{`Incident:
Detection time:
Confirmed facts:
Affected boundary:
Current containment:
Confirmed and potential impact:
Material unknowns:
Evidence preserved:
Decisions or assistance required:
Next update:
Incident commander:`}</code></pre>
        <p>Avoid declaring attribution, breach status, affected-record counts, or root cause before validation and authorization. Keep a technical channel, decision log, and stakeholder update separate. Use an out-of-band channel when the organization&apos;s messaging platform is in scope.</p>

        <h2>8. The 60-minute exit criteria</h2>
        <ul className="field-checklist"><li>New runs are stopped or bounded.</li><li>In-flight and queued work is accounted for.</li><li>High-risk identities, credentials, sessions, and tools are denied or constrained.</li><li>Telemetry remains accessible.</li><li>Effective prompts, policies, retrieval context, and memory are preserved.</li><li>Agent identity and tool reachability are mapped.</li><li>Downstream actions are attempted, successful, failed, or unknown.</li><li>Target-system logs—not only transcripts—are being collected.</li><li>Command, action tracking, and update cadence are active.</li><li>Business, privacy, legal, and communications owners are engaged as required.</li><li>The next decision and update time are recorded.</li></ul>

        <h2>Closing position</h2>
        <p>The first hour of an AI security incident is an authority problem before it is a model problem.</p>
        <p>Pause execution without erasing state. Revoke authority without blinding telemetry. Preserve effective prompts, policies, retrieval context, and memory—not only the visible conversation. Hunt in the systems the agent could change, and communicate what the evidence proves rather than what the team suspects.</p>
        <div className="callout"><strong>The discipline:</strong> Turn ambiguous AI behavior into a controlled system incident: stop new authority, preserve the decision trail, and validate impact in the systems of record.</div>
      </article>
    </div>
  </main>;
}
