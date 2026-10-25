"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArticleRecord } from "../lib/articles";

const unique = (articles: ArticleRecord[], key: keyof Pick<ArticleRecord, "scenarios" | "technologies" | "phases" | "artifactTypes">) =>
  [...new Set(articles.flatMap((article) => article[key]))].sort();

export default function ArticleExplorer({ articles }: { articles: ArticleRecord[] }) {
  const [query, setQuery] = useState("");
  const [scenario, setScenario] = useState("");
  const [technology, setTechnology] = useState("");
  const [phase, setPhase] = useState("");
  const [artifact, setArtifact] = useState("");
  const filters = {
    scenarios: unique(articles, "scenarios"),
    technologies: unique(articles, "technologies"),
    phases: unique(articles, "phases"),
    artifactTypes: unique(articles, "artifactTypes"),
  };
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const searchable = [article.title, article.desc, article.kind, ...article.scenarios, ...article.technologies, ...article.phases, ...article.artifactTypes].join(" ").toLocaleLowerCase();
      return (!needle || searchable.includes(needle)) &&
        (!scenario || article.scenarios.includes(scenario)) &&
        (!technology || article.technologies.includes(technology)) &&
        (!phase || article.phases.includes(phase)) &&
        (!artifact || article.artifactTypes.includes(artifact));
    });
  }, [articles, query, scenario, technology, phase, artifact]);
  const reset = () => { setQuery(""); setScenario(""); setTechnology(""); setPhase(""); setArtifact(""); };

  return <>
    <section className="article-filters" aria-labelledby="article-filter-title">
      <div><p className="eyebrow">FIND THE OPERATIONAL NOTE</p><h2 id="article-filter-title">Filter by the problem you are working.</h2></div>
      <label className="article-search"><span>Search</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="identity, RAG, containment, evidence…" /></label>
      <label><span>Scenario</span><select value={scenario} onChange={(event) => setScenario(event.target.value)}><option value="">All scenarios</option>{filters.scenarios.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Technology</span><select value={technology} onChange={(event) => setTechnology(event.target.value)}><option value="">All technologies</option>{filters.technologies.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Response phase</span><select value={phase} onChange={(event) => setPhase(event.target.value)}><option value="">All phases</option>{filters.phases.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>Artifact type</span><select value={artifact} onChange={(event) => setArtifact(event.target.value)}><option value="">All artifacts</option>{filters.artifactTypes.map((value) => <option key={value}>{value}</option>)}</select></label>
      <div className="filter-status" aria-live="polite"><span>{results.length} field note{results.length === 1 ? "" : "s"}</span><button type="button" onClick={reset}>Reset filters</button></div>
    </section>
    <section className="article-index" aria-label="Filtered field notes">
      {results.length ? results.map((article) => <Link className="article-row" href={article.href} key={article.title}><span className="meta">PUBLISHED {article.date}<br/>{article.scheduledDate !== article.publishDate && <>SCHEDULED {article.scheduledDate}<br/></>}{article.kind}<br/><strong>VERIFIED {article.verifiedDate}</strong></span><div><h2>{article.title}</h2><p>{article.desc}</p><div className="article-tags">{article.scenarios.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}{article.phases.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="meta">{article.time} READ</span><span>↗</span></Link>) : <div className="no-articles"><h2>No field notes match those filters.</h2><p>Reset the filters or broaden the search terms.</p><button type="button" onClick={reset}>Show all field notes</button></div>}
    </section>
  </>;
}
