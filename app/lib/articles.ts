import catalog from "../../publishing/catalog.json";
export function publishedArticles() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return catalog.filter(article => article.publishDate <= today).sort((a,b) => b.publishDate.localeCompare(a.publishDate));
}
