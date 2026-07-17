import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What to log before your first AI incident",
  description: "A minimum viable telemetry model for investigating AI-enabled systems.",
};

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 004 · DETECTION · 03 JUL 2026</p><h1>What to log before your first AI incident</h1><p className="dek">An AI investigation fails quickly when prompts are the only evidence. Build a telemetry chain that connects identity, instructions, retrieval, policy decisions, tool execution, and human approval.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Start with questions<br/>02 / Correlate every stage<br/>03 / Capture six event classes<br/>04 / Protect the evidence<br/>05 / Validate before launch</aside>
      <article className="prose">
        <p>The first AI incident usually exposes an observability problem before it exposes a model problem. Teams discover that they retained a chat transcript but cannot prove which identity acted, which retrieved content influenced the answer, which policy allowed a tool, or what changed in the target system.</p>
        <div className="callout"><strong>Operating principle:</strong> Log the decision path, not just the conversation.</div>
        <h2>1. Start with investigation questions</h2>
        <p>Telemetry should answer concrete questions under pressure: Who initiated the run? Which agent and configuration executed? What instructions were effective? What data was retrieved? Which tools were offered, requested, approved, and executed? What did the target system record?</p>
        <p>If an event cannot help establish authorization, sequence, scope, or impact, reconsider whether collecting it justifies its privacy and storage cost.</p>
        <h2>2. Use one correlation chain</h2>
        <p>Assign an immutable run identifier at the workflow boundary and propagate it through the model gateway, retrieval layer, policy engine, tool broker, approval service, and downstream audit logs. Add a parent identifier when agents delegate work or retry a step.</p>
        <table className="decision-table"><thead><tr><th>FIELD</th><th>PURPOSE</th><th>EXAMPLE</th></tr></thead><tbody><tr><td>run_id</td><td>Connect the full workflow</td><td>Unique, non-semantic identifier</td></tr><tr><td>parent_run_id</td><td>Trace delegation and retries</td><td>Calling agent run</td></tr><tr><td>actor</td><td>Establish effective identity</td><td>User, workload, tenant</td></tr><tr><td>component_version</td><td>Reproduce behavior</td><td>Agent, prompt, policy, model</td></tr><tr><td>event_time</td><td>Build an authoritative timeline</td><td>UTC with millisecond precision</td></tr></tbody></table>
        <h2>3. Capture six event classes</h2>
        <h3>Identity and session</h3><p>Record the authenticated user, tenant, workload identity, delegated credential reference, session identifier, authorization result, and relevant risk signals. Never log raw secrets or bearer tokens.</p>
        <h3>Instructions and configuration</h3><p>Record immutable references or hashes for system and developer instructions, agent definition, model, parameters, enabled tools, policy bundle, and deployment version. Preserve the effective ordering of instructions.</p>
        <h3>Retrieval</h3><p>Capture the query, authorized corpus, document identifiers, chunk identifiers, ranking scores, filtering decisions, and access-control result. Store sensitive retrieved content only when necessary and permitted; identifiers often provide a safer investigative pivot.</p>
        <h3>Model interaction</h3><p>Record model and gateway identifiers, timestamps, token counts, safety and policy outcomes, tool-call proposals, stop reason, and response reference. Treat full prompt and response capture as sensitive evidence with explicit retention rules.</p>
        <h3>Tools and downstream systems</h3><p>Capture the offered tool schema version, requested action, normalized arguments or a protected reference, policy decision, execution identity, target, result, latency, and downstream audit-event identifier. Distinguish a proposed call from a completed side effect.</p>
        <h3>Human approval</h3><p>Record who approved or rejected, what exact action they reviewed, the risk context shown, the decision time, and whether arguments changed after approval. An approval without an immutable action digest is weak evidence.</p>
        <h2>4. Protect the telemetry</h2>
        <ul><li>Separate operational logs from sensitive prompt or content stores.</li><li>Encrypt evidence, restrict investigator access, and audit every read.</li><li>Hash or tokenize stable identifiers where plaintext is unnecessary.</li><li>Define retention by event class rather than keeping everything indefinitely.</li><li>Use append-only or tamper-evident storage for high-value control-plane events.</li><li>Redact secrets before ingestion and test redaction failure paths.</li></ul>
        <h2>5. Validate before launch</h2>
        <p>Run a tabletop with a known prompt-injection attempt and one authorized tool action. Ask an investigator who did not build the system to reconstruct the initiating identity, retrieved evidence, effective instructions, policy path, approval, tool execution, and downstream impact.</p>
        <div className="callout"><strong>Exit criterion:</strong> A responder can reconstruct a cross-system timeline without relying on the user-visible transcript or the memory of the engineering team.</div>
      </article>
    </div>
  </main>;
}
