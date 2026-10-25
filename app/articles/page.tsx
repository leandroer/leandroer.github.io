import { publishedArticles } from "../lib/articles";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleExplorer from "../components/ArticleExplorer";

export const metadata: Metadata = {
  alternates: { canonical: "/articles/" },
  title: "Field Notes",
  description: "Technical articles on AI security and incident response.",
};

const articles = publishedArticles();

export default function Articles() {
  return <main className="articles-shell">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark">LR</span><span>INFOSEC<span className="brand-dot">.</span>LAB</span></Link>
      <nav aria-label="Primary navigation"><Link href="/#knowledge">Knowledge</Link><a href="/IncidentResponse/">Framework</a><Link href="/#playbooks">Playbooks</Link><Link href="/articles">Articles</Link><Link href="/#about">About</Link></nav>
      <Link className="header-cta" href="/">Back to lab ↗</Link>
    </header>
    <section className="articles-hero"><p className="eyebrow"><span className="live-dot"/>FIELD NOTES</p><h1>Research for<br/><em>working Defenders.</em></h1><p>Short, technical, and grounded in operational reality.</p></section>
    <ArticleExplorer articles={articles} />
  </main>;
}
