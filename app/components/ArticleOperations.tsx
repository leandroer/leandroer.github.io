import { articleOperations } from "../lib/article-operations";

export function IncidentPanel({ slug }: { slug: string }) {
  const item = articleOperations[slug];
  if (!item) return null;
  return <section className="incident-panel" aria-labelledby={`${slug}-incident-panel`}>
    <div className="incident-panel-heading"><p>INCIDENT MODE / QUICK REFERENCE</p><h2 id={`${slug}-incident-panel`}>During an incident</h2><span>Last technically verified: <time>{item.verified}</time></span></div>
    <div className="incident-trigger"><b>TRIGGER</b><p>{item.trigger}</p></div>
    <div className="incident-actions"><b>FIRST FIVE ACTIONS</b><ol>{item.actions.map((action) => <li key={action}>{action}</li>)}</ol></div>
    <div className="incident-decision"><b>EVIDENCE TO PRESERVE</b><p>{item.evidence}</p></div>
    <div className="incident-decision"><b>DECISIONS REQUIRING AUTHORITY</b><p>{item.authority}</p></div>
    <div className="incident-exit"><b>EXIT CRITERIA</b><p>{item.exit}</p></div>
  </section>;
}

export function ArticleNavigation({ slug }: { slug: string }) {
  const item = articleOperations[slug];
  if (!item) return null;
  return <details className="article-navigation" open>
    <summary>Navigate this field note</summary>
    <nav aria-label="Article sections">{item.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a>)}</nav>
    <a className="article-top-link" href="#top">Back to top ↑</a>
  </details>;
}
