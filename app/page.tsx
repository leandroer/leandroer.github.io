import Link from "next/link";

const playbooks = [
  { code: "IR-01", title: "Ransomware", desc: "Decision points from first signal through recovery, with evidence-preservation gates.", time: "15 min", level: "Critical", href: "/playbooks/ransomware" },
  { code: "IR-02", title: "Business email compromise", desc: "Secure identities, trace mailbox activity, and coordinate payment-risk decisions.", time: "15 min", level: "Critical", href: "/playbooks/business-email-compromise" },
  { code: "IR-03", title: "Cloud identity compromise", desc: "Revoke sessions, validate persistence, and hunt downstream cloud activity.", time: "15 min", level: "Critical", href: "/playbooks/cloud-identity-compromise" },
  { code: "IR-04", title: "Data exfiltration", desc: "Confirm access paths, preserve transfer evidence, and bound notification scope.", time: "20 min", level: "High", href: "/playbooks/data-exfiltration" },
  { code: "IR-05", title: "Repository compromise", desc: "Audit code, workflows, dependencies, credentials, and persistence before trusted recovery.", time: "20 min", level: "Critical", href: "/repository-compromise" },
  { code: "IR-06", title: "Malware outbreak", desc: "Isolate affected assets, collect volatile evidence, and rebuild from trusted sources.", time: "15 min", level: "High", href: "/playbooks/malware-outbreak" },
  { code: "AI-IR-01", title: "AI / LLM incident", desc: "Contain unsafe agency, preserve prompts and traces, and validate a staged rollback.", time: "15 min", level: "Critical", href: "/ai-security-ir" },
];

