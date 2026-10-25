import catalog from "../../publishing/catalog.json";

export type ArticleRecord = {
  date: string;
  kind: string;
  title: string;
  desc: string;
  time: string;
  href: string;
  publishDate: string;
  scheduledDate: string;
  verifiedDate: string;
  note: string;
  scenarios: string[];
  technologies: string[];
  phases: string[];
  artifactTypes: string[];
};

export function publishedArticles() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return (catalog as ArticleRecord[]).filter(article => article.publishDate <= today).sort((a,b) => b.publishDate.localeCompare(a.publishDate) || b.scheduledDate.localeCompare(a.scheduledDate));
}
