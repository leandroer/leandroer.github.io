import Link from "next/link";

const playbooks = [
  { code: "IR-01", title: "Ransomware", desc: "Decision points from first signal through recovery, with evidence-preservation gates.", time: "15 min", level: "Critical" },
  { code: "AI-02", title: "Prompt injection", desc: "Contain an agent or RAG workflow when untrusted content changes system behavior.", time: "20 min", level: "High" },
  { code: "AI-04", title: "Model data exposure", desc: "Scope sensitive output, trace retrieval paths, revoke access, and preserve telemetry.", time: "30 min", level: "High" },
  { code: "IR-07", title: "Identity compromise", desc: "Revoke sessions, validate persistence, and hunt downstream cloud activity.", time: "15 min", level: "Critical" },
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
          <a href="#knowledge">Knowledge</a><a href="/IncidentResponse/">Framework</a><a href="#playbooks">Playbooks</a><Link href="/articles">Articles</Link><a href="#about">About</a>
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
          <div className="panel-head"><span>WORKING NOTES / 2026-07</span><span className="status">LAST UPDATED 17 JUL</span></div>
          <div className="board-title"><span>CURRENT FOCUS</span><h2>Agent incident<br/>response</h2><p>Where traditional containment breaks when software can reason, delegate, and act.</p></div>
          <div className="board-rule" />
          <div className="board-grid"><div><small>01</small><b>Identity</b><span>Who actually acted?</span></div><div><small>02</small><b>Memory</b><span>What context persisted?</span></div><div><small>03</small><b>Tools</b><span>What changed downstream?</span></div><div><small>04</small><b>Instructions</b><span>Which input won?</span></div></div>
          <div className="margin-note">review assumption:<br/><strong>conversation ≠ evidence</strong></div>
          <div className="panel-foot"><span>NOTE / 005</span><span>STATUS / PUBLISHED</span><span>READ / 8 MIN</span></div>
        </div>
      </section>

      <section className="manifesto" id="about"><p>I keep this site for one reason: <strong>useful notes should not stay in private notebooks.</strong></p><p>Everything here is written for people who detect, investigate, and contain real attacks. The material is opinionated, openly shared, and revised when experience proves it wrong.</p></section>

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
        <div className="playbook-list">{playbooks.map((p) => <article key={p.code}><span className="code">{p.code}</span><div><h3>{p.title}</h3><p>{p.desc}</p></div><div className="play-meta"><span>FIRST ACTION</span><b>{p.time}</b></div><div className="play-meta"><span>SEVERITY</span><b className={p.level === "Critical" ? "critical" : "high"}>{p.level}</b></div><span className="play-arrow">↗</span></article>)}</div>
      </section>

      <section className="section latest">
        <div className="section-label"><span>03 / FIELD NOTES</span><span>BI-WEEKLY ANALYSIS</span></div>
        <div className="featured-article"><div className="article-visual"><span>THREAT MODEL / 005</span><div className="agent-map"><i/><i/><i/><b>AGENT</b></div></div><div className="article-copy"><p className="eyebrow">LATEST · AI SECURITY · 8 MIN READ</p><h2>Incident response for autonomous AI agents</h2><p>Traditional containment assumes a system boundary. Agents blur it. A practical framework for scoping identity, memory, tools, and delegated actions when an AI workflow goes wrong.</p><Link className="text-link" href="/articles/responding-to-agent-incidents">Read field note <span>→</span></Link></div></div>
        <div className="publish-note"><div><strong>Publish every two weeks.</strong><span>Articles live as simple content files—easy to draft, review, schedule, and share.</span></div><Link href="/articles">Browse all articles ↗</Link></div>
      </section>

      <footer><div className="brand"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></div><p>Independent notes on AI security & incident response.</p><div><a href="https://github.com/leandroer" rel="noopener noreferrer">GitHub</a><a href="mailto:hello@lrinfosec.com">Contact</a></div><small>© 2026 LR InfoSec · Knowledge is a defensive control.</small></footer>
    </main>
  );
}