const resources = [
  { n: "01", title: "Detect", text: "Telemetry architecture, triage logic, hypothesis-driven hunts, and detection-as-code patterns.", tags: ["SIEM", "EDR", "AI telemetry"] },
  { n: "02", title: "Respond", text: "Roles, evidence standards, containment tradeoffs, recovery gates, and communications.", tags: ["NIST 800-61", "Forensics"] },
  { n: "03", title: "Defend AI", text: "Threat models for agents, RAG, models, data pipelines, tool use, and human approval paths.", tags: ["OWASP LLM", "MITRE ATLAS"] },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="LR InfoSec home"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link>
        <nav aria-label="Primary navigation">
          <a href="#start">Start here</a><a href="/IncidentResponse/">Framework</a><a href="#playbooks">Playbooks</a><Link href="/resources">Resources</Link><Link href="/articles">Articles</Link>
        </nav>
        <Link className="header-cta" href="/articles">Read the field notes <span>↗</span></Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> NOTES FROM A SECURITY PRACTITIONER</p>
          <h1>Incident response<br />&amp; AI security,<br /><em>from the field.</em></h1>
          <p className="lede">Technical notes, response playbooks, and the things I wish were written down before the incident started.</p>
          <div className="hero-actions"><a className="button primary" href="#knowledge">Explore the knowledge base <span>→</span></a><Link className="button ghost" href="/articles">Latest research</Link></div>
          <div className="trust-line"><span>Independent</span><span>Evidence-led</span><span>Built for defenders</span></div>
        </div>
        <div className="signal-panel architect-board" aria-label="Current research notebook">
          <div className="panel-head"><span>WORKING NOTES / 2026-08</span><span className="status">LAST UPDATED 28 AUG</span></div>
          <div className="board-title"><span>CURRENT FOCUS</span><h2>The first<br/>60 minutes</h2><p>Stopping autonomous activity, removing unsafe authority, preserving evidence, and bounding downstream impact.</p></div>
          <div className="board-rule" />
          <div className="board-grid"><div><small>01</small><b>Stop</b><span>Can the agent still run?</span></div><div><small>02</small><b>Revoke</b><span>What authority remains?</span></div><div><small>03</small><b>Preserve</b><span>What state will expire?</span></div><div><small>04</small><b>Scope</b><span>What changed downstream?</span></div></div>
          <div className="margin-note">first-hour rule:<br/><strong>authority before theory</strong></div>
          <div className="panel-foot"><span>NOTE / 008</span><span>STATUS / PUBLISHED</span><span>READ / 11 MIN</span></div>
        </div>
      </section>

      <section className="manifesto" id="about"><p>I keep this site for one reason: <strong>useful notes should not stay in private notebooks.</strong></p><p>Everything here is authored and reviewed by Leandro Rocha for people who detect, investigate, and contain real attacks. AI-assisted tools may support research, drafting, or editing; technical claims and publication decisions remain the author&apos;s responsibility. <Link href="/editorial-policy">Read the editorial policy ↗</Link></p></section>

      <section className="section" id="start">
        <div className="section-label"><span>00 / START HERE</span><span>CHOOSE YOUR OPERATING NEED</span></div>
        <div className="section-intro"><h2>Use the site<br/><em>like a field kit.</em></h2><p>Begin with the outcome you need. Each path leads to an operational resource, not a generic content category.</p></div>
        <div className="path-grid"><Link className="path-card" href="/IncidentResponse/"><small>PREPARE A PROGRAM</small><h3>Build the response system</h3><p>Establish authority, severity, evidence discipline, containment gates, communications, exercises, and recovery criteria.</p><span>Open the framework →</span></Link><a className="path-card" href="#playbooks"><small>RESPOND NOW</small><h3>Select an incident playbook</h3><p>Start with scenario-specific evidence, first actions, decision gates, containment, eradication, and recovery.</p><span>Choose a playbook ↓</span></a><Link className="path-card" href="/ai-security-ir"><small>ENGINEER AI CONTROLS</small><h3>Defend models, agents, and data</h3><p>Connect AI incident response to identity, retrieval, independent policy, telemetry, tool use, and rollback.</p><span>Open AI Security IR →</span></Link><Link className="path-card" href="/resources"><small>RUN THE INCIDENT</small><h3>Download working artifacts</h3><p>Use structured templates for timelines, evidence, containment decisions, credentials, AI runtime state, and recovery approval.</p><span>Browse responder resources →</span></Link></div>
      </section>

      <section className="section" id="knowledge">
        <div className="section-label"><span>01 / KNOWLEDGE BASE</span><span>FIELD-GUIDE FORMAT</span></div>
        <div className="section-intro"><h2>Start with the problem,<br/><em>leave with a method.</em></h2><p>Each collection connects principles to observable signals, concrete decisions, and reusable artifacts.</p></div>
        <div className="resource-grid">{resources.map((r) => <article className="resource-card" key={r.title}><span className="card-number">{r.n}</span><div><h3>{r.title}</h3><p>{r.text}</p><div className="tags">{r.tags.map(t=><span key={t}>{t}</span>)}</div></div><span className="round-arrow">↗</span></article>)}</div>
      </section>

      <section className="playbook-section" id="playbooks">
        <div className="section-label light"><span>02 / RESPONSE PLAYBOOKS</span><span>OPERATOR-READY</span></div>
        <div className="playbook-heading"><h2>When the signal is real,<br/><em>reduce uncertainty.</em></h2><p>Prescriptive starting points with explicit assumptions. Adapt them to your environment, then validate them in tabletop exercises.</p></div>
        <a className="framework-feature" href="/IncidentResponse/" aria-label="Explore the Incident Detection and Response Framework">
          <div><span className="framework-kicker">STANDALONE OPERATIONAL RESOURCE</span><h3>Incident Detection &amp;<br/>Response Framework</h3></div>
          <p>A structured practitioner guide to preparation, detection, triage, containment, eradication, recovery, and lessons learned.</p>
          <span className="framework-link">Explore the framework <b>↗</b></span>
        </a>
        <div className="playbook-list">{playbooks.map((p) => { const content = <><span className="code">{p.code}</span><div><h3>{p.title}</h3><p>{p.desc}</p></div><div className="play-meta"><span>FIRST ACTION</span><b>{p.time}</b></div><div className="play-meta"><span>SEVERITY</span><b className={p.level === "Critical" ? "critical" : "high"}>{p.level}</b></div><span className="play-arrow">↗</span></>; return p.href ? <Link className="playbook-row" href={p.href} key={p.code}>{content}</Link> : <article key={p.code}>{content}</article>; })}</div>
      </section>

      <section className="section latest">
        <div className="section-label"><span>03 / FIELD NOTES</span></div>
        <div className="featured-article"><div className="article-visual"><span>INCIDENT CLOCK / 008</span><div className="agent-map"><i/><i/><i/><b>60:00</b></div></div><div className="article-copy"><p className="eyebrow">LATEST · AI SECURITY · 11 MIN READ</p><h2>The first 60 minutes</h2><p>A commander-and-operator timeline for stopping autonomous activity, removing unsafe authority, preserving evidence, and bounding downstream impact.</p><Link className="text-link" href="/articles/first-60-minutes-ai-security-incident">Read field note <span>→</span></Link></div></div>
        <div className="publish-note"><div><span>Articles live as simple content files—easy to draft, review, schedule, and share.</span></div><Link href="/articles">Browse all articles ↗</Link></div>
      </section>

      <footer><div className="brand"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></div><p>Independent notes on AI security &amp; incident response.</p><div><Link href="/resources">Resources</Link><Link href="/editorial-policy">Editorial policy</Link><a href="https://github.com/leandroer" rel="noopener noreferrer">GitHub</a><a href="mailto:hello@lrinfosec.com">Contact</a></div><small>© 2026 LR InfoSec · Knowledge is a defensive control.</small></footer>
    </main>
  );
}
