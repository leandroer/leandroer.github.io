import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ransomware containment is a business decision",
  description: "A decision framework for ransomware isolation when every option carries operational cost.",
};

export default function Article() {
  return <main className="article-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link><nav><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link></nav><Link className="header-cta" href="/articles">All field notes ↗</Link></header>
    <section className="article-head"><p className="eyebrow">FIELD NOTE 003 · PLAYBOOK · 19 JUN 2026</p><h1>Ransomware containment is a business decision</h1><p className="dek">Isolation is rarely free. A defensible containment decision balances propagation risk, human safety, operational dependency, evidence, and the cost of waiting.</p></section>
    <div className="article-body">
      <aside className="toc"><b>IN THIS NOTE</b>01 / Frame the decision<br/>02 / Establish authority<br/>03 / Choose containment depth<br/>04 / Preserve optionality<br/>05 / Define exit criteria</aside>
      <article className="prose">
        <p>“Isolate everything” sounds decisive until the affected network supports patient care, manufacturing, identity, communications, or the systems needed to recover. The opposite instinct—waiting for certainty—can give an adversary time to encrypt more assets, destroy backups, and spread through trusted administration paths.</p>
        <div className="callout"><strong>Operating principle:</strong> Make the smallest decision that materially reduces attacker capability, then reassess with new evidence.</div>
        <h2>1. Frame the decision explicitly</h2>
        <p>The incident commander should state the decision in operational terms: what will be disconnected, which business capability will be affected, what attacker behavior the action is expected to stop, how success will be measured, and when the decision will be reviewed.</p>
        <table className="decision-table"><thead><tr><th>FACTOR</th><th>QUESTIONS</th><th>ESCALATES URGENCY</th></tr></thead><tbody><tr><td>Propagation</td><td>Is encryption or lateral movement continuing?</td><td>New hosts, remote execution, shared-admin abuse</td></tr><tr><td>Privilege</td><td>Which identities and control planes are exposed?</td><td>Domain, cloud, virtualization, backup access</td></tr><tr><td>Safety</td><td>Could isolation create physical or human harm?</td><td>Clinical, industrial, emergency dependencies</td></tr><tr><td>Recovery</td><td>Are clean backups and administration paths available?</td><td>Backup tampering or loss of trusted access</td></tr><tr><td>Evidence</td><td>What do we know, and what remains an assumption?</td><td>Confirmed impact with incomplete scope</td></tr></tbody></table>
        <h2>2. Establish authority before the crisis</h2>
        <p>Document who can isolate endpoints, subnets, sites, cloud accounts, identity systems, and critical services. Define when the incident commander may act immediately and when an executive, safety officer, system owner, legal counsel, or regulator must be involved.</p>
        <p>Authority should not depend on finding one unavailable executive at 02:00. Use named roles, alternates, contact paths, and pre-approved emergency actions.</p>
        <h2>3. Choose containment depth</h2>
        <h3>Host or identity containment</h3><p>Isolate confirmed endpoints, disable compromised accounts, revoke sessions, block malicious infrastructure, and restrict exposed administrative protocols. Use this when scope is bounded and control planes remain trustworthy.</p>
        <h3>Segment or service containment</h3><p>Block east-west paths, disable shared administration, pause vulnerable file services, restrict VPN access, or place high-risk applications into read-only operation. Use this when propagation paths are known but broad shutdown would create disproportionate harm.</p>
        <h3>Site or enterprise containment</h3><p>Sever inter-site connectivity, suspend federation, isolate cloud environments, or shut down major services when encryption is accelerating, privileged control is lost, or backup and recovery infrastructure is at immediate risk.</p>
        <h2>4. Preserve optionality while acting</h2>
        <ol><li><strong>Record the decision.</strong> Capture UTC time, approver, scope, evidence, assumptions, expected benefit, and accepted impact.</li><li><strong>Preserve volatile evidence.</strong> When time and safety permit, collect memory, active connections, processes, logged-on users, and relevant control-plane events.</li><li><strong>Protect recovery systems.</strong> Restrict backup administration, validate immutability, and separate clean recovery credentials.</li><li><strong>Maintain a communications path.</strong> Assume corporate identity, email, and collaboration platforms may become unavailable or untrusted.</li><li><strong>Reassess on a timer.</strong> Containment is a controlled state, not a one-time command.</li></ol>
        <h2>5. Define exit criteria</h2>
        <p>Do not reconnect because encryption stopped. Require evidence that the initial access path is addressed, privileged identities are reset from trusted systems, persistence is removed, recovery images are clean, monitoring covers the restored environment, and business owners accept documented residual risk.</p>
        <div className="callout"><strong>Decision record:</strong> State what was protected, what was disrupted, which risk was accepted, who accepted it, and what evidence will permit restoration.</div>
        <p>A strong ransomware playbook does not pretend containment is purely technical. It gives technical responders, operational leaders, and executives a shared decision model before the organization is forced to improvise one.</p>
      </article>
    </div>
  </main>;
}
