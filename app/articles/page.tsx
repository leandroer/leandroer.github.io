import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Technical articles on AI security and incident response.",
};

const articles = [
  { date: "17 JUL 2026", kind: "AI SECURITY", title: "Incident response for autonomous AI agents", desc: "A practical framework for scoping identity, memory, tools, and delegated actions when an AI workflow goes wrong.", time: "8 MIN", href: "/articles/responding-to-agent-incidents" },
  { date: "03 JUL 2026", kind: "DETECTION", title: "What to log before your first AI incident", desc: "The minimum viable telemetry model for prompts, retrieval, policy decisions, tool execution, and human approvals.", time: "6 MIN", href: "/articles/what-to-log-before-your-first-ai-incident" },
  { date: "19 JUN 2026", kind: "PLAYBOOK", title: "Ransomware containment under pressure", desc: "A technical decision framework for isolation, control-plane protection, evidence preservation, and staged recovery.", time: "12 MIN", href: "/articles/ransomware-containment-is-a-business-decision" },
];

export default function Articles() {
  return <main className="articles-shell">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link>
      <nav aria-label="Primary navigation"><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link><Link href="/#about">About</Link></nav>
      <Link className="header-cta" href="/">Back to lab ↗</Link>
    </header>
    <section className="articles-hero"><p className="eyebrow"><span className="live-dot"/>FIELD NOTES</p><h1>Research for<br/><em>working Defenders.</em></h1><p>Short, technical, and grounded in operational reality.</p></section>
    <section className="article-index">{articles.map((a) => <Link className="article-row" href={a.href} key={a.title}><span className="meta">{a.date}<br/>{a.kind}</span><div><h2>{a.title}</h2><p>{a.desc}</p></div><span className="meta">{a.time} READ</span><span>↗</span></Link>)}</section>
  </main>;
}
